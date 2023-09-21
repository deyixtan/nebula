import { Box, Typography } from "@mui/material";
import BasicLayout from "../layouts/BasicLayout";

const NotFoundPage = () => {
  return (
    <BasicLayout>
      <Box>
        <Typography variant="h2" align="center">
          Resource Not Found
        </Typography>
      </Box>
    </BasicLayout>
  );
};

export default NotFoundPage;
