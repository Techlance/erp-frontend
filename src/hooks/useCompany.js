import { useContext } from "react";

// company provider
import { CompanyContext } from "../contexts/CompanyContext";

//-----------------------|| Company HOOKS ||-----------------------//

const useCompany = () => useContext(CompanyContext);

export default useCompany;
