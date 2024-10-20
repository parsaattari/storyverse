import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { PinataSDK } from 'pinata';

function CreateFanfiction() {
  const [story, setStory] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  async function createAsset(tokenUri: string) {
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
        tokenUri: tokenUri
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
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function
  // createAsset();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the story to your backend
    console.log('Submitting story:', story);
    const pinata = new PinataSDK({
        pinataJwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDlmZmUwNC0wOWIwLTRjMTYtYmJjZS01MDAxNjZiNDY0YTEiLCJlbWFpbCI6ImF0dGFyaS5wYXJzYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzAwNDdmNmVhODZmNGQxODBjYWQiLCJzY29wZWRLZXlTZWNyZXQiOiIzNGM3YzFkYTcxYTQ4MTI1NWY2YTc1NjNlZmQzYjMzMjdkY2YxMTU5MDhmNGEzNGI1NWIyNDAzMDUzMDgwZmIzIiwiZXhwIjoxNzYwOTQ5NjcyfQ.6Qt_nRyB-7YaTA60oq9w20DyLPobopbb_l7mEj1nYPU`,
        pinataGateway: `silver-substantial-tuna-224.mypinata.cloud`
      });


      const upload = await pinata.upload.json({"story": story})
    
    await createAsset(upload.id);
    
    // After submission, navigate back to the world details page
    navigate(`/`);
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
