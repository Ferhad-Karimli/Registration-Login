import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ width: 400, mx: "auto", mt: 4 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && <Login />}
        {activeTab === 1 && <SignUp setActiveTab={setActiveTab} />}
      </Box>
    </Box>
  );
}
