import gql from "graphql-tag";

export const GET_ALL_POKEMONS = gql`
{
    pokemons(query:{
        limit:-1
      }){
        edges{
            id
            name
            image
            types
            isFavorite
        }
      }
}`;

export const GET_FAVORITE_POKEMONS = gql`
{
  pokemons(query:{
    limit: -1
    filter: {
      isFavorite:true
    }
  }){
    edges{
        id
        name
        image
        types
        isFavorite
    }
  }
}`;

export const GET_ALL_TYPES = gql`
{
    pokemonTypes
}`;