import "./App.css";
import FileRotes from "./components/FileRoutes";
import { Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
const { provider, webSocketProvider, chains } = configureChains(defaultChains, [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  // added connectors from rainbowkit
  connectors,
});


function App(Component, pageProps) {

  return (
    <div className="App">
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <Switch>
                <Route path="/" component={FileRotes} />

              </Switch>
            </BrowserRouter>
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
