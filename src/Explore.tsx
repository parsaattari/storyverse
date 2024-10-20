import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import WorldDetails from "./WorldDetails";


type World = {
  WorldName: string;
  Story: string;
  Genre: string;
  SubGenre: string;
  IPTerms: string;
  Tags: string[];
  id: string;
};

function Explore() {
  const [page, setPage] = useState(1);
  const storiesPerPage = 4;
  const collection_address = "0x2dce16172ad874b65a991d5f9876911688cf5efa";
  const [stories, setStories] = useState<World[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const url = 'https://api.storyprotocol.net/api/v1/assets';
      const headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
      };
    
      const data = {
        options: {
          // collectionAddresses: [collection_address],
          pagination: {
            limit: 100,  // Adjust as needed
            offset: 0
          }
        }
      };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });
        console.log('Response1:', response);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const responseData = await response.json();
        console.log('Response:', responseData);

        const fetchedStories: World[] = await Promise.all(responseData.data.map(async (asset: any) => {
          const tokenUri = asset.nftMetadata.tokenUri;
          console.log('Token URI:', tokenUri);
          const metadataResponse = await fetch(`https://gateway.pinata.cloud/ipfs/${tokenUri}`);
          const metadata = await metadataResponse.json();

          return {
            WorldName: metadata.name || "Unnamed World",
            Story: metadata.description || "No description available",
            Genre: metadata.attributes?.find((attr: any) => attr.trait_type === "Genre")?.value || "Unknown",
            SubGenre: metadata.attributes?.find((attr: any) => attr.trait_type === "SubGenre")?.value || "Unknown",
            IPTerms: metadata.attributes?.find((attr: any) => attr.trait_type === "IPTerms")?.value || "Unknown",
            Tags: metadata.attributes?.filter((attr: any) => attr.trait_type === "Tag").map((tag: any) => tag.value) || [],
            id: asset.id.toString()
          };
        }));

        setStories(fetchedStories);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);


  const displayStories: World[] = stories.slice(
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
      console.log('Response2:', responseData);
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
        {displayStories.map((story: World, index: number) => (
          <Box
            key={index}
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
              {story.Tags.map((tag: string, tagIndex: number) => (
                <Chip key={tagIndex} label={tag} size="small" />
              ))}
            </Box>
            <WorldDetails world={story} />

          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        {Array.from(
          { length: Math.ceil(stories.length / storiesPerPage) },
          (_, i) => i + 1
        ).map((pageNum: number) => (
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
