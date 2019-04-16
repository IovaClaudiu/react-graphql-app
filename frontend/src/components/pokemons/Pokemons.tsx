import React, { Component } from 'react';
import { Query } from "react-apollo";
import styled from 'styled-components';

import Pokemon from '../pokemon/Pokemon';
import { GET_ALL_POKEMONS, GET_ALL_TYPES, GET_FAVORITE_POKEMONS } from './pokemons-mutations';
import './pokemons.css';


type myProps = {
    isFavorite: string
}

type myState = {
    attackType: string
    nameDisplay: string
    isDisplayCard: boolean
}

const StyledDiv = styled.div`
    &.col-md-2 {
        align-items: center;
        display: flex;
        justify-content: center;
    }
    &.col-md-7 {
        padding-left: 0 !important;
    }
    &.col-md-3 {
        padding: 0 !important;
    }
`;

const StyledHeaderContainer = styled.div`
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
    display: flex;
    text-align: center;
`;

const StyledVerticalLine = styled.span`
    position: relative;
    border-left: 2px solid #ccc;
    height: 35px;   
`;

const StyledInputIcon = styled.input`
    margin-left: 5px;
    margin-right: 5px;
    width: 25px;
    height: 25px;
`;

const StyledInputText = styled.input`
    width: 100%;
    background-color: #ccc;
    border: none;
    text-indent: 15px;
    height: 100%;
`;

const StyledSelect = styled.select`
    width: 100%;
    background-color: #ccc;
    border: none;
    text-indent: 15px;
    height: 100%;
`;

const StyledPokemonsContainer = styled.div`
    margin-right: 0;
    margin-left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export class Pokemons extends Component<myProps, myState>{

    constructor(props) {
        super(props);
        this.state = { attackType: "All", nameDisplay: "", isDisplayCard: true };
    }

    render() {
        if (this.props.isFavorite === "true") {
            return (this.getFavoritesPokemons());
        } else {
            return (this.getAllPokemons());
        }
    }

    getFilterHeader = () => {
        return (
            <StyledHeaderContainer className="row">
                <StyledDiv className="col-md-7">
                    <StyledInputText type="text" placeholder="Search" onChange={(event) => { this.setState({ nameDisplay: event.target.value }) }} />
                </StyledDiv>
                <StyledDiv className="col-md-3">
                    <StyledSelect onChange={(event) => { this.setState({ attackType: event.target.value }); }}>
                        <option key="All">All</option>
                        {this.getPokemonAttacks()}
                    </StyledSelect>
                </StyledDiv>
                <StyledDiv className="col-md-2">
                    <StyledInputIcon type="image" src="./resources/grid.png" onClick={() => { this.setState({ isDisplayCard: true }) }} />
                    <StyledVerticalLine />
                    <StyledInputIcon type="image" src="./resources/horizontal.png" onClick={() => { this.setState({ isDisplayCard: false }) }} />
                </StyledDiv>
            </StyledHeaderContainer>
        )
    }

    getAllPokemons = () => {
        return (
            <React.Fragment>
                {this.getFilterHeader()}
                <StyledPokemonsContainer className="row">
                    <Query query={GET_ALL_POKEMONS}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching...</div>
                            if (error) return <div>Error + {error}</div>
                            if (data) {
                                const pokemonData = data.pokemons.edges;
                                return this.displayPokemonsByFilters(pokemonData);
                            }

                        }}
                    </Query>
                </StyledPokemonsContainer>
            </React.Fragment>
        )
    }

    getFavoritesPokemons = () => {
        return (
            <React.Fragment>
                {this.getFilterHeader()}
                <StyledPokemonsContainer className="row">
                    <Query query={GET_FAVORITE_POKEMONS}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching...</div>
                            if (error) return <div>Error + {error}</div>
                            if (data) {
                                const pokemonData = data.pokemons.edges;
                                if (pokemonData.length == 0) {
                                    return <h2>No Favorites Pokemons to display</h2>
                                }
                                return this.displayPokemonsByFilters(pokemonData);
                            }
                        }}
                    </Query>
                </StyledPokemonsContainer>
            </React.Fragment>
        )
    }

    displayPokemonsByFilters = (pokemonData: any) => {
        if (this.state.attackType === "All" && this.state.nameDisplay === "") {
            return (
                pokemonData.map(pok =>
                    <Pokemon
                        key={pok.id}
                        id={pok.id}
                        imgSrc={pok.image}
                        pokemonName={pok.name}
                        pokemonType={pok.types.join(",")}
                        isFavorite={pok.isFavorite}
                        isDisplayCard={this.state.isDisplayCard}>
                    </Pokemon>
                ));
        } else {
            let newPokemonList = pokemonData;
            if (this.state.attackType !== "All") {
                newPokemonList = pokemonData.filter(pok => {
                    if (pok.types.indexOf(this.state.attackType) > -1) {
                        return pok;
                    }
                });
            }

            if (this.state.nameDisplay !== "") {
                newPokemonList = newPokemonList.filter(pok => {
                    if (pok.name.toUpperCase().startsWith(this.state.nameDisplay.toUpperCase())) {
                        return pok;
                    }
                });
            }

            if (newPokemonList.length == 0) {
                return <h2>No Pokemons to display!</h2>
            }
            return newPokemonList.map(newPok =>
                <Pokemon
                    key={newPok.id}
                    id={newPok.id}
                    imgSrc={newPok.image}
                    pokemonName={newPok.name}
                    pokemonType={newPok.types.join(",")}
                    isFavorite={newPok.isFavorite}
                    isDisplayCard={this.state.isDisplayCard}>
                </Pokemon>);
        }
    }

    getPokemonAttacks = () => {
        return <Query query={GET_ALL_TYPES}>
            {({ loading, error, data }) => {
                if (loading) return <option>Fetching...</option>
                if (error) return <option>Error fetchin data! {error}</option>
                if (data) {
                    return (
                        data.pokemonTypes.map(type => <option key={type}>{type}</option>)
                    )
                }
            }}
        </Query>
    }
}

export default Pokemons;