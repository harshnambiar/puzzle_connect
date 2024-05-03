import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useConnect, useAccount, useBalance, RecordsFilter, useRecords, EventsFilter } from '@puzzlehq/sdk';
import { requestCreateEvent, GetEventsResponse, getEvents } from '@puzzlehq/sdk-core';
import { EventType } from '@puzzlehq/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

function App() {
  const [addr, setAddr] = useState<string | ''>();
  const [codeCount, setCodeCount] = useState('');

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
  
  const filter2: EventsFilter = {
    programId: 'cypher_nm01.aleo',
    functionId: 'create_code'
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
      if (account){
        console.log(account.address);
        setAddr(account.address.toString());
      }
      
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

  const EventCreate = async () => {    
    const createEventResponse = await requestCreateEvent({
      type: EventType.Execute,
      programId: 'cypher_nm01.aleo',
      functionId: 'create_code',
      fee: 1.23,
      inputs: Object.values(['1212field'])
    });
    if (createEventResponse.error) {
      console.log(createEventResponse.error);
    } else {
      console.log(createEventResponse.eventId);
    }
  }

  const EventsGet = async () => {
    const filter: EventsFilter = {
      programId: 'cypher_nm01.aleo',
      functionId: 'create_code'
    }

    try {
      const response: GetEventsResponse = await getEvents(filter);
      console.log(response);
    } catch (e) {
      console.log(e);
      console.log('event fetch failed');
    }
  }
  

  const CodesGet = async () => {
    var acc = ''
    if (account){
      acc = account.address.toString();
    }
    console.log(acc);
    fetch('https://node.puzzle.online/testnet3/program/cypher_nm01.aleo/mapping/code_count/'.concat(acc))
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setCodeCount(data);
    });
      
    console.log(codeCount);
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
          <a onClick={EventCreate} style={{"cursor":'pointer'}}> Create Cypher Code in cypher_nm01 </a>
          <a onClick={EventsGet} style={{"cursor":'pointer'}}> Get the Cypher Code Events </a>
          <a onClick={CodesGet} style={{"cursor":'pointer'}}> How Many Cypher Codes Have I Created? </a>
        </header>
      </QueryClientProvider>
    </div>
  );
}

export default App;
