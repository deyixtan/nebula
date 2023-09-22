import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Input,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Rnd } from "react-rnd";
import { VncScreen } from "react-vnc";
import DockerContainersTable from "../DockerContainersTable.jsx";
import DockerImagesTable from "../DockerImagesTable.jsx";
import BasicLayout from "../layouts/BasicLayout";
import { FETCH_CONTAINERS_DELAY, FETCH_IMAGES_DELAY } from "../../config.jsx";
import useAuth from "../../hooks/useAuth";

const IndexPage = () => {
  const { auth } = useAuth();
  const { socket } = auth;
  const [imageList, setImageList] = useState([]);
  const [containerList, setContainerList] = useState([]);
  const [tabValue, setTabValue] = useState("1");
  const [pullRepository, setPullRepository] = useState("");
  const [buildAndImportRepository, setBuildAndImportRepository] =
    useState(null);
  const [isCreatingImage, setCreatingImage] = useState(false);
  const [vncUrl, setVncUrl] = useState("");
  const vncUrlTextFieldRef = useRef(null);

  const craftMessage = (type, data) => {
    return JSON.stringify({ type, data });
  };

  const handleContainerLogs = (data) => {
    const [containerName, encodedLog] = data.split("^");
    const element = document.createElement("a");
    const file = new Blob([atob(encodedLog)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = containerName + ".log";
    document.body.appendChild(element);
    element.click();
  };

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const handleChangePullRepository = (event) => {
    setPullRepository(event.target.value);
  };

  const handleBuildAndImportRepository = (event) => {
    setBuildAndImportRepository(event.target.files[0]);
  };

  const handleClickPullRepository = () => {
    setCreatingImage(true);
    socket.send(craftMessage("pull-image", pullRepository));
  };

  const handleClickImportBuildArchive = (event) => {
    setCreatingImage(true);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(buildAndImportRepository);
    fileReader.onload = (e) => {
      const imageName = prompt(
        "Please enter desired image name:",
        "example:latest"
      );
      const content = {
        imageName,
        archive: btoa(new Uint8Array(e.target.result)),
      };
      socket.send(craftMessage("import-build-image", content));
    };
  };

  const handleClickVncConnect = () => {
    setVncUrl(vncUrlTextFieldRef.current.value);
  };

  const handleClickVncDisconnect = () => {
    setVncUrl("");
  };

  useEffect(() => {
    socket.handlerChain["index-page"] = (message) => {
      const { type, data } = JSON.parse(message);
      if (type === "image-list") setImageList(data);
      else if (type === "container-list") setContainerList(data);
      else if (type === "container-logs") handleContainerLogs(data);
      else if (type === "pull-image") setCreatingImage(false);
      else if (type === "import-build-image") setCreatingImage(false);
    };

    setInterval(
      () => socket.send(craftMessage("image-list", "")),
      FETCH_IMAGES_DELAY
    );
    setInterval(
      () => socket.send(craftMessage("container-list", "")),
      FETCH_CONTAINERS_DELAY
    );

    return () => {
      delete socket.handlerChain["index-page"];
    };
  }, []);

  return (
    <BasicLayout>
      <Box
        width="100%"
        minWidth="100%"
        maxWidth="100%"
        height="85%"
        minHeight="85%"
        maxHeight="85%"
      >
        <TabContext value={tabValue}>
          <Box borderBottom={1} borderColor="divider">
            <TabList variant="fullWidth" onChange={handleTabChange}>
              <Tab label="Images" value="1" />
              <Tab label="Containers" value="2" />
              <Tab label="VNC" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing="20px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Get images from Docker Hub</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing="20px">
                    <Input
                      variant="outlined"
                      placeholder="hello-world:latest"
                      onChange={handleChangePullRepository}
                      disabled={isCreatingImage === true}
                    />
                    <Button
                      variant="contained"
                      size="lg"
                      onClick={() => {
                        handleClickPullRepository();
                      }}
                      disabled={isCreatingImage === true}
                    >
                      Pull Image
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>
                    Import and build images from ZIP archive
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing="20px">
                    <Input
                      inputProps={{ accept: "application/zip" }}
                      type="file"
                      onChange={handleBuildAndImportRepository}
                      disabled={isCreatingImage === true}
                      disableUnderline
                    />
                    <Button
                      variant="contained"
                      size="lg"
                      onClick={handleClickImportBuildArchive}
                      disabled={isCreatingImage === true}
                    >
                      Import and build image
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <DockerImagesTable imageList={imageList} />
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <DockerContainersTable containerList={containerList} />
          </TabPanel>
          <TabPanel value="3">
            <Stack spacing="10px" marginBottom="50px">
              <TextField variant="outlined" inputRef={vncUrlTextFieldRef} />
              <Button
                variant="contained"
                size="lg"
                onClick={() => {
                  handleClickVncConnect();
                }}
                disabled={vncUrl !== ""}
              >
                Connect
              </Button>
              <Button
                variant="outlined"
                size="lg"
                onClick={() => {
                  handleClickVncDisconnect();
                }}
                disabled={vncUrl === ""}
              >
                Disconnect
              </Button>
            </Stack>
          </TabPanel>
          {vncUrl !== "" && (
            <Rnd
              default={{
                x: 0,
                y: 0,
                width: 320,
                height: 200,
              }}
              bounds="parent"
            >
              <VncScreen
                url={vncUrl}
                scaleViewport
                background="#000000"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Rnd>
          )}
        </TabContext>
      </Box>
    </BasicLayout>
  );
};

export default IndexPage;
