import { useContext } from "react";

// brs provider
import { BrsContext } from "../contexts/master/BrsContext";

//-----------------------|| Opening Balance Brs Hook ||-----------------------//

const useBRS = () => useContext(BrsContext);

export default useBRS;
