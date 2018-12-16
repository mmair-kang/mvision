import React, { Component } from 'react'; 
import Logo                 from '../components/header/Logo';
import Title                from '../components/header/Title';
import Timer                from '../components/header/Timer';

class Header extends Component{ 
    render(){
        return (
            <header>
                <Logo />
                <Title />
                <Timer />
            </header>
        );
    }
}

export default Header