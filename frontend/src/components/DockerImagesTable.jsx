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
import { DeleteOutline } from "@mui/icons-material";
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
                <IconButton onClick={() => handleRemoveImage(image.imageId)}>
                  <DeleteOutline />
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
