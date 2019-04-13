import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
        <div className="row" style={{ marginBottom: '10px', marginTop: '10px' }}>
            <ul className="nav nav-pills nav-justified">
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/" exact>All</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/favorites">Favorites</NavLink></li>
            </ul >
        </div>
    )
}

export default Header;