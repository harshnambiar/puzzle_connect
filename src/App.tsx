import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAccount } from '@puzzlehq/sdk';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const { account } = useAccount();
  const queryClient = new QueryClient();
  const wallet = () => {
    console.log(account);
  }
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <a
            className="App-link"
            href="https://darksunlabs.medium.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Puzzle Connect
          </a>
          <br/>
          <a onClick={wallet}> What's the Wallet Address? </a>
        </header>
      </QueryClientProvider>
    </div>
  );
}

export default App;
