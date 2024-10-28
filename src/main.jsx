import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PostsPage from "./components/PostsPage";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPage";
import AccountPage from "./components/AccountPage";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { getUsernameIfAuthorizedElseNull } from "./utils.js";

const redirectToHomePageIfAuthorized = async () => {
  const username = await getUsernameIfAuthorizedElseNull();
  if (username) {
    return redirect("/");
  }
  return null;
};

const redirectToLoginPageIfUnAuthorized = async () => {
  const username = await getUsernameIfAuthorizedElseNull();
  if (!username) {
    return redirect("/auth/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: redirectToLoginPageIfUnAuthorized,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PostsPage />,
      },
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    errorElement: <ErrorPage />,
    loader: redirectToHomePageIfAuthorized,
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
