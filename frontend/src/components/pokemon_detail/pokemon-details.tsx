import * as React from 'react';
import { withRouter } from 'react-router'
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { ADD_POKEMON_TO_FAV, REMOVE_POKEMON_FROM_FAV } from '../pokemon/pokemon-mutations';

const GET_POKEMON = gql`
    query Pokemon($id: ID!) {
        pokemonById(id: $id) {                
            id,
            name,
            image,
            isFavorite,
            types,
            maxCP,
            maxHP,
            sound,
            weight {
                minimum,
                maximum
            },
            height {
                minimum,
                maximum
            }
            evolutions {
                id,
                name,
                image,
                isFavorite
            }
        }
}
`;

const StyledMainContainer = styled.div`
    width: 100%; 
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledPokemonContainer = styled.div`
    border: 1px solid #ccc;
    height: auto; 
    width:430px;
    justify-content:center;
    display: flex;
    flex-basics: 100%;
`;

const StyledDescriptionContainer = styled.div`
    width: 100%; 
    height: auto;
    background-color: #eee;
    display: flex;
    padding: 10px;
    padding-bottom:0;
`;

const StyledHealthContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #eee;
    padding: 10px;
    width: 100%;
`;

const StyledStatContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledStatBar = styled.div`
    flex-grow: 1;
    height: 10px;
    border-radius: 20px;
    margin-bottom: 5px;
    margin-top: 3px;
    &.purple {
        background-color: rgb(158, 161, 248);
    }
    &.green {
        background-color: rgb(132, 190, 163);
    }
`;

const StyledStatText = styled.div`
    width: 70px;
    padding-left: 10px;
    font-weight: bold;
    font-size: 12px;
`;

const StyledSizeInfoContainer = styled.div`
    background: #eee;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    width:100%;
`;

const StyledSizeInfo = styled.div`
    flex-grow: 1;
    padding: 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    :first-child {
        border-right: 1px solid #ccc;
    }
    .title {
        font-weight: 700;
        display: block;
        padding: 5px;
    }
`;


export default withRouter((props) => {
    const id = props.match.params.id;
    return (
        <Query
            query={GET_POKEMON}
            variables={{ id: id }}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error: {error}</div>
                if (data) {
                    return (
                        <StyledMainContainer className="container">
                            <StyledPokemonContainer className="row">
                                <img src={data.pokemonById.image} alt={data.pokemonById.name} className="img-responsive" />
                                <StyledDescriptionContainer>
                                    <div style={{ width: "90%" }}>
                                        <span style={{ fontWeight: "bold" }}>{data.pokemonById.name}</span>
                                        <br />
                                        <span>{data.pokemonById.types.join(",")}</span>
                                    </div>
                                    <FavoriteButton isFavorite={data.pokemonById.isFavorite} id={data.pokemonById.id} />
                                </StyledDescriptionContainer>

                                <StyledHealthContainer>
                                    <StyledStatContainer>
                                        <StyledStatBar className="purple" />
                                        <StyledStatText>CP: {data.pokemonById.maxCP}</StyledStatText>
                                    </StyledStatContainer>

                                    <StyledStatContainer>
                                        <StyledStatBar className="green" />
                                        <StyledStatText>HP: {data.pokemonById.maxHP}</StyledStatText>
                                    </StyledStatContainer>
                                </StyledHealthContainer>

                                <StyledSizeInfoContainer>
                                    <StyledSizeInfo>
                                        <span className="title">Weight</span>
                                        <span>{data.pokemonById.weight.minimum} - {data.pokemonById.weight.maximum}</span>
                                    </StyledSizeInfo>

                                    <StyledSizeInfo>
                                        <span className="title">Height</span>
                                        <span>{data.pokemonById.height.minimum} - {data.pokemonById.height.maximum}</span>
                                    </StyledSizeInfo>
                                </StyledSizeInfoContainer>
                            </StyledPokemonContainer>
                            <div style={{ display: "flex", flexBasis: "100%", justifyContent: "center" }}>
                                {data.pokemonById.evolutions.length > 0 ? <h1>Add Evolutions</h1> : ""}
                            </div>
                        </StyledMainContainer >
                    );
                }
            }}
        </Query>
    )
});

const FavoriteButton = (props) => {
    let favoriteButton;
    if (props.isFavorite) {
        favoriteButton = <Mutation
            mutation={REMOVE_POKEMON_FROM_FAV}
            variables={{ id: props.id }}>
            {
                (makeUnfavorite, { client }) => (<button type="button" className="favicon favButton" onClick={() => { makeUnfavorite(); client.resetStore() }}></button>)
            }
        </Mutation>
    } else {
        favoriteButton = <Mutation
            mutation={ADD_POKEMON_TO_FAV}
            variables={{ id: props.id }}>
            {
                (makeFavorite, { client }) => (<button type="button" className="noFavIcon favButton" onClick={() => { makeFavorite(); client.resetStore() }}></button>)
            }
        </Mutation>
    }
    return favoriteButton;
}