import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import Header from './header/Header';
import Pokemons from './pokemons/Pokemons';

import './App.css';
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <div className="row">
              <Switch>
                <Route path="/" exact render={() => <Pokemons isFavorite="false" />} />
                <Route path="/favorites" exact render={() => <Pokemons isFavorite="true" />} />
                <Route path="**" render={() => <h1>&nbsp;Error, Unknown path!</h1>} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  )
}

export default App;