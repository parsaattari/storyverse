import "./App.css";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabBar from "./TabBar";
import Create from "./Create";
import Explore from "./Explore";
import Account from "./Account";
import { useState } from "react";

function LandingPage({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  return (
    <>
      {value !== "0" && <TabBar value={value} setValue={setValue} />}
      {/* Add margin to prevent content from overlapping with tabs */}
      <Box sx={{ marginTop: "4rem" }}>
        <TabContext value={value}>
          <TabPanel value="0">
            <h1>Welcome to the StoryVerse!</h1>
            <Box sx={{ display: "flex", gap: 2 }}>
              <button style={{ backgroundColor: "#646cff", width: "33%" }} onClick={() => setValue("1")}>Create</button>
              <button style={{ backgroundColor: "#646cff", width: "33%" }} onClick={() => setValue("2")}>Explore</button>
              <button style={{ backgroundColor: "#646cff", width: "33%" }} onClick={() => setValue("3")}>Account</button>
            </Box>
          </TabPanel>
          <TabPanel value="1">
            <Create />
          </TabPanel>
          <TabPanel value="2">
            <Explore />
          </TabPanel>
          <TabPanel value="3">
            <Account />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default LandingPage;
