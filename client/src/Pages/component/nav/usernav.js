import React from 'react';
import {Link} from 'react-router-dom';

const userNav=()=>{

    return(
        <ul className="nav d-flex flex-column">
            <li className="nav-item ">
                <Link className="nav-link" to='/user/history'>History</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to='/user/password'>password</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to='/user/wishlist'>wishlist</Link>
            </li>
        </ul>
        
    )
}

export default userNav;