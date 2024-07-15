import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    componentDidMount() {
        document.body.style.backgroundColor = "#e6f6c5"; // Altere a cor do body aqui conforme necessário
        document.documentElement.style.setProperty('--navbar-color', '#284700'); // Altere a cor da navbar aqui
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null;
        document.documentElement.style.removeProperty('--navbar-color');
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid custom-navbar" style={{ backgroundColor: 'var(--navbar-color)' }}>
                    <div className="navbar-header">
                        <a href="#" className="bars" onClick={this.props.onBarClick}></a>
                        <Link className="navbar-brand" to="/">
                            SISTEMA DE GERENCIAMENTO, SOLUÇÕES E GESTÃO FARMACÊUTICA.
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
