import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useConnect, useAccount } from '@puzzlehq/sdk';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const { connect, data, error, loading } = useConnect();
  const { account } = useAccount();
  const queryClient = new QueryClient();
  const wallet = async () => {
    try {
      await connect();
    }
    catch (err){
      console.log(err);
    }
    
    console.log(data);
    console.log(account.address);
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
