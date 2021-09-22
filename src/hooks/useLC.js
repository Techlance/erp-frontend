import { useContext } from "react";

// company provider
import { LCContext } from "../contexts/master/LCContext";

//-----------------------|| LC HOOKS ||-----------------------//

const useLC = () => useContext(LCContext);

export default useLC;
