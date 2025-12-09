import {
  Navbar ,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  Badge,
  Skeleton,
} from "@heroui/react";
import navLogo from "../../assets/images/logo.png";
import { RiMessage2Fill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarUi() {

 const{token , setToken , userData , isLoading} =useContext(authContext)

 const navigate =useNavigate()

 function logoutUser(){
  localStorage.removeItem("userToken")
  setToken(false)
  navigate("/login")
 }

 function goToProfile(){
  navigate("/profile")
 }

  return (
    <>
      <Navbar maxWidth="full" className="px-5">
        
        <Link to={"/home"}>
          <NavbarBrand>
            <img src={navLogo} width={40} alt="Nexfiy Logo" />
            <span className="font-bold text-xl">Nexfiy</span>
          </NavbarBrand>
        </Link>

        {/* Centered Search Input */}
        <NavbarContent justify="center" className="flex-10">
          <NavbarBrand className="w-full max-w-xl">
            <Input
              classNames={{
                base: "w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              radius="full"
              type="search"
            />
          </NavbarBrand>
        </NavbarContent>

       
        <NavbarContent as="div" justify="end">
          <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full">
            <Badge color="danger" content="5">
              <RiMessage2Fill className="text-2xl" />
            </Badge>
          </NavbarItem>
          <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full">
            <Badge color="danger" content="5">
              <FaBell className="text-2xl" />
            </Badge>
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              {isLoading ? (
                <Skeleton className="flex rounded-full size-10" />
              ) : (
                <Avatar
                  isBordered
                  as="button"
                  name={userData.name}
                  size="sm"
                  src={userData.photo}
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userData.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" onClick={goToProfile}>
                My Profile
              </DropdownItem>

              <DropdownItem 
                onClick={() => {
                  logoutUser()
                }} 
                key="logout" 
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}