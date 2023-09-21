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
import { DeleteOutline, PlayCircleOutline } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

const DockerImagesTable = ({ imageList }) => {
  const { auth } = useAuth();
  const { socket } = auth;

  const craftMessage = (type, data) => {
    return JSON.stringify({ type, data });
  };

  const handleRemoveImage = (imageName) => {
    socket.send(craftMessage("remove-image", imageName));
  };

  const handleRunImage = (imageName) => {
    // TODO: use MUI's dialog boxes
    const command = prompt(
      "Please enter command to execute in container:",
      "/bin/sh"
    );
    const ports = prompt(
      "Please enter port binding in JSON format:",
      '{"<container port>/tcp": <host port>}'
    );

    try {
      socket.send(
        craftMessage("run-image", {
          imageName,
          command,
          ports: JSON.parse(ports),
        })
      );
    } catch {}
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {imageList.map((image) => (
            <TableRow key={image.imageId}>
              <TableCell>{image.imageId}</TableCell>
              <TableCell>{image.imageName}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveImage(image.imageName)}>
                  <DeleteOutline />
                </IconButton>
                <IconButton onClick={() => handleRunImage(image.imageName)}>
                  <PlayCircleOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DockerImagesTable;
