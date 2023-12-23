const { beforeEach } = require('node:test');
const {Usuario, dataBase} = require('./desafio.js'); 
const nodemon = require('nodemon');
// const validaEmail = global.usuario.validarEmailUnico;
// const realUsuario = usuario.bind(usuario.validarEmailUnico);

// global.usuario.validarEmailUnico = realUsuario;
describe("Testes metodos publicos da classe usuario",()=>{
    
    novoUsuario = new Usuario('Guilherme krause','GuilhermeKrause@gmail.com','Altenirgomes1.',[true,true,true,true]);
    segundoNovoUsuario = new Usuario('Adilson junior portilho Barbosa','adisonPortilhoBarbosa@gmail.com','OaltenirEmuitoGostoso4#');
    global.novoUsuario.logado = true;
    global.novoUsuario.statusUsuario = true;
    it("Teste para criar um novo usario esperado objeto",()=>{
        expect(novoUsuario).toBeInstanceOf(Usuario);
        expect(dataBase).toContain(novoUsuario);
    });

    it("Testa se um usuario realiza login correto",()=>{
        novoUsuario.logado = false
        const loginRealizado = novoUsuario.realizarLogin('GuilhermeKrause@gmail.com','Altenirgomes1.');
        const resutado = {Mensage:'Login realizado com sucesso!'}
        expect(loginRealizado).toEqual(resutado);
    });

    it("Testa se um usuario realiza login  porem  tem o estatos inativo espero um erro",()=>{
        novoUsuario.logado = false;
        novoUsuario.statusUsuario = false;
        const loginRealizado = novoUsuario.realizarLogin('GuilhermeKrause@gmail.com','Altenirgomes1.');
        const resutado = {
            Mensage:'Falha ao realizar login!',
            statusDelogin: false,
            statusUsuario: false,
            senhaValida: true,
            emailValido: true
            };      
        expect(loginRealizado).toEqual(resutado);
        novoUsuario.statusUsuario = true;

    });

    it("testa se o usuario faz login com senha errada esperado mensagem de erro!",()=>{
        novoUsuario = dataBase[0];
        novoUsuario.logado = false;
        const loginErrado = novoUsuario.realizarLogin('GuilhermeKrause@gmail.com','Altenirgomes1');
        const resutado = {
            Mensage:'Falha ao realizar login!',
            statusDelogin: false,
            statusUsuario: true,
            senhaValida: false,
            emailValido: true
        }
        expect(loginErrado).toEqual(resutado)
    });

    it("Testa se o realizar logout esperado mensagem de sucesso",()=>{
        novoUsuario.logado = true;
        const logoutRealziadoComSucesso = novoUsuario.realizarLogout()
        const resutado = {Mensage:'Logout realizado com sucesso!'};
        expect(logoutRealziadoComSucesso).toEqual(resutado);
        expect(novoUsuario.logado).toEqual(false);

    });

    it("Testa se o usario tenta realizar o logout sem estar logado esperado mensage de erro",()=>{
        novoUsuario.logado = false;
        const logoutRealizadoComFalha = novoUsuario.realizarLogout();
        const resutado = {Mensage:'Voce nao esta logado realize o login primeiro!'};
        expect(logoutRealizadoComFalha).toEqual(resutado);
        expect(novoUsuario.logado).toEqual(false);
    });

    it("Testa se o usuario consegue listar todos usuarios",()=>{
        novoUsuario.logado = true;
        novoUsuario.statusUsuario = true;
        const listaDeUsario = novoUsuario.listarUsuarios();
        expect(listaDeUsario).toEqual(dataBase);

    });

    it("Testa se o usuario consegue listar outros usuarios pelo email especifico!",()=>{
        novoUsuario.logado = true;
        novoUsuario.statusUsuario = true;
        const listarUnicoUsuarioPorEmail = novoUsuario.listarUsuarios();
    })

});


// it("Testa se a senha é valida",()=>{
// })


//Cadastrar novo usuario sem realizar o login
//Cadastrar novo usuario com email existem
//Cadastrar novo usuario com senha invalida
//Cadastrar novo usuario com senha email invalido 
//Cadastrar novo usuario com senha senha e email invalidos
//Cadastrar novo usario com status inativo
//Cadastrar novo usario sem premisão