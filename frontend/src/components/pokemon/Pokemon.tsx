import * as React from 'react';
import styled from 'styled-components';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { ADD_POKEMON_TO_FAV, REMOVE_POKEMON_FROM_FAV } from './pokemon-mutations';
import './pokemon.css';

type myProps = {
    id: string,
    imgSrc: string,
    pokemonName: string,
    pokemonType: string,
    isFavorite: boolean,
    isDisplayCard: boolean;
}

type myState = {
    isFavorite: boolean
}

class Pokemon extends Component<myProps, myState> {

    constructor(props) {
        super(props);
        this.state = { isFavorite: props.isFavorite };
    }

    render() {

        let StyledParent = styled.div`
            border: 1px solid #cccccc;
            margin-right: 15px;
            margin-bottom: 15px;
        `;

        let StyledImage = styled.div`
            flex-grow:1;
            display: flex;
            align-items: center;   
            justify-content: center;
            img {
                width:200px;
                height:200px;
            }
        `;

        let StyledDetails = styled.div`
            border: 1px solid #cccccc;    
        `;

        if (!this.props.isDisplayCard) {
            StyledParent = styled.div`
                display:inline-flex;
                border: 1px solid #cccccc;
                margin-bottom: 15px;
                width:100%;
            `;

            StyledImage = styled.div`
                display: flex;
                align-items: left;   
                justify-content: left;
                img {
                    width:65px;
                    height:60px;
                }
            `;

            StyledDetails = styled.div`
                border: 1px solid #cccccc;
                padding-top:5px;
                width:100%;
            `;
        }

        return (
            <StyledParent className="col-ms-4">
                <StyledImage>
                    <Link to={this.props.id}>
                        <img src={this.props.imgSrc} className="img-fluid img-responsive" />
                    </Link>
                </StyledImage>
                <StyledDetails className="subtitle">
                    <div className="details">
                        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{this.props.pokemonName}</span>
                        <br />
                        <span style={{ marginLeft: "10px" }}>{this.props.pokemonType}</span>
                    </div>
                    <this.FavoriteButton />
                </StyledDetails>
            </StyledParent>
        )
    }

    FavoriteButton = () => {
        let favoriteButton;
        if (this.state.isFavorite) {
            favoriteButton = <Mutation
                mutation={REMOVE_POKEMON_FROM_FAV}
                variables={{ id: this.props.id }}>
                {
                    (makeUnfavorite, { client }) => (<button type="button" className="favicon favButton" onClick={() => { makeUnfavorite(); this.setState({ isFavorite: !this.state.isFavorite }); client.resetStore() }}></button>)
                }
            </Mutation>
        } else {
            favoriteButton = <Mutation
                mutation={ADD_POKEMON_TO_FAV}
                variables={{ id: this.props.id }}>
                {
                    (makeFavorite, { client }) => (<button type="button" className="noFavIcon favButton" onClick={() => { makeFavorite(); this.setState({ isFavorite: !this.state.isFavorite }); client.resetStore() }}></button>)
                }
            </Mutation>
        }
        return favoriteButton;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isFavorite !== this.props.isFavorite;
    }
}

export default Pokemon;