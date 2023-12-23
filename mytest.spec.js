const { beforeEach } = require('node:test');
const {usuario, dataBase} = require('./desafio.js') 
// const validaEmail = global.usuario.validarEmailUnico;
// const realUsuario = usuario.bind(usuario.validarEmailUnico);

// global.usuario.validarEmailUnico = realUsuario;
describe("Testes da classe usuario",()=>{

    beforeEach(()=>{
        let novoUsuario = undefined;
        dataBase = []
    })
    
    it("Teste se cria um novo usario",()=>{
        novoUsuario = new usuario('Guilherme krause','GuilhermeKrause@gmail.com','Altenirgomes1.',[true,true,true,true]);
        expect(novoUsuario).toBeInstanceOf(usuario);
        expect(dataBase).toContain(novoUsuario);
    });

    it("testa se um usuario realiza login correto",()=>{
        novoUsuario = dataBase[0]
        const loginRealizado = novoUsuario.realizarLogin('GuilhermeKrause@gmail.com','Altenirgomes1.');
        const resutado = {Mensage:'Login realizado com sucesso!'}
        expect(loginRealizado).toEqual(resutado);
    });

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