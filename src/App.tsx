import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useConnect, useAccount, useBalance, RecordsFilter, useRecords } from '@puzzlehq/sdk';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  type UseRecordsParams = {
    address?: string;
    multisig?: boolean;
    filter?: RecordsFilter,
    page?: number,
  }
  const filter: RecordsFilter = {
    programIds: ['mail_nm02.aleo'],
    type: 'all'
  }
  const { connect, data, error, loading } = useConnect();
  const { account } = useAccount();
  const { balances } = useBalance({
    address: account.address.toString(),
    multisig: true
  });
  const { records } = useRecords({filter});
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


  const Bal = async () => {    
    if (account){
      console.log(balances);
    }
    else {
      console.log('0');
    }
  }

  const Records = async () => {    
    if (records){
      console.log(records);
    }
    else {
      console.log('NA');
    }
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
          <a onClick={Bal}> How much balance? </a>
          <a onClick={Records}> What are my records like? </a>
        </header>
      </QueryClientProvider>
    </div>
  );
}

export default App;
