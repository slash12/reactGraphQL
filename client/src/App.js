import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddAmount from './components/AddAmount';
import Home from './components/Home';
import Header from './components/layout/Header';
import Budget from './components/Budget';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (    
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <Route exact path="/add/amount" component={AddAmount} />
          <Route exact path="/budget" component={Budget} />
          <Route exact path="/" component={Home} />        
      </Router>
    </ApolloProvider>
  );
}

export default App;
