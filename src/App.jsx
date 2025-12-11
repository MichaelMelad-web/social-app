import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import Notfound from "./pages/Notfound/Notfound";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import AppProtectedRoutes from "./components/protectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./components/protectedRoutes/AuthProtectedRoutes";
import PostDetails from "./pages/PostDetails/PostDetails";

import { Offline, Online } from "react-detect-offline";
import { addToast, Button } from "@heroui/react";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AppProtectedRoutes>
          <MainLayout />
        </AppProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to={"/home"} /> },
        {
          path: "/home",
          element: (
            <AppProtectedRoutes>
              <NewsFeed />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <AppProtectedRoutes>
              <UserProfile />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "post-details/:id",
          element: (
            <AppProtectedRoutes>
              {" "}
              <PostDetails />{" "}
            </AppProtectedRoutes>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "",
      element: (
        <AuthProtectedRoutes>
          <AuthLayout />
        </AuthProtectedRoutes>
      ),
      children: [
        {
          path: "register",
          element: (
            <AuthProtectedRoutes>
              <Register />
            </AuthProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoutes>
              <Login />
            </AuthProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <div className="pt-3 text-center">
        <Online >
        {" "}
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: "Toast Title",
            });
          }}
        >
          you're online
        </Button>
      </Online>
      </div>
<div className="pt-3 text-center">
<Offline>
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: "Toast Title",
            });
          }}
        >
          you're offline
        </Button>
      </Offline>
</div>
      
      <RouterProvider router={router} />
    </>
  );
}
