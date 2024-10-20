import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField, Switch } from "@mui/material";
import { useState } from "react";

function Account() {
  const [worlds, setWorlds] = useState([
    {
      name: "Mystic Realm",
      earnings: "$1,250",
      recentActivity: "New derivative work created",
      derivativeWorks: ["Enchanted Forest", "Dragon's Lair"],
      license: "Creative Commons",
      isPublic: true,
    },
    {
      name: "Neon City 2077",
      earnings: "$3,500",
      recentActivity: "License modified",
      derivativeWorks: ["Cyber Alley", "Neon Nights"],
      license: "All Rights Reserved",
      isPublic: true,
    },
    {
      name: "Underwater Kingdom",
      earnings: "$750",
      recentActivity: "New purchase",
      derivativeWorks: ["Coral Castle"],
      license: "Creative Commons",
      isPublic: true,
    },
  ]);

  const handleTogglePublic = (index) => {
    const newWorlds = [...worlds];
    newWorlds[index].isPublic = !newWorlds[index].isPublic;
    setWorlds(newWorlds);
  };

  return (
    <>
      <h1>Account</h1>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {worlds.map((world, index) => (
          <Box
            key={index}
            sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 2 }}
          >
            <h2>{world.name}</h2>
            <p>Earnings: {world.earnings}</p>
            <p>Recent Activity: {world.recentActivity}</p>
            <Box sx={{ display: "flex", flexDirection: "flex-column-star", gap: 1 }}>
              <h3>Derivative Works:</h3>
              <ul>
                {world.derivativeWorks.map((work, i) => (
                  <p key={i}>{work}</p>
                ))}
              </ul>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Box>
                <p>Current License: {world.license}</p>
              </Box>
              <Box>
                <Switch
                  checked={world.isPublic}
                  onChange={() => handleTogglePublic(index)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <span>{world.isPublic ? "Public" : "Private"}</span>
                <button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Delete World
                </button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Account;
