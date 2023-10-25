import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Box, Button, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Users from './components/Users';
import Posts from './components/post/Posts';
import LoginModal from './components/LoginModal';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
})

function App() {
  const [tabValue, setTabValue] = useState('1');
  const [isLogin, setIsLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabValue = (event, value) => {
    setTabValue(value);
  }

  return (
    // 加入ApolloProvider
    <ApolloProvider client={client}>
      <div className="App">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabValue} aria-label="lab API tabs example">
              <Tab label="Post List" value="1" />
              <Tab label="User List" value="2" />
            </TabList>
            {localStorage.getItem('x-token') ?
              <>
                <Button
                  variant='contained'
                  size='small'
                  sx={{position:'absolute', top: 0, right: 0, m: 1}} 
                  
                >
                  logout
                </Button>
              </>
            :
              <>
                <Button 
                  variant='contained'
                  size='small'
                  sx={{position:'absolute', top: 0, right: 0, m: 1}} 
                  onClick={()=>setModalOpen(true)}
                >
                  login
                </Button>
              </>
            }
            
          </Box>
          <TabPanel value="1">
            <Posts/>
          </TabPanel>
          <TabPanel value="2">
            <Users />
          </TabPanel>
        </TabContext>
        <LoginModal open={modalOpen} onClose={()=>setModalOpen(false)}/>
      </div>
    </ApolloProvider>
  );
}

export default App;
