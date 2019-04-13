import * as React from 'react';
import gql from "graphql-tag";
import styled from 'styled-components';

import { client } from '../App';
import { Component } from 'react';
import './pokemon.css';
import { Link } from 'react-router-dom';

const ADD_POKEMON_TO_FAV = gql`
mutation ($id: ID!){
    favoritePokemon(id: $id){
      isFavorite
    }
  }
`;

const REMOVE_POKEMON_FROM_FAV = gql`
mutation removeFavorite($id: ID!){
    unFavoritePokemon(id: $id){
      isFavorite
    }
  }
`;

const StyledImage = styled.div`
        flex-grow:1;
        display: flex;
        align-items: center;   
        justify-content: center;
        img {
            width:200px;
            height:200px;
        }
`;

type myProps = {
    id: string,
    imgSrc: string,
    pokemonName: string,
    pokemonType: string,
    isFavorite: boolean
}

type myState = {
    isFavorite: boolean
}

class Pokemon extends Component<myProps, myState> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-ms-4 pokemon">
                <StyledImage>
                    <Link to={this.props.id}>
                        <img src={this.props.imgSrc} className="img-fluid img-responsive" />
                    </Link>
                </StyledImage>
                <div className="subtitle">
                    <div className="details">
                        <span style={{ marginLeft: "10px" }}>{this.props.pokemonName}</span>
                        <br />
                        <span style={{ marginLeft: "10px" }}>{this.props.pokemonType}</span>
                    </div>
                    <this.FavoriteButton />
                </div>
            </div>
        )
    }

    FavoriteButton = () => {
        if (this.state.isFavorite) {
            return (<button type="button" className="favicon favButton" onClick={() => { this.addOrRemoveFromFav(this.props.id) }}></button>)
        } else {
            return (<button type="button" className="noFavIcon favButton" onClick={() => { this.addOrRemoveFromFav(this.props.id) }}></button>)
        }
    }

    addOrRemoveFromFav = (id: string) => {
        if (this.state.isFavorite) {
            client.mutate({
                mutation: REMOVE_POKEMON_FROM_FAV,
                variables: { id: id },
                fetchPolicy: "no-cache"
            }).then(() => {
                this.setState({ isFavorite: false });
            });
        } else {
            client.mutate({
                mutation: ADD_POKEMON_TO_FAV,
                variables: { id: id },
                fetchPolicy: "no-cache"
            }).then(() => {
                this.setState({ isFavorite: true });
            });
        }
    }

    componentWillMount() {
        this.setState({ isFavorite: this.props.isFavorite });
    }
}

export default Pokemon;