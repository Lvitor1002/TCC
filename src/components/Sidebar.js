import React from "react";
import usericon from "adminbsb-materialdesign/images/user.png";
import Config from "../utils/Config";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
    state = {
        defaultClass: "btn-group user-helper-dropdown",
    };

    

    constructor(props) {
        super(props);
        this.divref = React.createRef();
        this.divref2 = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleMouseClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleMouseClick, false);
    }

    handleMouseClick = (event) => {
        if (!this.divref.current.contains(event.target) && !this.divref2.current.contains(event.target)) {
            console.log("Click Outside");
            this.setState({ defaultClass: "btn-group user-helper-dropdown" });
        }
    };

    showLogoutMenu = () => {
        if (this.state.defaultClass === "btn-group user-helper-dropdown") {
            this.setState({ defaultClass: "btn-group user-helper-dropdown open" });
        } else {
            this.setState({ defaultClass: "btn-group user-helper-dropdown" });
        }
    };

    render() {
        const { activepage } = this.props;

        // Estilos embutidos
        const dropdownMenuStyle = {
            position: 'absolute',
            top: '100%',
            right: '-242px',
            left: 'auto',
            zIndex: '1000',
            display: this.state.defaultClass.includes("open") ? 'block' : 'none',
            minWidth: '10rem',
            padding: '0.5rem 0',
            margin: '0.125rem 0 0',
            fontSize: '1rem',
            color: '#8cac6b',
            textAlign: 'left',
            listStyle: 'none',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '0.25rem',
            boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.175)',
        };

        // Estilo para o sidebar com a cor do navbar
        const sidebarStyle = {
            backgroundColor: '#00000', // Cor do navbar
            color: '#fff', // Cor do texto no sidebar
            minHeight: '100vh', // Altura mínima para preencher a tela inteira
        };

        // Estilo para a div user-info com fundo verde
        // Estilo para a div user-info com fundo verde
        const userInfoStyle = {
            backgroundColor: '#e6f6c5', // Alterado para verde escuro
            padding: '13px 15px 12px 15px', // Ajustado conforme o original
            whiteSpace: 'nowrap', // Mantido conforme o original
            position: 'relative', // Mantido conforme o original
            borderBottom: '1px solid #e9e9e9', // Mantido conforme o original
            backgroundImage: 'url(http://localhost:3000/static/media/user-img-background.caf9d54….jpg)', // Mantido conforme o original
            height: '135px', // Mantido conforme o original
            marginBottom: '10px', // Mantido conforme o original
        };


        return (
            <section>
                <aside id="leftsidebar" className="sidebar" style={sidebarStyle}>
                    <div className="user-info" style={userInfoStyle}>
                        <div className="image">
                            <img src={usericon} width="48" height="48" alt="User" />
                        </div>
                        <div
                            className="name"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ fontWeight: 'bold', color: '#000' }}
                        >
                            Luiz Vitor
                        </div>
                        <div className="email" style={{ color: '#000' }}>luiz@gmail.com</div>
                        <div className={this.state.defaultClass}>
                            <button
                                type="button"
                                className="btn btn-sm dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true"
                                onClick={this.showLogoutMenu}
                                ref={this.divref}
                                style={{ backgroundColor: 'transparent', border: 'none', padding: 0, color: 'inherit' }}
                                title="Sair"
                            >
                                <i className="material-icons">keyboard_arrow_down</i>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-right" style={dropdownMenuStyle}>
                                <li ref={this.divref2}>
                                    <Link to={Config.logoutPageUrl} className="waves-effect waves-block">
                                        <i className="material-icons">input</i> Sair
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="menu">
                        <ul className="list">
                            {Config.sidebarItem.map((item) =>
                                <li
                                    key={item.index}
                                    className={item.index === activepage ? "active" : ""}
                                >
                                    <Link
                                        to={item.url}
                                        className="toggled waves-effect waves-block"
                                    >
                                        <i className="material-icons">{item.icons}</i>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </aside>
            </section>
        );
    }
}

export default Sidebar;
