import { formatDistance } from "date-fns";

const getElapsedTime = (fromStr) => {
  const fromDate = new Date(fromStr);
  const elapsedTime = formatDistance(new Date(), fromDate, { addSuffix: true });
  return elapsedTime;
};

const UserStatus = {
  CHECKING: "checking",
  AUTHORIZED: "authorized",
  UNAUTHORIZED: "unauthorized",
};

const getUserIfAuthorizedElseNull = async (signal = null) => {
  const url = import.meta.env.VITE_API_URL + "/users";
  const auth = localStorage.getItem("auth");
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: auth,
      },
      ...(signal ? { signal } : {}),
    });
    if (!res.ok) {
      return null;
    }
    const user = await res.json();
    return user;
  } catch (err) {
    if (err.name === "AbortError") return;
    console.error(err);
    return null;
  }
};

export { getElapsedTime, UserStatus, getUserIfAuthorizedElseNull };
