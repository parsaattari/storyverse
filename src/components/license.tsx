import  { useEffect } from 'react';
import { toHex, Address } from 'viem';
import { useIpAsset, StoryProvider, useNftClient, PIL_TYPE } from '@story-protocol/react-sdk';
import { useWalletClient } from 'wagmi';

function License() {
  const { createNFTCollection } = useNftClient();
  const { mintAndRegisterIpAssetWithPilTerms } = useIpAsset();
  const { data: wallet } = useWalletClient();

  // Function to register the IP asset
  const registerIPA = async () => {
    try {
        const newCollection = await createNFTCollection({ 
            name: 'No-KAPP Test NFT', 
            symbol: 'KAPP', 
            txOptions: { waitForTransaction: true } 
        });

        const response = await mintAndRegisterIpAssetWithPilTerms({
            // an NFT contract address created by the SPG
            nftContract: newCollection.nftContract as Address,
            pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
            // https://docs.story.foundation/docs/ipa-metadata-standard
            ipMetadata: {
              ipMetadataURI: 'test-uri',
              ipMetadataHash: toHex('test-metadata-hash', { size: 32 }),
              nftMetadataHash: toHex('test-nft-metadata-hash', { size: 32 }),
              nftMetadataURI: 'test-nft-uri',
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
