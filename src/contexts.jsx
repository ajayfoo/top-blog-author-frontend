import { createContext } from "react";
import { UserStatus } from "./utils";

const UserContext = createContext({ status: UserStatus.CHECKING });

export { UserContext };
