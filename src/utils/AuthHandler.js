import Config from './Config';
import { reactLocalStorage } from 'reactjs-localstorage';

class AuthHandler {
    static login(username, password, callback) {
        fetch(Config.loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.access && data.refresh) {
                reactLocalStorage.set('token', data.access);
                reactLocalStorage.set('refresh', data.refresh);
                callback({ error: false, message: 'Login realizado com sucesso...' });
            } else {
                callback({ error: true, message: 'Dados inválidos' });
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            callback({ error: true, message: 'Erro ao realizar Login...' });
        });
    }

    static loggedIn() {
        return reactLocalStorage.get('token') && reactLocalStorage.get('refresh');
    }

    static getLoginToken() {
        return reactLocalStorage.get('token');
    }

    static getRefreshToken() {
        return reactLocalStorage.get('refresh');
    }

    static logoutUser() {
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('refresh');
    }

    static checkTokenExpiry() {
        const token = this.getLoginToken();
        if (!token) {
            return true; // Retorna true se não houver token
        }

        const tokenArray = token.split('.');
        if (tokenArray.length !== 3) {
            return true; // Retorna true se o token não for válido (não tem três partes)
        }

        const jwt = JSON.parse(atob(tokenArray[1]));
        if (!jwt || !jwt.exp || !Number.isFinite(jwt.exp)) {
            return true; // Retorna true se não houver campo de expiração válido no JWT
        }

        const expire = jwt.exp * 1000; // Converte expiração do JWT para milissegundos
        return Date.now() > expire; // Retorna true se a data atual for posterior à expiração do token
    }
}

export default AuthHandler;
