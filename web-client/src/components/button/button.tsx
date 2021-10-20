import React, { FC } from "react";
import { Button as ButtonComp } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { regularTheme } from "../../themes/regular";

interface ButtonProps {
  text: string;
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary";
  fullwidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  text,
  variant,
  color,
  fullwidth = false,
}) => {
  return (
    <ThemeProvider theme={regularTheme}>
      <ButtonComp variant={variant} color={color} fullWidth={fullwidth}>
        {text}
      </ButtonComp>
    </ThemeProvider>
  );
};
