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

// Add accomodations validations
export const AccomodationsInitialValues = {
  title: "",
  address: "",
  description: "",
  extraInfo: "",
  checkIn: "",
  checkOut: "",
  maxGuests: "",
  price: "",
};

export const AccomodationsValidationSchema = Yup.object({
  title: Yup.string().required("Title can not be empty!"),
  address: Yup.string().required("Please add the address!"),
  extraInfo: Yup.string(),
  checkIn: Yup.string().required("Check in time can not be empty!"),
  checkOut: Yup.string().required("Check out can not be empty!"),
  maxGuests: Yup.number().required("Please add the max number of guests!"),
  price: Yup.number().required("Price can not be empty!"),
});

// Book place validations
export const BookingInitialValues = {
  checkIn: "",
  checkOut: "",
  numberOfGuests: "",
  name: "",
  phone: "",
};

export const BookingValidationSchema = Yup.object({
  checkIn: Yup.date().required("Check in date can not be empty!"),
  checkOut: Yup.date().required("Check out date can not be empty!"),
  numberOfGuests: Yup.number().required("Please add the max number of guests!"),
  name: Yup.string().required("please add you name!"),
  phone: Yup.string().required("Mobile can not be empty!"),
});

// Search bar validations
export const SearchBarInitialValues = {
  place: "",
  minPrice: "",
  maxPrice: "",
  numberOfGuests: "",
};

export const SearchBarValidationSchema = Yup.object({
  place: Yup.string("Please add valid place name"),
  minPrice: Yup.number("Please add valid minimum price").positive().min(1),
  maxPrice: Yup.number("Please add valid maximum price").positive().min(1),
  numberOfGuests: Yup.number("Please add valid number of guests").positive().min(1),
});
