
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
        {isLoggedIn ? (
          <div className="card"><p>You are logged in!</p>
          <h1>Wallets</h1>

          {userWallets.map((wallet) => (
            <p key={wallet.id}>
                Wallet Address: {wallet.address}
            </p>
            )) 
            }
            <button onClick={signMessage}>Sign Message</button>
          </div>
        ) : (
          <DynamicWidget />
        )}
      </>
    )
}

export default Auth;

