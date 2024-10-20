import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, FormEvent } from "react";
import { PinataSDK } from "pinata";
import { toHex, Address } from 'viem';
import { useIpAsset, useNftClient, PIL_TYPE } from '@story-protocol/react-sdk';

function Create() {
  const [tags, setTags] = useState<string[]>([]);
  const [worldName, setWorldName] = useState("");
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [story, setStory] = useState("");
  const [ipTerms, setIpTerms] = useState("");
  const { createNFTCollection } = useNftClient();
  const { mintAndRegisterIpAssetWithPilTerms } = useIpAsset();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting form...');
    event.preventDefault();
    try {
      const pinata = new PinataSDK({
        pinataJwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDlmZmUwNC0wOWIwLTRjMTYtYmJjZS01MDAxNjZiNDY0YTEiLCJlbWFpbCI6ImF0dGFyaS5wYXJzYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzAwNDdmNmVhODZmNGQxODBjYWQiLCJzY29wZWRLZXlTZWNyZXQiOiIzNGM3YzFkYTcxYTQ4MTI1NWY2YTc1NjNlZmQzYjMzMjdkY2YxMTU5MDhmNGEzNGI1NWIyNDAzMDUzMDgwZmIzIiwiZXhwIjoxNzYwOTQ5NjcyfQ.6Qt_nRyB-7YaTA60oq9w20DyLPobopbb_l7mEj1nYPU`,
        pinataGateway: `silver-substantial-tuna-224.mypinata.cloud`
      });

      const formData = {
        worldName,
        genre,
        subgenre,
        story,
        ipTerms,
        tags
      };

      const upload = await pinata.upload.json(formData)

      console.log('Upload successful:', upload);
      

      const response = await mintAndRegisterIpAssetWithPilTerms({
          // an NFT contract address created by the SPG
          nftContract: "0x2dce16172ad874b65a991d5f9876911688cf5efa" as Address,
          pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
          // https://docs.story.foundation/docs/ipa-metadata-standard
          ipMetadata: {
            ipMetadataURI: upload.id,
            ipMetadataHash: toHex(upload.id.slice(0, 32), { size: 32 })
          },
          txOptions: { waitForTransaction: true }
        });
        
        console.log(`
          Completed at transaction hash ${response.txHash},
          NFT Token ID: ${response.tokenId}, 
          IPA ID: ${response.ipId}, 
          License Terms ID: ${response.licenseTermsId}
        `);
    } catch (error) {
      console.error('Error uploading data:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <p>Answer the following questions to create your world:</p>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <TextField
            fullWidth
            label="World Name"
            id="world-name"
            name="world-name"
            value={worldName}
            onChange={(e) => setWorldName(e.target.value)}
            placeholder="Enter your world's name"
          />

          <FormControl fullWidth>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              value={genre}
              label="Genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              <MenuItem value="">Select a genre</MenuItem>
              <MenuItem value="fantasy">Fantasy</MenuItem>
              <MenuItem value="sci-fi">Science Fiction</MenuItem>
              <MenuItem value="mystery">Mystery</MenuItem>
              <MenuItem value="horror">Horror</MenuItem>
              <MenuItem value="romance">Romance</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="subgenre-label">Subgenre</InputLabel>
            <Select
              labelId="subgenre-label"
              id="subgenre"
              value={subgenre}
              label="Subgenre"
              onChange={(e) => setSubgenre(e.target.value)}
            >
              <MenuItem value="">Select a subgenre</MenuItem>
              <MenuItem value="epic">Epic</MenuItem>
              <MenuItem value="urban">Urban</MenuItem>
              <MenuItem value="dystopian">Dystopian</MenuItem>
              <MenuItem value="cyberpunk">Cyberpunk</MenuItem>
              <MenuItem value="steampunk">Steampunk</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Write your story (3 paragraphs)"
            id="story"
            name="story"
            multiline
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your story here..."
          />

          <FormControl fullWidth>
            <InputLabel id="ip-terms-label">IP Terms</InputLabel>
            <Select
              labelId="ip-terms-label"
              id="ip-terms"
              value={ipTerms}
              label="IP Terms"
              onChange={(e) => setIpTerms(e.target.value)}
            >
              <MenuItem value="">Select IP terms</MenuItem>
              <MenuItem value="copyright">Copyright</MenuItem>
              <MenuItem value="creative-commons">Creative Commons</MenuItem>
              <MenuItem value="public-domain">Public Domain</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            multiple
            fullWidth
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
              <TextField {...params} variant="outlined" label="Tags" placeholder="Add Tags" />
            )}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: "20px" }}>
            Create World
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Create;
