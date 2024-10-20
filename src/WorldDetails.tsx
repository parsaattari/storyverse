import { useState } from "react";
import { Button, Modal, Box, Typography, Chip } from "@mui/material";

type World = {
    WorldName: string;
    Story: string;
    Genre: string;
    SubGenre: string;
    IPTerms: string;
    Tags: string[];
    id: string;
  };

interface WorldDetailsProps {
  world: World;
}

function WorldDetails({ world } : WorldDetailsProps) {
  const { id, WorldName: worldName, Story: story, Genre: genre, SubGenre: subGenre, IPTerms: ipTerms, Tags: tags } = world;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const fanfiction = [
    {
      WorldName: "A New Adventure",
      content: "In the mystical world of Ethereal Realms, a young apprentice embarks on a journey to uncover the secrets of magic and technology..."
    }
  ];

  return (
    <>
      <Button onClick={handleOpenModal}>Open World Details</Button>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="world-details-modal"
        aria-describedby="world-details-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}>
          <Typography variant="h4" component="h1" id="world-details-modal">
            {worldName}
          </Typography>
          <Typography variant="h5" component="h2">World Details</Typography>
          <Typography><strong>Genre:</strong> {genre}</Typography>
          <Typography><strong>Subgenre:</strong> {subGenre}</Typography>
          <Typography><strong>IP Terms:</strong> {ipTerms}</Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="span"><strong>Tags:</strong></Typography>
            {tags?.map((tag, index: number) => (
              <Chip key={index} label={tag} sx={{ ml: 1 }} />
            ))}
          </Box>
          <Typography variant="h5" component="h2">Original Story</Typography>
          <Typography paragraph>{story}</Typography>
          <Typography variant="h5" component="h2">Fanfiction</Typography>
          {fanfiction.length > 0 ? (
            fanfiction.map((story, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{story.WorldName}</Typography>
                <Typography>{story.content}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No fanfiction available for this world yet.</Typography>
          )}
          <Button 
            variant="contained" 
            onClick={() => window.location.href = `/create-fanfiction/${id}`}
            sx={{ mt: 2 }}
          >
            Create New Fanfiction
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default WorldDetails;
