import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

const TextfieldWithErrorMessage = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const hasError = Boolean(props.error);

    const textFieldProps = hasError
      ? {
          ...props,
          "aria-errormessage": `${props.name}-helper-text`,
          "aria-invalid": true,
        }
      : props;

    return (
      <TextField
        {...textFieldProps}
        inputRef={ref}
        size={"small"}
        fullWidth
        variant={"outlined"}
      />
    );
  }
);

export default TextfieldWithErrorMessage;
