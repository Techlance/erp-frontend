import { useContext } from "react";

// company provider
import { CompanyContext } from "../contexts/CompanyContext";

//-----------------------|| Company Hooks ||-----------------------//

const useCompany = () => useContext(CompanyContext);

export default useCompany;
