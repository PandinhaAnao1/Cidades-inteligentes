const { moduleExpression } = require('@babel/types');
const bycrypt = require('bcrypt');
const { isArray } = require('util');
const { array } = require('yargs');


let dataBase = []

//separa a classe dos metodosstatusUsuari

class Usuario {
    constructor(
        nome, email, senha, permisoes = [null,null,null,null],
    ) {
        //explicar o porque desse _id com ternario
        //Explicar o porque valida senha
        if((this.validaEmail(email)) && this.verificaSenha(senha) && Array.isArray(permisoes)){
            const salt = bycrypt.genSaltSync(10)
            const hash = bycrypt.hashSync(senha,salt);
            this._id = (dataBase.length == 0 ? 0 : dataBase.length)
            this.nome = nome;
            this.email = email;
            this.senha = hash;
            this.permisoes = permisoes;
            this.statusUsuario = true;
            this.dateCria = new Date();
            this.dateLogin = null;
            this.logado = false;
            
            dataBase.push(this);
            return this;
        }else{
            return{
                Mensage:'Seu emai ou sua senha não atendem os criterios!',
                emailValido: this.validaEmail(email),
                senhaValida: this.verificaSenha(senha)
            };
        };
    };
    
    //Verificar se senha é valida
    verificaSenha(senha) {
        if (senha.length >= 8) {
            const verificaDados = (charCodeletra, x, itv) => {
                charCodeletra = charCodeletra - x;
                if ((charCodeletra <= itv) && (charCodeletra >= 0)) {
                    return true;
                } else {
                    return false;
                }
            }
            for (let c = 0; c < senha.length; c++) {
                let charDaLetra = senha.charCodeAt(c);
                if (verificaDados(charDaLetra, 97, 25)) {
                    //Intervalo de caractere minusculos a = 97, z = 122
                    var temMinuscula = true;
                } else if (verificaDados(charDaLetra, 65, 25)) {
                    //Intervalo de caractere maiusculo A = 65, Z = 90
                    var temMaiuscula = true;
                } else if (verificaDados(charDaLetra, 48, 9)) {
                    //Intervalo dos numeros 0 = 48, 9 = 57
                    var temNumeros = true;
                } else {
                    var temEspeciais = true;
                }
            };
            let testLogico = Boolean(temEspeciais && temNumeros && temMaiuscula && temMinuscula);
            return testLogico;
        } else {
            return false;
        }
    };
    //Jução do validaEmailRegex e validarEmailUnico
    validaEmail(email) {
        if((this.validaEmailRegex(email))&&(this.validarEmailUnico(email))){
            return true;
        }else{
            return false;
        };
    };
    
    //Verifica se o email obedece criterios de um regex
    validaEmailRegex(email){
        
        let emailValido = true;
        const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
        emailValido = regex.test(email);
        return emailValido;

    };

    //Verifica se email esta cadastrado na database
    validarEmailUnico(email){
        var emailUnico = true
        for (let i = 0; i < dataBase.length; i++) {
            let usuario = dataBase[i]
            if (email == usuario.email) {
                emailUnico = false;
                break;
            };
        }
        return emailUnico;
    };

    
    //Realiza cadastro de novos usuario unicos
    cadastrarNovoUsuario(usarioNovoNome,usuarioNovoemail,usarioNovosenha,usuarioNovoPemisoes) {
        let testeStatusLogin = 
            (this.logado && this.statusUsuario && this.permisoes[0]);
        let nomeValido = Boolean(usarioNovoNome);
        if (testeStatusLogin&&nomeValido) {
            let tentativaCadastro =
                new Usuario(
                    usarioNovoNome,
                    usuarioNovoemail,
                    usarioNovosenha,
                    usuarioNovoPemisoes
                );
                return tentativaCadastro;
        } else {
            return {
                Mensage: 'Não foi possivel cadastrar verifique os dados e login para realizar o cadastro!',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario,
                permissao:this.permisoes[0]
            };
        };
    };

    //Atulizar usario por campo
    altualizarUsuario(emailAtua, updNome, updemail, updSenha, updPermi) {
        //Corrijir a logica dos ifs
        let usuarioSemAtualizar;
        let testeStatusLogin = 
            (this.logado && this.statusUsuario && this.permisoes[1]);
        if (testeStatusLogin) {
            for(let i = 0;i<dataBase.length;i++){
                let usuario = dataBase[i];
                if(usuario.email==emailAtua){
                    usuarioSemAtualizar = usuario;
                };
            };
            let arryAtualizados = [null,null,null,null]
            if(updNome){
                usuarioSemAtualizar.nome = updNome;
                arryAtualizados[0] = true;
                }
            if(updemail){
                let emailValido = this.validaEmail(updemail);
                if(emailValido){
                    usuarioSemAtualizar.email = updemail;
                    arryAtualizados[1] = true;
                }; 
                }
            if(updSenha){
                let senhaValida = this.verificaSenha(updSenha);

                if(senhaValida){//passarcripto
                    const salt = bycrypt.genSaltSync(10)
                    const hash = bycrypt.hashSync(updSenha,salt)
                    usuarioSemAtualizar.senha = hash;
                    arryAtualizados[2] = true;
                }
            }
            if(Array.isArray(updPermi)){
                usuarioSemAtualizar.permisoes = updPermi;
                arryAtualizados[3] = true;
                
               }

            if(arryAtualizados[0]||arryAtualizados[1]||arryAtualizados[2]||arryAtualizados[3]){
                return {
                    Mensage: 'Campos atualizado com sucesso!',
                    Nome:arryAtualizados[0]?'O campo do nome foi atualizado!':'O campo não atualizado!',
                    Email:arryAtualizados[1]?'O campo do email foi atualizado!':'O campo não atualizado!',
                    Senha:arryAtualizados[2]?'O campo da senha foi atualizado!':'O campo não atualizado!',
                    Permisoes:arryAtualizados[3]?'O campo do permisões foi atualizado!':'O campo não atualizado!'
                }
            }else{
                return{
                    Mensage:'Verifique os campos para realizar a atualização',
                    ComoUsar:'Os campos que nao serão atualizado devem serem null'
                }
            }
        }else{
            return{
                Mensage:'Voce nao pode realizar atualização verifique seus dados',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario,
                emailValido: (!this.validarEmailUnico(email)),
                permissao:this.permisoes[1],
            }
        }

    };

