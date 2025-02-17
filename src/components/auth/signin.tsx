"use client";
import { usePostMethodMutation } from "@/services/data-service";
import { ApiMethod, LoginApiUrls } from "@/shared/enums/api-enum";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { setAuth } from "@/store/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required")
});

interface  SignInFormData {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema)
  });

  const [signInUser, { isLoading}] = usePostMethodMutation();
  const navigate = useRouter()
  const dispatch  =useAppDispatch()
  const onSubmit = async (data: SignInFormData) => {
    console.log(data);
    const response = await signInUser({
        httpResponse:{
            url:LoginApiUrls.SignIn,
            reqType:ApiMethod.POST,
        },payload:data
    });
    if (response.data?.statusCode===200) {
      const token = response.data.response?.token;
      const userId = response.data.response?.id;
      
      dispatch(setAuth({
        userId,
        token
      }));
      
      navigate.push("/dashboard");
      return;
    }
    toast.error("something went wrong");
    return;
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign In
      </Typography>
      
      <TextField
        fullWidth
        id="email"
        disabled={isLoading}
        label="Email"
        size="small"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        size="small"
        disabled={isLoading}
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading? <CircularProgress size={30} /> :"Sign In" }
        
      </Button>
    </Box>
  );
}
