import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

function CreateFanfiction() {
  const [story, setStory] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the story to your backend
    console.log('Submitting story:', story);
    // After submission, navigate back to the world details page
    navigate(`/world_details/${id}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <h2>Create Fanfiction</h2>
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        label="Your Story"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Publish
      </Button>
    </Box>
  );
}

export default CreateFanfiction;
