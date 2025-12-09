
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/vaildationSchemas/authSchema";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { loginUser, registerUser } from "../../../services/authServices";
import { toast } from "react-toastify";
import { authContext } from "../../../context/AuthContext";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
const [errorMes, setErrorMes] = useState("")
const [successMes, setSuccessMes] = useState("")

const{setToken} =useContext(authContext)



  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
     
    },
  });

  async function onSubmit(formData) {

    setErrorMes("")
    setSuccessMes("")
     console.log(formData);
 
   try {

    const {data} = await loginUser(formData)
    console.log(data);
    setSuccessMes(data.message)
    toast.success(data.message)
    localStorage.setItem("userToken" , data?.token)

    setToken(data?.token) 
    

    
   } catch (error) {

  console.log("ERROR RESPONSE:", error.response?.data);
  console.log(error);
  
  setErrorMes(error.data.error)
  toast.error(error.data.error)
}

    

  }

  return (
    <>
    <title> Login| SocialApp</title>
      <form
        className="w-full max-w-4xl space-y-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-header space-y-5">
          <h1 className="text-4xl font-bold">
            Sign In Now 🚀 {" "}
          </h1>
          <span className="text-xl "> Sign Into Your Account</span>
        </div>

        <div className="inputs-Form space-y-6">
       
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
         
      
          <div className="flex items-end justify-between">
            <Button isLoading={isSubmitting} color="primary" type="submit" >
              Login
            </Button>
            <p>
              Dont Have An Account ?{" "}
              <Link className="font-bold ms-1 " to="/register">
                {" "}
                Sign Up{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}



