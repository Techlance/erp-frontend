import { useContext } from "react";

// auth provider
import JWTContext from "../contexts/JWTContext";

//-----------------------|| AUTH HOOKS ||-----------------------//

const useAuth = () => useContext(JWTContext);

export default useAuth;
