import React, { useEffect } from 'react';
import { toHex } from 'viem';
import { useIpAsset, StoryProvider } from '@story-protocol/react-sdk';
import { useWalletClient } from 'wagmi';

function License() {
  const { register } = useIpAsset();
  const { data: wallet } = useWalletClient();
  console.log("StoryProvider: ", StoryProvider);
  console.log("Wallet: ", wallet);
  // Function to register the IP asset
  const registerIPA = async () => {
    try {
      const response = await register({
        nftContract: '0xd516482bef63Ff19Ed40E4C6C2e626ccE04e19ED', // your NFT contract address
        tokenId: '12', // your NFT token ID
        ipMetadata: {
          ipMetadataURI: 'test-uri',
          ipMetadataHash: toHex('test-metadata-hash', { size: 32 }),
          nftMetadataHash: toHex('test-nft-metadata-hash', { size: 32 }),
          nftMetadataURI: 'test-nft-uri',
        },
        txOptions: { waitForTransaction: true },
      });
      
      console.log(
        `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
      );
    } catch (error) {
      console.error('Error registering IPA:', error);
    }
  };

  // Optional: Automatically call registerIPA on mount
  useEffect(() => {
    // Uncomment if you want it to run on component mount
    // registerIPA();
  }, []);

  return (
    <div>
      <h1>License</h1>
      <button onClick={registerIPA}>Register IP Asset</button>
    </div>
  );
}

export default License;
