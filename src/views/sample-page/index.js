import React from "react";
import { useDispatch } from "react-redux";

// material-ui
import { Button, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../ui-component/cards/MainCard";

import { SNACKBAR_OPEN } from "../../store/actions";

//==============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => {
  const dispatch = useDispatch();

  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
        tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
        venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
        commons construal. Duos aube grue dolor in reprehended in voltage veil
        esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate
        non president, sunk in culpa qui officiate descent molls anim id est
        labours.
      </Typography>

      <br />
      <br />

      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "This is Success",
            variant: "alert",
            alertSeverity: "success",
            close: true,
          })
        }
      >
        Notify
      </Button>
    </MainCard>
  );
};

export default SamplePage;
