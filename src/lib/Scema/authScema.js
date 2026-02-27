import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  rePassword: z.string().min(6, "RePassword must be at least 6 characters").nonempty("RePassword is required"),
dateOfBirth: z.string().nonempty("Date of Birth is required").refine((value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
   
  
    return age >= 18;
  },{error: "You must be at least 18 years old to register"}),
gender:z.string().nonempty("Gender is required")

}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});
  

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});   
