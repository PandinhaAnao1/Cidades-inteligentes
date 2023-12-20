//Criar um novo usuário com os atributos mencionados.
//Alterar os dados de um usuário existente.
//     ○ Ativar/desativar usuários.
//     ○ Excluir um usuário.
//     ○ Listar todos os usuários cadastrados.
//     ○ Login e logout.

let dataBase = []

//separa a classe dos metodos

class usuario{
    constructor(
        nome, email, senha, permi, 
    ) {
        this._id = dataBase.length+1
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permi = permi;
        this.statu = true;
        this.dateCria = null;
        this.dateLogin = null;
        this.logado = false;
    };


    //não permitir cadastrar dois usuario com emials iguais
    cadastrarNovoUsuario(novoUsuario, cadLogado = this.logado, cadStatus = this.status) {
        let testeLogico = (cadLogado && cadStatus) && novoUser.length == 3;
        if (testeLogico) {
            let user = 
                new usuario(
                    novoUsuario[0],
                    novoUsuario[1],
                    novoUsuario[2],
                        );
                    dataBase.push(user);
                    return user;
        } else {
            return {
                Mensage:'Não foi possivel cadastrar verifique os dados para o cadastro!',
                user:novoUsuario
            }
        }
    };

    //Por campo
    altualizarUsuario(emailAtua,updNome,updemail,updSenha,updPermi,cadLogado = this.logado, cadStatus = this.status) {
        let usuarioSemAtualizar  = dataBase.find((user)=>{
            if(user.email == emailAtua ){
                return user;
            }else{
                return false;
            };
        });
     
        let testeLogico = cadLogado&&cadStatus&&usuarioSemAtualizar;
        if(testeLogico){
            if(updNome){
                usuarioSemAtualizar.nome = updNome;
            }
            if(updemail){
                usuarioSemAtualizar.email = updemail;
            }
            if(updSenha){
                usuarioSemAtualizar.senha = updSenha;
            }
            if(updPermi){
                usuarioSemAtualizar.permi = updPermi;
            }
            return{
                Mensage:'Campos atualizado com sucesso!'
            }
        }else{
            return{
                Mensage:"Não foi possivel realizar a atualizar o usario relize login ou verifique o status."
            }
        }

    };

    ativarUsuarios(email,cadLogado = this.logado, cadStatus = this.status){
         //colocar explicação o porque do foreche
         const testeLogico = cadLogado&&cadStatus
         if(testeLogico){
             let resutado;
             dataBase.forEach((users) =>{
                 if (users.email === email) {
                     users.status = true;
                 resutado =  {
                     Mensage:`O usuario ${users.nome} foi ativado com sucesso!`
                   };
                 }else{
                     resutado = {
                         Mensage:`Não foi possivel ativar o usuario do email: ${email}`
                     };
                 };
             });
             return resutado;
         }else{
             return{
                 Mensage:'Ocorreu um erro ao tentar ativar um usuario verifique o login e se esta ativo!'
             }
         }
    };

    desativarUsuarios(email,cadLogado = this.logado,cadStatus = this.status ) {
        //colocar explicação o porque do foreche
        const testeLogico = cadLogado&&cadStatus
        if(testeLogico){
            let resutado;
            dataBase.forEach((users) =>{
                if (users.email === email) {
                    users.status = false;
                resutado =  {
                    Mensage:`O usuario ${users.nome} foi desativado com sucesso!`
                  };
                }else{
                    resutado = {
                        Mensage:`Não foi possivel desativar o usuario do email: ${email}`
                    };
                };
            });
            return resutado;
    
        }else{
            return{
                Mensage:'Ocorreu um erro ao tentar desativar um usuario'
            }
        }
    };

    excluirUsuarios(email,cadLogado = this.logado,cadStatus = this.status) {
        let testeLogico = email&& cadLogado && cadStatus
        if(testeLogico){
            let usuarioAdeletar  = dataBase.find(
                (user)=>{
                if(user.email == email){
                    dataBase.slice()
                };
            });
            console.log(usuarioAdeletar)
        }else{
            return {
                Mensage:'Não foi possivel realizar a exclusão do usuario!'
            };
        }
    };

    //usar o if para poder verificar se volto todos ou apenas um
    listarUsuarios(email) {
        return dataBase
    };

    realizarLogin(email, senha) {
        //validar email com regex []+@
        if (email == this.email && senha == this.senha) {
            this.logado = true;
            this.DateLogin = new Date()
        } else {
            console.log('Desculpe voce inseriu os dado de login errados!')
            this.logado = false
        }
    };

    realizarLogout() {
        this.logado = false;
    };

}

const altenir = new usuario;

altenir.email = 'altenirgomesmodesto@gmail.com';

altenir.senha = '123';

altenir.realizarLogin('altenirgomesmodesto@gmail.com', '123')

altenir.status = true;

let novoUser = ["Guilherme","krause@gmail.com","senha123"]
let novoUser2 = ["adison","adison@gmail.com","senhw123"]


const guilherme = altenir.cadastrarNovoUsuario(novoUser)
const adison = altenir.cadastrarNovoUsuario(novoUser2)
const lista  = altenir.ativarUsuarios("krause@gmail.com")

const paia  = altenir.excluirUsuarios("krause@gmail.com")
console.log()