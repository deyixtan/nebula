import { useEffect, useState, useRef } from "react";
import { Box, Button, Stack, Tab, TextField } from "@mui/material";
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
  const [isPullingImage, setPullingImage] = useState(false);
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

  const handleClickPullRepository = () => {
    setPullingImage(true);
    socket.send(craftMessage("pull-image", pullRepository));
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
      else if (type === "pull-image") setPullingImage(false);
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
            <Stack spacing="10px" marginBottom="50px">
              <TextField
                variant="outlined"
                onChange={handleChangePullRepository}
              />
              <Button
                variant="contained"
                size="lg"
                onClick={() => {
                  handleClickPullRepository();
                }}
                disabled={isPullingImage === true}
              >
                Pull Image
              </Button>
            </Stack>
            <DockerImagesTable imageList={imageList} />
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
