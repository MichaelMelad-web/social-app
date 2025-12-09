import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { regSchema } from "../../../lib/vaildationSchemas/authSchema";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { registerUser } from "../../../services/authServices";
import { toast } from "react-toastify";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
const [errorMes, setErrorMes] = useState("")
const [successMes, setSuccessMes] = useState("")
const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(regSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(data) {

    setErrorMes("")
    setSuccessMes("")
     console.log(data);
 
   try {

    const response = await registerUser(data)
    console.log(response);
    setSuccessMes(response.data.message)
    toast.success(response.data.message)
    navigate ("/login")
    
   } catch (error) {

  console.log("ERROR RESPONSE:", error.response?.data);
  console.log(error);
  
  setErrorMes(error.response.data.error)
  toast.error(error.response.data.error)
}

    

  }

  return (
    <>
      <title> Register | SocialApp</title>
      <form
        className="w-full max-w-4xl space-y-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-header space-y-5">
          <h1 className="text-4xl font-bold">
           join  Nexify Today 🚀 {" "}
          </h1>
          <span className="text-xl "> Create Your Free Account and Start Connecting</span>
        </div>

        <div className="inputs-Form space-y-6">
          <Input
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name)}
            isRequired
            variant="faded"
            label="Name"
            type="text"
          />
          <Input
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
            isRequired
            variant="faded"
            label="Email"
            type="email"
          />
          <Input
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            isRequired
            variant="faded"
            label="Password"
            type={showPassword ? "text" : "password"}
            endContent={
              showPassword ? (
                <FaEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="text-4xl"
                />
              ) : (
                <IoMdEyeOff
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="text-4xl"
                />
              )
            }
          />
          <Input
            {...register("rePassword")}
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword)}
            isRequired
            variant="faded"
            label="RePassword"
            type={showPassword ? "text" : "password"}
          />
          <div className="flex gap-5 items-center">
            <Input
              {...register("dateOfBirth")}
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(errors.dateOfBirth)}
              isRequired
              className=""
              label="Birth date"
              type="date"
            />

            <Select
              {...register("gender")}
                  errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender)}
              isRequired
              label="Select Your Gender"
            >
             
              <SelectItem key="male" >Male</SelectItem>

              <SelectItem key="female" >Female</SelectItem>

            </Select>
          </div>
          <div className="flex items-end justify-between">
            <Button isLoading={isSubmitting} color="primary" type="submit" >
              Submit
            </Button>
            <p>
              Already Have An Account ?{" "}
              <Link className="font-bold ms-1 " to="/login">
                {" "}
                Sign in{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
