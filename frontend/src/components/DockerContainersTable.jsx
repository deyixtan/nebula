import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DockerContainersTable = ({ containerList }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containerList.map((container) => (
            <TableRow key={container.containerId}>
              <TableCell>{container.containerId}</TableCell>
              <TableCell>{container.containerName}</TableCell>
              <TableCell>{container.containerImage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DockerContainersTable;
