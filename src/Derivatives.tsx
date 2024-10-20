import "./App.css";
import Box from "@mui/material/Box";
import { Autocomplete, Chip, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, FormEvent } from "react";
import { PinataSDK } from "pinata";
import { toHex, Address } from 'viem';
import { useIpAsset, useNftClient, PIL_TYPE } from '@story-protocol/react-sdk';

function CreateDerivative() {
    const [tags, setTags] = useState<string[]>([]);
    const [worldName, setWorldName] = useState("");
    const [genre, setGenre] = useState("");
    const [subgenre, setSubgenre] = useState("");
    const [story, setStory] = useState("");
    const [ipTerms, setIpTerms] = useState("");
    const { createNFTCollection } = useNftClient();
    const { mintAndRegisterIpAndMakeDerivative } = useIpAsset();
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
          
          console.log("ipMetadataURI: ", upload.id)
          console.log("ipMetadataHash: ", toHex(upload.id.slice(0, 32), { size: 32 }))
          const response = await mintAndRegisterIpAndMakeDerivative({
            nftContract: "0x2dce16172ad874b65a991d5f9876911688cf5efa",
            derivData: {
              parentIpIds: ['0x16e4eE5C4E611082E4087Dac5c6bbeE05C40275a'], // parent IP IDs
              licenseTermsIds: ['1'], // license terms IDs
            },
            ipMetadata: {
              ipMetadataURI: upload.id,
              ipMetadataHash: toHex(upload.id.slice(0, 32), { size: 32 }),
              nftMetadataHash: toHex(upload.id.slice(0,32), { size: 32 }),
              nftMetadataURI: upload.id,
            },
            txOptions: { waitForTransaction: true }
          })

            
            console.log(`
              Completed at transaction hash ${response.txHash},
              response: ${response}
            `);
        } catch (error) {
          console.error('Error uploading data:', error);
          // Handle error (e.g., show error message to user)
        }
      };
    }