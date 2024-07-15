import axios from 'axios';
import Config from './Config';
import { reactLocalStorage } from 'reactjs-localstorage'; // Corrigido para importar reactjs-localstorage

class AuthHandler{
    static login(username,password,callback){
        axios
            .post(Config.loginUrl, {username: username, password: password})
            .then(function (response){
                if(response.status===200){
                    reactLocalStorage.set("token",response.data.access);
                    reactLocalStorage.set("refresh",response.data.refresh);
                    callback({error:false,message:"Login realizado com sucesso..."});
                }
            })
            .catch(function (error) {
                callback({error:true,"message":"Erro ao realizar Login..."});
            });
    }
    static loggedIn(){
        if(reactLocalStorage.get("token") && reactLocalStorage.get("refresh")){
            return true;
        }else{
            return false;
        }
    }
    static getLoginToken(){
        return reactLocalStorage.get("token")
    }
    static getRefreshToken(){
        return reactLocalStorage.get("refresh")
    }
    static logoutUser(){
        reactLocalStorage.remove("token");
        reactLocalStorage.remove("refresh");
    }
    static checkTokenExpiry() {
        const token = this.getLoginToken();
        if (!token) {
            return true; // Retorna true se não houver token
        }
    
        const tokenArray = token.split(".");
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

