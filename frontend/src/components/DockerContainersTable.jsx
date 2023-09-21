import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { StopCircleOutlined } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

const DockerContainersTable = ({ containerList }) => {
  const { auth } = useAuth();
  const { socket } = auth;

  const craftMessage = (type, data) => {
    return JSON.stringify({ type, data });
  };

  const handleStopContainer = (containerName) => {
    socket.send(craftMessage("stop-container", containerName));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containerList.map((container) => (
            <TableRow key={container.containerId}>
              <TableCell>{container.containerId}</TableCell>
              <TableCell>{container.containerName}</TableCell>
              <TableCell>{container.containerImage}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleStopContainer(container.containerName)}
                >
                  <StopCircleOutlined />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DockerContainersTable;
