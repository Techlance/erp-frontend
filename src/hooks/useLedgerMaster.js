import { useContext } from "react";

// user management provider
import { LedgerMaster } from "../contexts/master/LedgerMasterContext";

//-----------------------|| USER MANAGEMENT HOOKS ||-----------------------//

const useLedgerMaster = () => useContext(LedgerMaster);

export default useLedgerMaster;
