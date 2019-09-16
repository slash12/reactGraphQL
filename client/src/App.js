import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';
import AddAmount from './components/AddAmount';
import './App.css';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          
            <Route exact path="/spacex" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
            <Route exact path="/add/amount" component={AddAmount} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
