import { useContext } from "react";

// company provider
import { MasterCompanyContext } from "../contexts/master/MasterCompanyContext";

//-----------------------|| Master Company Hooks ||-----------------------//

const useComapanyMaster = () => useContext(MasterCompanyContext);

export default useComapanyMaster;
