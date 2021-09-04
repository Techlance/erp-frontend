import { useContext } from "react";

// user management provider
import { CostCenterContext } from "../contexts/master/CostCenterContext";

//-----------------------|| COST CENTER HOOKS ||-----------------------//

const useCostCenter = () => useContext(CostCenterContext);

export default useCostCenter;
