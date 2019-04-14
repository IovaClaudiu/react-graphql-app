import gql from 'graphql-tag';

export const ADD_POKEMON_TO_FAV = gql`
mutation ($id: ID!){
    favoritePokemon(id: $id){
      isFavorite
    }
  }
`;

export const REMOVE_POKEMON_FROM_FAV = gql`
mutation removeFavorite($id: ID!){
    unFavoritePokemon(id: $id){
      isFavorite
    }
  }
`;