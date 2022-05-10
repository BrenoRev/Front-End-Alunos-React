import React from 'react';
import { Nav } from './styled';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {

    const botaoClicado = useSelector(state => state.botaoClicado);

    return (

       <Nav> 
           <Link to="/">
                <FaHome size={24} />
            </Link>

            <Link to="/login">
                <FaUserAlt size={24} />
            </Link>

            <Link to="/logout">
            {botaoClicado ? <FaSignOutAlt size={24}/> : ''}
            </Link>
            
       </Nav>

    )

}