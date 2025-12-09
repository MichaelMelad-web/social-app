import * as z from "zod";

export const regSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required!!")
      .min(5, "Name Must be At least 5 characters")
      .max(20, "Name must be less than 10 characters")
      .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
    email: z
      .string()
      .nonempty("Email is required!!")
      .email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one digit")
      .regex(/[@$!%*?&]/, "Must contain at least one special character"),

    rePassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one digit")
      .regex(/[@$!%*?&]/, "Must contain at least one special character"),

    dateOfBirth: z.string().refine((data) => {
        const currentYear = new Date().getFullYear()
        const birthYear = new Date(data).getFullYear()
        const age =currentYear-birthYear
        return age >=18
    },{message:"Age Must at least 18 Year Old"}
),

gender:z.string().nonempty("please Choose Your Gender")
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });




  export const loginSchema = z
  .object({
 
    email: z
      .string()
      .nonempty("Email is required!!")
      .email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one digit")
      .regex(/[@$!%*?&]/, "Must contain at least one special character"),


  });
