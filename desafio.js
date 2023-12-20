

let usuario = class{

    constructor(
            nome,email,senha,permi,DateLogin,status
        ){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permi = permi;
        this.DateLogin = DateLogin;
        this.status = status;
        this.logado = false;
    };

    cadastrarNovoUsuario(logado = this.logado,cadStatus,novoUsuario){
        if(logado){
            console.log('passou no cad')
        }
    };

    altualizarUsuario(){

    };

    desativarUsuarios(){

    };

    excluirUsuarios(){

    };

    listarUsuarios(){

    };
    
    realizarLogin(email,senha){
        //validar email com regex []+@
        if(email==this.email && senha == this.senha){
            this.logado = true;
            this.DateLogin = new Date()
            console.log('sucesso!')
        }else{
            console.log('Desculpe voce inseriu os dado de login errados!')
            this.logado = false
        }
    };

    realizarLogout(){

    };

}

const altenir = new usuario;

altenir.email = 'altenirgomesmodesto@gmail.com';

altenir.senha = '123';

altenir.realizarLogin('altenirgomesmodesto@gmail.com','123')


console.log(altenir.DateLogin)