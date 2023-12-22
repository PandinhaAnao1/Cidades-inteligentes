//Criar um novo usuário com os atributos mencionados.
//Alterar os dados de um usuário existente.
//     ○ Ativar/desativar usuários.
//     ○ Excluir um usuário.
//     ○ Listar todos os usuários cadastrados.
//     ○ Login e logout.

let dataBase = []

//separa a classe dos metodosstatusUsuari

class usuario {
    constructor(
        nome, email, senha, permi,
    ) {
        //explicar o porque desse _id com ternario
        if(this.validaEmail(email) && this.verificaSenha(senha)){
            this._id = (dataBase.length == 0 ? 0 : dataBase.length)
            this.nome = nome;
            this.email = email;
            this.senha = senha;
            this.permi = permi;
            this.statusUsuario = true;
            this.dateCria = new Date();
            this.dateLogin = null;
            this.logado = false;
        }else{
            return{
                Mensage:'Seu emai ou sua senha não atendem os criterios!',
                emailValido: this.validaEmail(email),
                senhaValida: this.verificaSenha(senha)
            }
        }
    };


    //não permitir cadastrar dois usuario com emials iguais
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
    }

    validaEmail(email) {
        const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
        let emailValido = true;
        for (let i = 0; i < dataBase.length; i++) {
            if (email == dataBase[i].email) {
                emailValido = false;
                break;
            };
        }
        if(emailValido){
            emailValido = regex.test(email)
        }
        return emailValido;
    }

    cadastrarNovoUsuario(novoUsuario) {
        let testeStatusLogin = (this.logado && this.statusUsuario) && novoUser.length == 3;
        if (testeStatusLogin) {
            let tentativaCadastro =
                new usuario(
                    novoUsuario[0],
                    novoUsuario[1],
                    novoUsuario[2],
                );
                if(tentativaCadastro.statusUsuario == true){
                    dataBase.push(user);
                    return {
                        Mensage: 'O cadastro foi realizado com sucesso',
                        novoUsuario: user,
                        cadastroValido: true
                    };
                }else{
                    return tentativaCadastro;
            }
    
        } else {
            return {
                Mensage: 'Não foi possivel cadastrar verifique os dados e login para realizar o cadastro!',
                user: novoUsuario,
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario
            };
        };
    };

    //Por campo
    altualizarUsuario(emailAtua, updNome, updemail, updSenha, updPermi, cadLogado = this.logado, cadStatus = this.statu) {
        let testeStatusLogin = this.logado && this.statusUsuario;
        if (testeStatusLogin) {
            let usuarioSemAtualizar = dataBase.find((user) => {
                if (user.email == emailAtua) {
                    return user;
                } else {
                    return false;
                };
            });


            // if(updNome){
            //     usuarioSemAtualizar.nome = updNome;
            // }
            // if(updemail){
            //     usuarioSemAtualizar.email = updemail;
            // }
            // if(updSenha){
            //     usuarioSemAtualizar.senha = updSenha;
            // }
            // if(updPermi){
            //     usuarioSemAtualizar.permi = updPermi;
            // }
            return {
                Mensage: 'Campos atualizado com sucesso!'
            }
        } else {
            return {
                Mensage: "Não foi possivel realizar a atualizar o usario relize login ou verifique o status."
            }
        }

    };

    ativarUsuarios(email) {
        //colocar explicação o porque do foreche
        const testeStatusLogin = 
            this.logado && this.statusUsuario && (!this.validaEmail(email)) && (email!=this.email);
        if (testeStatusLogin) {
            let resutado;
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].email === email) {
                    dataBase[i].status = true;
                    resutado = {
                        Mensage: `O usuario ${users.nome} foi ativado com sucesso!`,
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
                emailValido: (!this.validaEmail(email))

            }
        }
    };

    desativarUsuarios(email) {
        //colocar explicação o porque do foreche
        const testeStatusLogin = 
            this.logado && this.statusUsuario && (!this.validaEmail(email)) && (email!=this.email);
        if (testeStatusLogin) {
            let resutado;
            for (let i = 0; i < dataBase.length; i++) {
                if (dataBase[i].email === email) {
                    dataBase[i].status = false;
                    resutado = {
                        Mensage: `O usuario ${users.nome} foi desativado com sucesso!`,
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
                emailValido: !(this.validaEmail(email))
            };
        };
    };

    excluirUsuarios(email) {
        let testeLogico = 
            this.logado && this.statusUsuario && !(this.validaEmail(email)) && (email!=this.email);
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
                emailValido: !(this.validaEmail(email)),
                exclusaoBemSucedida: false
            };
        }
    };

    //usar o if para poder verificar se volto todos ou apenas um
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
            return (buscarPorEmail);
        } else if (this.logado && this.statusUsuari) {
            return dataBase;
        } else {
            return { 
                Mensage: 'Desculpe não foi possivel buscar usuarios verifique seu status e login.',
                loginAutenticado: this.logado,
                statusUsuario: this.statusUsuario
            }
        }
    }

    realizarLogin(email, senha) {
        //validar email com regex []+@
        let testeLogico = (email == this.email) && (senha == this.senha) && this.statusUsuario
        if (testeLogico) {
            this.logado = true;
            this.dateLogin = new Date();
            return{
                Mensage:'Login realizado com sucesso!'
            }
        } else {
            this.logado = false;
            return{
                Mensage:'Falha ao realizar login!',
                statusUsuario: this.statusUsuario,
                senhaValida: this.senha == senha,
                emailValido: this.email == email
            }
        }
    };

    realizarLogout() {
        this.logado = false;
    };
}


module.exports = usuario;






let dadosUsuarios = [
    ["Usuário1", "usuario1@example.com", "senha123"],
    ["Usuário2", "usuario2@example.com", "senha456"],
    ["Usuário3", "usuario3@exemplo.com", "senha789"],
    ["Usuário4", "usuario4_email_invalido", "senha987"],
    ["Usuário5", "usuario5@example.com", "senha543"],
    ["Usuário6", "usuario6@exemplo.com", "Senha210!"],
    ["Usuário7", "usuario7@example.com", "senha876"],
    ["Usuário8", "usuario8@exemplo.com", "senha321"],
    ["Usuário9", "usuario9@example.com", "senha654"],
    ["Usuário10", "usuario10@exemplo.com", "senha987"],
    ["Usuário11", "usuario11@example.com", "senha210"],
    ["Usuário12", "usuario12@exemplo.com", "senha543"]
];
