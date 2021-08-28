import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const AutoNumberingCheckbox = ({ id, captionLabel, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected;
    return null;
  });

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <FormControlLabel
      id={id}
      control={<Checkbox name={id} checked={current} onChange={onChange} />}
      label={captionLabel}
    />
  );
};

export default AutoNumberingCheckbox;
