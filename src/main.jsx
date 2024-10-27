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

const redirectToLoginPageIfAuthorized = async () => {
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
    loader: redirectToLoginPageIfAuthorized,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
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
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
