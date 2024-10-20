
import { useIsLoggedIn, useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

function Auth() {
    const isLoggedIn = useIsLoggedIn();
    const userWallets = useUserWallets()
    const { primaryWallet } = useDynamicContext();

    const signMessage = async () => {
        if (!primaryWallet) return;
    
        const signature = await primaryWallet.signMessage('example');
    
        console.log('signature', signature);
      };
  
    return (
      <>
        {!isLoggedIn && <DynamicWidget />}
      </>
    )
}

export default Auth;

