import * as yup from "yup";

export const yupValidations = {
  stringRequired: (field: string) =>
    yup.string().required(`${field} is required`),
  stringEmail: (field: string) =>
    yup.string().email(`${field} must be a valid email format`),
  stringMinLength: (field: string, min: number) =>
    yup.string().min(min, `${field} must be at least ${min} characters`),
  stringMaxLength: (field: string, max: number) =>
    yup.string().max(max, `${field} must be at most ${max} characters`),
  stringPhone: (field: string = "Phone number") =>
    yup
      .string()
      .matches(/^\d+$/, `${field} must contain only digits`)
      .length(10, `${field} must be exactly 10 digits`),
  arrayTagsRequired: (field: string) =>
    yup
      .array()
      .of(yup.string().required(`${field} must be a string`))
      .min(1, `${field} must contain at least one tag`)
      .required(`${field} is required`),
  confirmPassword: (passwordFieldName: string) =>
    yup.string().oneOf([yup.ref(passwordFieldName)], "Passwords must match"),
};

export const templateValidationSchema = yup.object().shape({
  name: yupValidations.stringRequired("Name"),
  message: yupValidations.stringRequired("Message"),
  category: yupValidations.stringRequired("Category"),
  typeId: yupValidations.stringRequired("Type"),
  languageId: yupValidations.stringRequired("Language"),
  headers: yupValidations.stringRequired("Header"),
  footer: yupValidations.stringRequired("Footer"),
});

export const signUpValidationSchema = yup.object().shape({
  firstName: yupValidations.stringRequired("First Name"),
  lastName: yupValidations.stringRequired("Last Name"),
  email: yupValidations.stringEmail("Email"),
  password: yupValidations.stringMinLength("Password", 8),
  confirmPassword: yupValidations.confirmPassword("Password"),
  countryCode: yupValidations.stringRequired("Country Code"),
  phone: yupValidations.stringPhone("Phone"),
});

export const addContactValidationSchema = yup.object().shape({
  name: yupValidations.stringRequired("Name"),
  phone: yupValidations.stringPhone("Phone"),
  countryCode: yupValidations.stringRequired("Country Code"),
  tags: yup.array(),
});
//TODO: I HAVE TO CHECK THIS
// export const yupValidations = {
//   stringReuired: yup.string().required("This field is required"),
//   stringEmail: yup.string().email("Invalid email format"),
//   stringMinLength: yup
//     .string()
//     .min(8, "Password must be at least 8 characters"),
//   stringMaxLength: yup.string().max(255, "Name must be at most 255 characters"),
//   stringPhone: yup
//     .string()
//     .matches(/^\d+$/, "Phone number must contain only digits"),
// };
