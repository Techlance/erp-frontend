import { useContext } from "react";

// company provider
import { MasterCompanyContext } from "../contexts/master/MasterCompanyContext";

//-----------------------|| Master Company Hooks ||-----------------------//

const useCompanyMaster = () => useContext(MasterCompanyContext);

export default useCompanyMaster;