    //ativar usuario existentes
    ativarUsuarios(email) {
        //colocar explicação o porque do foreche
        const testeStatusLogin = 
            (this.logado && this.statusUsuario && (!this.validarEmailUnico(email)) && (email!=this.email) && this.permisoes[2]);
        if (testeStatusLogin) {
            let resutado;
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].email === email) {
                    dataBase[i].statusUsuario = true;
                    resutado = {
                        Mensage: `O usuario ${dataBase[i].nome} foi ativado com sucesso!`,
                        usuarioHabilitado: dataBase[i].statusUsuario
                    };
                    break;
                }
            };
            return resutado;
        } else {
            return {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario,
                emailValido: (!this.validarEmailUnico(email)),
                permissao:this.permisoes[2],
                emailDeOutroUser:email!=this.email

            }
        }
    };

    //Desativar o usuario existentes
    desativarUsuarios(email) {
        //colocar explicação o porque do foreche
        const testeStatusLogin = 
            (this.logado && this.statusUsuario && (!this.validarEmailUnico(email)) && (email!=this.email) && this.permisoes[2]);
        if (testeStatusLogin) {
            let resutado;
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].email === email) {
                    dataBase[i].statusUsuario = false;
                    resutado = {
                        Mensage: `O usuario ${dataBase[i].nome} foi desativado com sucesso!`,
                        usuarioHabilitado: dataBase[i].statusUsuario
                    };
                    break;
                };
            };
            return resutado;
        } else {
            return {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario,
                emailValido: !(this.validarEmailUnico(email)),
                permissao:this.permisoes[2],
                emailDeOutroUser:this.email!=email

            };
        };
    };

    //Excluir usuario existentes
    excluirUsuarios(email) {
        let testeLogico = 
            this.logado && this.statusUsuario && !(this.validarEmailUnico(email)) && (email!=this.email) && this.permisoes[3];
        if (testeLogico) {
            let resutado;
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].email == email) {
                    dataBase.splice(dataBase[i]._id, 1);
                    resutado ={
                        Mensage:'Usuario deletado com sucesso!',
                        exclusaoBemSucedida:true
                    };
                    break;
                };
            };
            return resutado;
        } else {
            return {
                Mensage: 'Não foi possivel realizar a exclusão do usuario verifique os dados!',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario,
                emailValido: !(this.validarEmailUnico(email)),
                exclusaoBemSucedida: false,
                permissao:this.permisoes[3]
            };
        }
    };


    //listar usuarios existentes
    listarUsuarios(email) {
        let testeLogico = Boolean(email) && this.logado && this.statusUsuario;
        if (testeLogico) {
            let buscarPorEmail = dataBase.find(
                (users) => {
                    if (users.email == email) {
                        return users;
                    }
                }
            );
            if(buscarPorEmail){
                return (buscarPorEmail);
            }else{
                return{
                    Mensage:'Voce inseriu um email errado por favor tente com outro.'
                }
            }
        } else if (this.logado && this.statusUsuario) {
            return dataBase;
        } else {
            return { 
                Mensage: 'Desculpe não foi possivel buscar usuarios verifique seu status e login.',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario
            }
        }
    }

    //Realiza login da propria classe
    realizarLogin(email, senha){ 
        const senhaCorreta =  bycrypt.compareSync(senha,this.senha); 
        let testeLogico = senhaCorreta && (email == this.email) && this.statusUsuario
        if (testeLogico && this.logado == false) {
            this.logado = true;
            this.dateLogin = new Date();
            return{
                Mensage:'Login realizado com sucesso!'
            }
        } else {
            return{
                Mensage:'Falha ao realizar login!',
                statusDelogin: this.logado,
                statusUsuario: this.statusUsuario,
                senhaValida: senhaCorreta,
                emailValido: this.email == email
            }
        }
    };

    //Realiza logout da propria classe
    realizarLogout() {
        if(this.logado == true){
            this.logado = false;
            return{
                Mensage:'Logout realizado com sucesso!'
            }
        }else{
            return{
                Mensage:'Voce nao esta logado realize o login primeiro!'
            }
        }
    };
}

// const guilherme = new Usuario('Guilherme krause','GuilhermeKrause@gmail.com','Altenirgomes1.',[true,true,true,true]);
// const loginrealizado = guilherme.realizarLogin('GuilhermeKrause@gmail.com','Altenirgomes1.');
// const aldison = guilherme.cadastrarNovoUsuario("Adilson portilho barbosa","adison@gmail.com","aldisonSenha23?",[true,true,true,true]);

// const emailErrado  =  guilherme.listarUsuarios('adison@gmail.com');
// console.log(emailErrado)

// const adisonAtulizado = guilherme.altualizarUsuario("adison@gmail.com",null,null,null,null)
// console.log(adisonAtulizado);dataBase
// console.log(aldison)
module.exports = {Usuario, dataBase};
