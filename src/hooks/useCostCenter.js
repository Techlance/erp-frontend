import { useContext } from "react";

// user management provider
import { CostCenter } from "../contexts/master/CostCenterContext";

//-----------------------|| COST CENTER HOOKS ||-----------------------//

const useCostCenter = () => useContext(CostCenter);

export default useCostCenter;
