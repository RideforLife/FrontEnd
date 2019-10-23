import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/actions';
import {decode} from './decode';

const HeaderContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    padding: 4rem;
    background: #46351D;

    .rfl {
        font-family: 'Passion One', sans-serif;
        font-size: 4rem;
        @media (max-width: 730px) {
            font-size: 3rem;
        }
        @media (max-width: 476px) {
            font-size: 2rem;
        }
    }

    .safe {
        font-size: 4rem;
        font-family: 'Audiowide', sans-serif;
        margin-left: 2rem;
        @media (max-width: 730px) {
            display: none;
        }
    }

    .for {
        font-family: 'Roboto', sans-serif;
        margin-left: 2rem;
        font-size: 3rem;
        @media (max-width: 730px) {
            display: none;
        }
    }

    .link {
        font-family: Roboto;
        font-size: 2rem;
        margin: 0.5rem;
        color: white;

        &:hover {
            color: grey;
            text-decoration: none;
        }
            @media (max-width: 440px) {
                font-size: 1.5rem;
            }
        }

`

const StyledLink = styled(Link) `
    font-family: Roboto;
    font-size: 2rem;
    margin: 0.5rem;
    color: white;

    &:hover {
        color: grey;
        text-decoration: none;
    }
    @media (max-width: 440px) {
        font-size: 1.5rem;
    }
`



const Logo = styled(Link) `
    color: white;
    &:hover {
        color: grey;
        text-decoration: none;
    }
`

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    return (
        <HeaderContainer>
            <div>
                <Logo to='/'>
                    <div><span className='rfl'>Ride For Life</span><span className='for'>for</span> <span className='safe'>SAFE</span></div>
                </Logo>
            </div>
            <div>
                <a className='link' href='https://saferidefl.netlify.com/'>About</a>
                {loggedIn && (localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? <StyledLink to='/drivers'>Drivers</StyledLink> : <StyledLink to='/riders'>Riders</StyledLink>)}
                {loggedIn && <Link className='link' to='/account'>My Account</Link>}
                {loggedIn && <Link className='link' onClick={() => dispatch(logout())} to='/'>Logout</Link>}
                {!loggedIn && <Link className='link' to='/register/role'>Register</Link>}
                {!loggedIn && <Link className='link' to='/login'>Login</Link>}
            </div>
        </HeaderContainer>

    );
}

export default Header;