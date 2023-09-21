import { Stack, Typography } from "@mui/material";
import BaseLayout from "./BaseLayout";

const FormLayout = (props) => {
  return (
    <BaseLayout>
      <Stack
        bgcolor="#ffffff"
        padding="50px"
        spacing="50px"
        border="2px solid black"
        borderRadius="15px"
      >
        <Typography variant="h3" align="center">
          {props.title}
        </Typography>
        {props.form}
      </Stack>
    </BaseLayout>
  );
};

export default FormLayout;
