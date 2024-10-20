import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";



function Explore() {
  const [page, setPage] = useState(1);
  const storiesPerPage = 4;
  const collection_address = "0x2dce16172ad874b65a991d5f9876911688cf5efa";
  const [stories, setStories] = useState([
    {
      WorldName: "Ethereal Realms",
      Story: "In a world where magic and technology coexist...",
      Genre: "Fantasy",
      SubGenre: "Sci-Fi",
      IPTerms: "Creative Commons",
      Tags: ["magic", "technology", "adventure"],
      id: "1"
    },
    {
      WorldName: "Neon Nights",
      Story: "In the sprawling cyberpunk metropolis of Neo Tokyo...",
      Genre: "Science Fiction",
      SubGenre: "Cyberpunk",
      IPTerms: "All Rights Reserved",
      Tags: ["cyberpunk", "dystopia", "AI"],
      id: "2"
    },
    {
      WorldName: "Whispers of the Past",
      Story: "An ancient artifact resurfaces, bringing with it long-forgotten secrets...",
      Genre: "Historical Fiction",
      SubGenre: "Mystery",
      IPTerms: "Open Source",
      Tags: ["archaeology", "mystery", "ancient civilizations"],
      id: "3"
    },
    {
      WorldName: "Starborn Legacy",
      Story: "As humanity reaches for the stars, they discover they're not alone...",
      Genre: "Science Fiction",
      SubGenre: "Space Opera",
      IPTerms: "Creative Commons",
      Tags: ["space", "aliens", "exploration"],
      id: "4"
    },
    {
      WorldName: "Shadows of Eldritch",
      Story: "In a small coastal town, cosmic horrors lurk beneath the surface...",
      Genre: "Horror",
      SubGenre: "Cosmic Horror",
      IPTerms: "All Rights Reserved",
      Tags: ["lovecraftian", "mystery", "supernatural"],
      id: "5"
    },
    {
      WorldName: "Clockwork Kingdom",
      Story: "In a world powered by steam and gears, a revolution is brewing...",
      Genre: "Steampunk",
      SubGenre: "Alternative History",
      IPTerms: "Open Source",
      Tags: ["steampunk", "revolution", "inventions"],
      id: "6"
    },
    {
      WorldName: "Verdant Apocalypse",
      Story: "Nature reclaims the Earth, and humanity must adapt or perish...",
      Genre: "Post-Apocalyptic",
      SubGenre: "Eco-Fiction",
      IPTerms: "Creative Commons",
      Tags: ["nature", "survival", "rebirth"],
      id: "7"
    },
    {
      WorldName: "Quantum Flux",
      Story: "Reality itself becomes unstable as quantum anomalies spread...",
      Genre: "Science Fiction",
      SubGenre: "Quantum Fiction",
      IPTerms: "All Rights Reserved",
      Tags: ["quantum physics", "reality-bending", "multiverse"],
      id: "8"
    }
  ]);


  const displayStories = stories.slice(
    (page - 1) * storiesPerPage,
    page * storiesPerPage
  );

  async function createAsset() {
    const url = 'https://api.storyprotocol.net/api/v1/assets';
    const headers = {
      'X-Api-Key': '4CWuPKSRTTxC7WvjPNsaZlAqJmrGL7OhNniUrZawdu8',
      'X-Chain': 'story-testnet',
      'accept': 'application/json',
      'content-type': 'application/json',
    };
  
    const data = {
      options: {
        tokenContractIds: [
          '0x2dce16172aD874b65A991d5f9876911688cf5eFa',
        ],
      },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Response:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function
  createAsset();
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {displayStories.map((story, index) => (
          <Box
            key={index}
            onClick={() => {
              const worldDetails = {
                worldName: story.WorldName,
                story: story.Story,
                genre: story.Genre,
                subgenre: story.SubGenre,
                ipTerms: story.IPTerms,
                tags: story.Tags,
                id: story.id,
              };
              window.location.href = `/world_details/${encodeURIComponent(JSON.stringify(worldDetails))}`;
            }}
            sx={{
              width: "30%",
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              cursor: "pointer"
            }}
          >
            <h3>{story.WorldName}</h3>
            <p>{story.Story}</p>
            <p>
              <strong>Genre:</strong> {story.Genre} - {story.SubGenre}
            </p>
            <p>
              <strong>IP Terms:</strong> {story.IPTerms}
            </p>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {story.Tags.map((tag, tagIndex) => (
                <Chip key={tagIndex} label={tag} size="small" />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        {Array.from(
          { length: Math.ceil(stories.length / storiesPerPage) },
          (_, i) => i + 1
        ).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            disabled={page === pageNum}
          >
            {pageNum}
          </button>
        ))}
      </Box>
    </>
  );
}

export default Explore;
