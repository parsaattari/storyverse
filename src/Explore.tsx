import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";

function Explore() {
  const story1 = {
    Story: "A thrilling adventure that will keep you on the edge of your seat.",
    Tags: ["Adventure", "Thriller", "Mystery"],
    WorldName: "The World of Adventure",
    Genre: "Adventure",
    SubGenre: "Fantasy",
    IPTerms: "Creative Commons",
  };

  const story2 = {
    Story: "A heartwarming tale of friendship and self-discovery.",
    Tags: ["Coming of Age", "Friendship", "Drama"],
    WorldName: "Harmony Hills",
    Genre: "Drama",
    SubGenre: "Young Adult",
    IPTerms: "All Rights Reserved",
  };

  const story3 = {
    Story: "A dystopian future where technology controls every aspect of life.",
    Tags: ["Sci-Fi", "Dystopia", "Technology"],
    WorldName: "Neo-Tokyo 2099",
    Genre: "Science Fiction",
    SubGenre: "Cyberpunk",
    IPTerms: "Creative Commons",
  };

  const story4 = {
    Story:
      "A magical journey through a world of talking animals and enchanted forests.",
    Tags: ["Fantasy", "Magic", "Animals"],
    WorldName: "The Whispering Woods",
    Genre: "Fantasy",
    SubGenre: "Children's Literature",
    IPTerms: "All Rights Reserved",
  };

  const story5 = {
    Story: "A gripping murder mystery set in a small coastal town.",
    Tags: ["Mystery", "Crime", "Small Town"],
    WorldName: "Seaside Secrets",
    Genre: "Mystery",
    SubGenre: "Detective Fiction",
    IPTerms: "Creative Commons",
  };

  const story6 = {
    Story: "An epic space opera spanning galaxies and civilizations.",
    Tags: ["Space Opera", "Aliens", "Intergalactic"],
    WorldName: "The Cosmic Federation",
    Genre: "Science Fiction",
    SubGenre: "Space Opera",
    IPTerms: "All Rights Reserved",
  };

  const story7 = {
    Story: "A haunting tale of ghosts and dark family secrets.",
    Tags: ["Horror", "Supernatural", "Family Drama"],
    WorldName: "Shadowfall Manor",
    Genre: "Horror",
    SubGenre: "Gothic",
    IPTerms: "Creative Commons",
  };

  const story8 = {
    Story: "A lighthearted romantic comedy set in a bustling city.",
    Tags: ["Romance", "Comedy", "Urban"],
    WorldName: "Love in the Big Apple",
    Genre: "Romance",
    SubGenre: "Romantic Comedy",
    IPTerms: "All Rights Reserved",
  };

  const story9 = {
    Story: "An alternate history where magic and technology coexist.",
    Tags: ["Alternate History", "Steampunk", "Magic"],
    WorldName: "The Aetheric Empire",
    Genre: "Fantasy",
    SubGenre: "Steampunk",
    IPTerms: "Creative Commons",
  };

  const story10 = {
    Story:
      "A coming-of-age story set against the backdrop of a post-apocalyptic world.",
    Tags: ["Post-Apocalyptic", "Coming of Age", "Survival"],
    WorldName: "The Last City",
    Genre: "Science Fiction",
    SubGenre: "Post-Apocalyptic",
    IPTerms: "All Rights Reserved",
  };

  const story11 = {
    Story: "A thrilling heist adventure in a world of high-tech security.",
    Tags: ["Heist", "Technology", "Action"],
    WorldName: "Cyber Heist",
    Genre: "Thriller",
    SubGenre: "Techno-Thriller",
    IPTerms: "Creative Commons",
  };

  const story12 = {
    Story: "An exploration of ancient myths and legends in the modern world.",
    Tags: ["Mythology", "Urban Fantasy", "Adventure"],
    WorldName: "Myths Among Us",
    Genre: "Fantasy",
    SubGenre: "Urban Fantasy",
    IPTerms: "All Rights Reserved",
  };

  const story13 = {
    Story:
      "A psychological thriller that blurs the lines between reality and imagination.",
    Tags: ["Psychological", "Thriller", "Mind-Bending"],
    WorldName: "The Fractured Mind",
    Genre: "Thriller",
    SubGenre: "Psychological Thriller",
    IPTerms: "Creative Commons",
  };

  const [page, setPage] = useState(1);
  const storiesPerPage = 4;
  const stories = [
    story1,
    story2,
    story3,
    story4,
    story5,
    story6,
    story7,
    story8,
    story9,
    story10,
    story11,
    story12,
    story13,
  ]; // Add more stories as needed

  const displayStories = stories.slice(
    (page - 1) * storiesPerPage,
    page * storiesPerPage
  );

  return (
    <>
      <h1>Explore</h1>
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
