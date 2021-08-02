import { useContext } from "react";

// user management provider
import UserPermissionContext from "../contexts/UserPermissionContext";

//-----------------------|| USER MANAGEMENT HOOKS ||-----------------------//

const useUserPermissions = () => useContext(UserPermissionContext);

export default useUserPermissions;
