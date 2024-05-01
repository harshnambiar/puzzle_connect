import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useConnect, useAccount, useBalance, RecordsFilter, useRecords } from '@puzzlehq/sdk';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

function App() {
  const [addr, setAddr] = useState<string | ''>();
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
    address: addr,
    multisig: true
  });
  const { records } = useRecords({filter});
  const queryClient = new QueryClient();
  const wallet = async () => {
    try {
      await connect();
      console.log(data);
      console.log(account.address);
      setAddr(account.address.toString());
    }
    catch (err){
      console.log(err);
      console.log('no address');
    }
    
    
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
          <a onClick={wallet} style={{"cursor":'pointer'}}> What's the Wallet Address? </a>
          <a onClick={Bal} style={{"cursor":'pointer'}}> How much balance? </a>
          <a onClick={Records} style={{"cursor":'pointer'}}> What are my records like? </a>
        </header>
      </QueryClientProvider>
    </div>
  );
}

export default App;
