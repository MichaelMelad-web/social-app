import { Outlet } from "react-router-dom";
import AuthBg from "../../assets/images/AuthBG.png";

export default function AuthLayout() {
  return (
    <>
  <div className="grid grid-cols-3 h-screen">

    <div className="Auth-background col-span-1">
      <img src={AuthBg} alt=""  className="w-full h-full"/>

    </div>

    <div className=" col-span-2  flex justify-center items-center">
      <Outlet/>
    </div>

  </div>
    </>
  );
}
