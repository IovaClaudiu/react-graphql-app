import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import './header.css';


const HeaderParent = styled.div`
    margin-top:10px;
    margin-bottom:10px;
`;


const Header = () => {
    return (
        <HeaderParent className="row">
            <ul className="nav nav-pills nav-justified">
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/" exact>All</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/favorites">Favorites</NavLink></li>
            </ul >
        </HeaderParent>
    )
}

export default Header;