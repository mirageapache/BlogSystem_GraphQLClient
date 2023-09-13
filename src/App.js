import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import './App.css';
import Users from './components/Users';
import Posts from './components/Posts'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
})

function App() {
  const [tabValue, setTabValue] = useState('2');

  const handleTabValue = (event, value) => {
    setTabValue(value);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabValue} aria-label="lab API tabs example">
              <Tab label="User List" value="1" />
              <Tab label="Post List" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Users />
          </TabPanel>
          <TabPanel value="2">
            <Posts/>
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
          
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
