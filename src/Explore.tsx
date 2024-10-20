import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";



function Explore() {
  const [page, setPage] = useState(1);
  const storiesPerPage = 4;
  const collection_address = "0x2dce16172ad874b65a991d5f9876911688cf5efa";
  const [stories, setStories] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.storyprotocol.net/api/v1/assets?collection=${collection_address}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Assuming the API returns an array of assets
        setStories(data.assets.map((asset: any) => ({
          WorldName: asset.name,
          Story: asset.description,
          Genre: asset.attributes.find((attr: { trait_type: string; value: string }) => attr.trait_type === 'Genre')?.value || 'Unknown',
          SubGenre: asset.attributes.find((attr: { trait_type: string; value: string }) => attr.trait_type === 'SubGenre')?.value || 'Unknown',
          IPTerms: asset.attributes.find((attr: { trait_type: string; value: string }) => attr.trait_type === 'IPTerms')?.value || 'Unknown',
          Tags: asset.attributes.find((attr: { trait_type: string; value: string }) => attr.trait_type === 'Tags')?.value.split(',') || []
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [collection_address]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const displayStories = stories.slice(
    (page - 1) * storiesPerPage,
    page * storiesPerPage
  );

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
            sx={{
              width: "30%",
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
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
