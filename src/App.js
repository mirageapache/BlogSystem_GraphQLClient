import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import logo from './logo.svg';
import './App.css';
import User from './components/Users';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
})

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <User />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
