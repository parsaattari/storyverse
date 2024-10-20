import { useEffect } from 'react';
import { useIsLoggedIn, useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

function Auth({ isWalletLoading, setIsInitializing }: { isWalletLoading: any, setIsInitializing: any }) {
    const isLoggedIn = useIsLoggedIn();
    const userWallets = useUserWallets()
    const { primaryWallet } = useDynamicContext();


    useEffect(() => {
        console.log('isWalletLoading:', isWalletLoading);
        setIsInitializing()
        console.log('isInitializing:', setIsInitializing);
    }, [isLoggedIn]);

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
