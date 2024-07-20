import React from "react";
import { Navigate } from "react-router-dom";
import 'adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css';
import 'adminbsb-materialdesign/plugins/node-waves/waves';
import 'adminbsb-materialdesign/plugins/animate-css/animate.css';
import "adminbsb-materialdesign/css/style.css";
import AuthHandler from "../utils/AuthHandler";
import Config from "../utils/Config";

class Login extends React.Component {
    
    state = {
        username: "",
        password: "",
        bntDisable: true,
        loginStatus: 0,
    };
    
    saveInputs = (event) => {
        var key = event.target.name;
        this.setState({ [key]: event.target.value });
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({ bntDisable: false });
        } else {
            this.setState({ bntDisable: true });
        }
    };

    formSumit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.setState({ loginStatus: 1 });
        AuthHandler.login(this.state.username, this.state.password, this.handleAjaxResponse);
    };

    handleAjaxResponse = (data) => {
        console.log(data);
        if (data.error) {
            this.setState({ loginStatus: 4 });
        } else {
            this.setState({ loginStatus: 3 });
            window.location = Config.homeUrl;
        }
    };

    getMessages = () => {
        if (this.state.loginStatus === 0) {
            return "";
        } else if (this.state.loginStatus === 1) {
            return (<div className='btn btn-primary m-t-15 waves-effect btn-block'><strong></strong> Um momento... </div>);
        } else if (this.state.loginStatus === 3) {
            return (<div className='alert alert-success'><strong>Login realizado com sucesso!</strong></div>);
        } else if (this.state.loginStatus === 4) {
            return (<div className='alert alert-danger'><strong>Entrada de Login inválida!</strong></div>);
        }
    };
    
    render() {
        if (AuthHandler.loggedIn()) {
            return <Navigate to={Config.homeUrl} />;
        }

        document.body.className = "login-page";
        document.body.style.backgroundColor = "#cae4ac";
        return (
            <div className="login-box">
                <div className="logo">
                <a href="javascript:void(0);">
                    <span style={{ color: 'black' }}>PHARMACY<b style={{ color: 'green' }}>STORE</b></span>
                    </a>
                    <small style={{ color: 'green' }}>SISTEMA DE GERENCIAMENTO, SOLUÇÕES E GESTÃO FARMACÊUTICA.</small>
                </div>
                <div className="card">
                    <div className="body">
                        <form id="sign_in" method="POST" onSubmit={this.formSumit}>
                            <div className="msg">Entre com usuário e senha para iniciar sua sessão</div>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="material-icons">Ususário:</i>
                                </span>
                                <div className="form-line">
                                    <input type="text" className="form-control" name="username" placeholder="Entre com o seu usuário" required autoFocus onChange={this.saveInputs} />
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="material-icons">Senha:</i>
                                </span>
                                <div className="form-line">
                                    <input type="password" className="form-control" name="password" placeholder="Entre com a sua senha" required onChange={this.saveInputs} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-8 p-t-5">
                                    <input type="checkbox" name="rememberme" id="rememberme" className="filled-in chk-col-pink" />
                                    <label htmlFor="rememberme">Lembrar senha</label>
                                </div>
                                <div className="col-xs-4">
                                    <button className="btn btn-block bg-pink waves-effect" type="submit" disabled={this.state.bntDisable}>Entre</button>
                                </div>
                            </div>

                            {this.getMessages()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;


//          Registrar e esqueceu a senha
//<div className="row m-t-15 m-b--20">
//<div className="col-xs-6">
//    <a href="sign-up.html">Registre-se aqui!</a>
//</div>
//<div className="col-xs-6 align-right">
//    <a href="forgot-password.html"></a> 
//</div>
//</div>