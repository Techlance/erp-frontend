import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

// project imports
// import useCompany from "../../hooks/useCompany";
import { useSelector } from "react-redux";
import useLC from "../../../hooks/useLC";
import { useParams } from "react-router";

//-----------------------|| PARTY CODE RECEIVE SELECT ||-----------------------//

const PartyCodeRecSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  const { mid } = useParams();
  const { getPartyCodeReceive } = useLC();
  const { party_code_rec } = useSelector((state) => state.lc);

  const errorState = formState === "error" ? true : false;

  useEffect(() => {
    getPartyCodeReceive(mid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = party_code_rec.find(
      (option) => option.id === event.target.value
    );

    onChange("party_code", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="outlined-select-center"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        {party_code_rec?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.ledger_id} - ${option.ledger_name}`}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

PartyCodeRecSelect.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default PartyCodeRecSelect;
