import { useContext } from "react";

// company provider
import { LC } from "../contexts/master/lcContext";

//-----------------------|| LC HOOKS ||-----------------------//

const useLC = () => useContext(LC);

export default useLC;
