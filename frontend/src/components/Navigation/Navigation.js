import React, { useState } from 'react';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/Icons';
import styled from 'styled-components';

const Navigation = ({ active, setActive }) => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

    // Toggle navigation visibility
    const toggleNav = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <NavStyled className={`${isOpen ? 'open' : 'closed'}`}>
            <button className="nav-toggle-btn" onClick={toggleNav}>
                {isOpen ? 'Close' : 'Menu'}
            </button>

            <div className='user-con'>
                <img src={avatar} alt='User Avatar' />
                <div className='text'>
                    <h2>Shubham</h2>
                    <p>Your money</p>
                </div>
            </div>

            <ul className='menu-items'>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)} // Removed the setIsOpen(false) here
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            <div className='bottom-nav'>
                <li onClick={() => setIsOpen(false)}>{signout} Sign Out</li>
            </div>
        </NavStyled>
    );
};

const NavStyled = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background: rgba(34, 34, 96, 0.9);
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    z-index: 1000; // Ensure it stays above other content
    transition: transform 0.5s ease-in-out; // Smooth transition

    &.closed {
        transform: translateX(-100%); // Hide offscreen
    }

    &.open {
        transform: translateX(0); // Show onscreen
    }

    .nav-toggle-btn {
        position: absolute;
        top: 10px;
        right: -50px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        z-index: 1001; // Ensure button is above the nav
    }

    .user-con {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #ffffff;
            padding: 0.2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        h2, p {
            color: #f8f9fa;
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            padding-left: 1rem;
            color: #f8f9fa;

            i {
                color: rgba(248, 249, 250, 0.6);
                font-size: 1.4rem;
            }
        }
    }

    .active {
        color: #f8f9fa !important;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #f8f9fa;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        li {
            cursor: pointer;
            color: #e74c3c;
        }
    }
`;

export default Navigation;
