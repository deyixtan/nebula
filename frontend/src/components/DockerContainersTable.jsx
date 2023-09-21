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
import {
  DownloadOutlined,
  PauseCircleOutlineOutlined,
  PlayCircleOutline,
  StopCircleOutlined,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

const DockerContainersTable = ({ containerList }) => {
  const { auth } = useAuth();
  const { socket } = auth;

  const craftMessage = (type, data) => {
    return JSON.stringify({ type, data });
  };

  const handleDownloadLogs = (containerName) => {
    socket.send(craftMessage("container-logs", containerName));
  };

  const handleStopContainer = (containerName) => {
    socket.send(craftMessage("stop-container", containerName));
  };

  const handlePauseContainer = (containerName) => {
    socket.send(craftMessage("pause-container", containerName));
  };

  const handleUnpauseContainer = (containerName) => {
    socket.send(craftMessage("unpause-container", containerName));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Ports</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Logs</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containerList.map((container) => (
            <TableRow key={container.containerId}>
              <TableCell>{container.containerId}</TableCell>
              <TableCell>{container.containerName}</TableCell>
              <TableCell>{container.containerImage}</TableCell>
              <TableCell>{JSON.stringify(container.containerPorts)}</TableCell>
              <TableCell>{container.containerStatus}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDownloadLogs(container.containerName)}
                >
                  <DownloadOutlined />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleStopContainer(container.containerName)}
                >
                  <StopCircleOutlined />
                </IconButton>
                {container.containerStatus === "paused" ? (
                  <IconButton
                    onClick={() =>
                      handleUnpauseContainer(container.containerName)
                    }
                  >
                    <PlayCircleOutline />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      handlePauseContainer(container.containerName)
                    }
                  >
                    <PauseCircleOutlineOutlined />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DockerContainersTable;
