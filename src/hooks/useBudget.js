import { useContext } from "react";

// brs provider
import { Budget } from "../contexts/master/BudgetContext";

//-----------------------|| Opening Balance Brs Hook ||-----------------------//

const useBudget = () => useContext(Budget);

export default useBudget;
