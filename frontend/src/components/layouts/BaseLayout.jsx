import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Cloud } from "@mui/icons-material";

export const BaseLayout = (props) => {
  return (
    <Box
      width="100vw"
      minWidth="100vw"
      maxWidth="100vw"
      height="100vh"
      minHeight="100vh"
      maxHeight="100vh"
    >
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <Cloud />
          </IconButton>
          <Typography variant="h6" flexGrow="1">
            Nebula
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        minWidth="100%"
        maxWidth="100%"
        height="100%"
        minHeight="100%"
        maxHeight="100%"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
