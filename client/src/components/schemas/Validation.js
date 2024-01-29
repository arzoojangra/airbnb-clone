import * as Yup from "yup";

// Registration validations
export const RegistrationInitialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};

export const RegistrationValidationSchema = Yup.object({
  fname: Yup.string().min(2).max(80).required("First Name can not be empty!"),
  lname: Yup.string().min(2, "last name can't less than 2 characters!").max(80),
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("E-mail can not be empty!"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters!")
    .max(15, "Password cannot be greater than 15 characters!")
    .required("Please enter the password!"),
});

// Login validations
export const LoginInitialValues = {
  email: "",
  password: "",
};

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("E-mail can not be empty!"),
  password: Yup.string().required("Please enter the password!"),
});
