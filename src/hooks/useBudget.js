import { useContext } from "react";

// brs provider
import { BudgetContext } from "../contexts/master/BudgetContext";

//-----------------------|| Opening Balance Brs Hook ||-----------------------//

const useBudget = () => useContext(BudgetContext);

export default useBudget;
