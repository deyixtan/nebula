import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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

  useEffect(() => {
    socket.handlerChain["index-page"] = (message) => {
      const { type, data } = JSON.parse(message);
      if (type === "image-list") setImageList(data);
      else if (type === "container-list") setContainerList(data);
    };

    setInterval(() => socket.send("image-list"), FETCH_IMAGES_DELAY);
    setInterval(() => socket.send("container-list"), FETCH_CONTAINERS_DELAY);

    return () => {
      delete socket.handlerChain["index-page"];
    };
  }, []);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <BasicLayout>
      <Box
        width="85%"
        minWidth="85%"
        maxWidth="85%"
        height="85%"
        minHeight="85%"
        maxHeight="85%"
        border="2px solid black"
        borderRadius="15px"
      >
        <TabContext value={tabValue}>
          <Box borderBottom={1} borderColor="divider">
            <TabList onChange={handleTabChange}>
              <Tab label="Images" value="1" />
              <Tab label="Containers" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <DockerImagesTable imageList={imageList} />
          </TabPanel>
          <TabPanel value="2">
            <DockerContainersTable containerList={containerList} />
          </TabPanel>
        </TabContext>
      </Box>
    </BasicLayout>
  );
};

export default IndexPage;
