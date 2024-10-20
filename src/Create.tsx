import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";

function Create() {
  const [tags, setTags] = useState<string[]>([]);
  const handleSubmit = () => {
    console.log("submit");
  const [worldName, setWorldName] = useState("");
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");

  const handleSubmit = async () => {
    try {
      const formData = {
        worldName,
        genre,
        subgenre,
        tags
      };

      const response = await fetch('https://your-walrus-api-endpoint.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      // Handle successful upload (e.g., show success message, reset form, etc.)
    } catch (error) {
      console.error('Error uploading data:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <p>Answer the following questions to create your world:</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box>
          <label htmlFor="world-name">World Name:</label>
          <input
            type="text"
            id="world-name"
            name="world-name"
            placeholder="Enter your world's name"
          />
        </Box>

        <Box>
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genre">
            <option value="">Select a genre</option>
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
          </select>
        </Box>

        <Box>
          <label htmlFor="subgenre">Subgenre:</label>
          <select id="subgenre" name="subgenre">
            <option value="">Select a subgenre</option>
            <option value="epic">Epic</option>
            <option value="urban">Urban</option>
            <option value="dystopian">Dystopian</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="steampunk">Steampunk</option>
          </select>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignSelf: "flex-row-center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="story">Write your story (3 paragraphs):</label>
          <textarea
            id="story"
            name="story"
            rows={10}
            cols={50}
            placeholder="Enter your story here..."
            style={{ marginTop: "10px" }}
          ></textarea>
        </Box>

        <Box>
          <label htmlFor="ip-terms">IP Terms:</label>
          <select id="ip-terms" name="ip-terms">
            <option value="">Select IP terms</option>
            <option value="copyright">Copyright</option>
            <option value="creative-commons">Creative Commons</option>
            <option value="public-domain">Public Domain</option>
          </select>
        </Box>

        <Autocomplete
          multiple
          sx={{ width: "100%" }}
          options={[]}
          freeSolo
          value={tags}
          onChange={(event, newValue: string[]) => setTags(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Add Tags" />
          )}
        />
        <button onClick={handleSubmit} type="submit" style={{ marginTop: "20px" }}>
          Create World
        </button>
      </Box>
    </>
  );
}

export default Create;
