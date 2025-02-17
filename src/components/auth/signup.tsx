import { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePostMethodMutation } from '@/services/data-service';
import { ApiMethod, LoginApiUrls } from '@/shared/enums/api-enum';
import { ResponseInterface } from '@/shared/types/http-types';
import { toast } from 'sonner';
import { localStorageHelper } from '@/services/local-storage-service';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/hooks/redux-hook';
import { setAuth } from '@/store/slices/userSlice';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });
  const dispatch  =useAppDispatch()

  const [signUpUser, { isLoading, isError }] = usePostMethodMutation();
  const navigate = useRouter()
  const onSubmit = async (values: SignupFormData) => {
    const response = await signUpUser({
      httpResponse: {
        url: LoginApiUrls.SignUp,
        reqType: ApiMethod.POST
      },
      payload: values
    });
    if (response.data?.statusCode===200) {
      const token = response.data.response?.token;
      const userId = response.data.response?.id;
      
      dispatch(setAuth({
        userId,
        token
      }));

      navigate.push("/dashboard")
      return
    }
    toast.error("something went wrong")
    return
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign Up
      </Typography>


      <TextField
        fullWidth
        size="small"
        disabled={isLoading}
        id="fullName"
        label="Full Name"
        {...register('fullName')}
        error={Boolean(errors.fullName)}
        sx={{ mb: 2 }}
        helperText={errors.fullName?.message}
      />

      <TextField
        fullWidth
        id="email"
        label="Email"
        disabled={isLoading}
        size="small"
        {...register('email')}
        sx={{ mb: 2 }}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        id="password"
        disabled={isLoading}
        label="Password"
        size="small"
        type="password"
        sx={{ mb:2 }}
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />

      <TextField
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        disabled={isLoading}
        size="small"
        type="password"
        sx={{ mb: 2 }}
        {...register('confirmPassword')}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        color="primary"
        fullWidth
        size="large"
      >
        {isLoading? <CircularProgress size={30} /> :"Sign In" }
      </Button>
    </Box>
  );
};

export default SignUp;
