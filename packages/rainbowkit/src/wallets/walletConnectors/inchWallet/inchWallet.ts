import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { isAndroid } from "../../../utils/isMobile";
import { Wallet } from "../../Wallet";
import { getWalletConnectConnector } from "../../getWalletConnectConnector";

export interface inchWalletOptions {
    projectId?: string;
    chains: Chain[];
}

export const inchWallet = ({
    chains,
    projectId,
}: inchWalletOptions): Wallet => ({
    id: '1inch',
    name: '1inch',
    iconUrl: async () => (await import('./inchWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
        android: 'https://play.google.com/store/apps/details?id=io.oneinch.android',
        ios: 'https://apps.apple.com/us/app/1inch-defi-wallet/id1546049391',
        qrCode: 'https://1inch.io/wallet/'
    },
    createConnector: () => {
        const connector = getWalletConnectConnector({ projectId, chains });

        return {
            connector,
            mobile: {
                getUri: async () => {
                    const { uri } = (await connector.getProvider()).connector;

                    return isAndroid()
                        ? uri
                        : `https://wallet.1inch.io/wc?uri=${encodeURIComponent(uri)}`
                }
            },
            qrCode: {
                getUri: async () => (await connector.getProvider()).connector.uri,
            }
        }
    }
})
