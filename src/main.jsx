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
import { getUserIfAuthorizedElseNull } from "./utils.js";
import PostPage from "./components/PostPage/index.jsx";
import NewPostPage from "./components/NewPostPage/index.jsx";
import NotFoundPage from "./components/NotFoundPage/index.jsx";

const redirectToHomePageIfAuthorized = async () => {
  const user = await getUserIfAuthorizedElseNull();
  if (user) {
    return redirect("/");
  }
  return null;
};

const redirectToLoginPageIfUnAuthorized = async () => {
  const user = await getUserIfAuthorizedElseNull();
  if (!user) {
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
        path: "/posts/:id",
        element: <PostPage />,
      },
      {
        path: "/posts/:id/edit",
        element: <NewPostPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/posts/new",
        element: <NewPostPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    errorElement: <ErrorPage />,
    loader: redirectToHomePageIfAuthorized,
    element: <LoginPage />,
  },
  {
    path: "*",
    loader: redirectToLoginPageIfUnAuthorized,
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </StrictMode>
);
