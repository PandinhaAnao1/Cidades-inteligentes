const usuario = require('./desafio.js')                                                        /*VALIDA EMAIL*/   
//teste para email nao repetido
it("Testando se a função de validar o email unico esperado verdadeiro",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validarEmailUnico('adisonPortilho@gmail.com')
    const resultado = true;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email repetido
it("Testando se a função de validar o email unico esperado falso",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);
    console.log(guilherme)

    const emailTestado = guilherme.validarEmailUnico('krause@gmail.com')
    const resultado = false;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email regex valido
it("Testando se a função de validar regex do email esparado verdadeiro",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validaEmailRegex('krause@gmail.com')
    const resultado = true;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email regex invalido
it("Testando se a função de validar regex do email esperado false",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validaEmailRegex('krausegmail.com')
    const resultado = false;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email unico e com regex
it("Testando se a função de validar regex do email e se é unico esperado true",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validaEmail('adisonPortilho@gmail.com')
    const resultado = true;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email unico e com regex apenas regex
it("Testando se a função de validar regex do email e se é unico apenas no regex esperado false",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validaEmail('krause@gmail.com')
    const resultado = false;
    expect(emailTestado).toEqual(resultado) 
});

//teste para email unico e com regex apenas regex
it("Testando se a função de validar regex do email e se é unico apenas no unico esperado false",()=>{
    const guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true]);

    const emailTestado = guilherme.validaEmail('krausegmail.com')
    const resultado = false;
    expect(emailTestado).toEqual(resultado) 
});







                                                     /*REALIZAR AUTO CADASTRO*/
//Auot cadastro sucesso
it("Testando se usuario realizou o seu cadastro correto esperado um objeto com os dados do usuario",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.",[true])

    const result = {
            _id:novoUsuario._id,
            nome:novoUsuario.nome,
            email:novoUsuario.email,
            senha:novoUsuario.senha,
            permi:novoUsuario.permi,
            statusUsuario:novoUsuario.statusUsuario,
            dateCria:novoUsuario.dateCria,
            dateLogin:novoUsuario.dateLogin,
            logado:novoUsuario.logado
    }
    expect(novoUsuario).toEqual(result);
});

//auto cadastro email errado
it("Testando se usuario realizou o seu cadastro com email invalido esperado um mensagem de erro",()=>{
    const novoUsuario = new usuario("Guilherme", "krausegmail.com", "Altenirgomes1.")

    const result = {
        Mensage:'Seu emai ou sua senha não atendem os criterios!',
        emailValido: false,
        senhaValida: true
    }
    expect(novoUsuario).toEqual(result);
});

//auto cadastro senha errada
it("Testando se usuario realizou o seu cadastro com senha ivalida esperado um mensagem de erro",()=>{
    const novoUsuario = new usuario("Guilherme","krause@gmail.com", "altenirgomes1.")

    const result = {
        Mensage:'Seu emai ou sua senha não atendem os criterios!',
        emailValido: true,
        senhaValida: false
    }
    expect(novoUsuario).toEqual(result);
});

//auto cadastro senha e email errados
it("Testando se usuario realizou o seu cadastro com senha e email erradaos esperado um mensagem de erro",()=>{
    const novoUsuario = new usuario("Guilherme", "krausegmail.com", "altenirgomes1.")

    const result = {
        Mensage:'Seu emai ou sua senha não atendem os criterios!',
        emailValido: false,
        senhaValida: false
    }
    expect(novoUsuario).toEqual(result);
});


                                                      /*REALIZAR lOGIN*/
//login Sucesso
it("Testando se usuario realizou login esperado mensage de sucesso",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

    const novoUsuaroLogin = novoUsuario.realizarLogin("krause@gmail.com", "Altenirgomes1.")

    const result = {
        Mensage:'Login realizado com sucesso!'
    }
    expect(novoUsuaroLogin).toEqual(result);
});

//login email errado
it("Testando se usuario realizou login com o email errado esperado mensage de erro",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

    const novoUsuaroLogin = novoUsuario.realizarLogin("krausegmail.com", "Altenirgomes1.")

    const result = {
        Mensage:'Falha ao realizar login!',
        statusUsuario: true,
        senhaValida: true,
        emailValido: false
    };

    expect(novoUsuaroLogin).toEqual(result);
});

//login senha errada
it("Testando se usuario realizou login com o senha errada esperado mensage de erro",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

    const novoUsuaroLogin = novoUsuario.realizarLogin("krause@gmail.com", "Atenirgomes1.")

    const result = {
        Mensage:'Falha ao realizar login!',
        statusUsuario: true,
        senhaValida: false,
        emailValido: true
    };

    expect(novoUsuaroLogin).toEqual(result);
});

///login senha e email errados
it("Testando se usuario realizou login com o senha e email errados esperado mensage de erro",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

    const novoUsuaroLogin = novoUsuario.realizarLogin("krause@mail.com", "Atenirgomes1.")

    const result = {
        Mensage:'Falha ao realizar login!',
        statusUsuario: true,
        senhaValida: false,
        emailValido: false
    };

    expect(novoUsuaroLogin).toEqual(result);
});


                                                     /*REALIZAR CADASTRO DE NOVOS*/
//Cadastrar novos usuarios
it("Testando se usuario realizou cadasto de outro usuario correto esperado mensage de sucesso",()=>{
    const Guilherme = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.");
    Guilherme.realizarLogin("krause@gmail.com", "Altenirgomes1.");

    const novoUsuario = ["Aldison junior portilho barbosa","aldison@mail.com", "Adisonjunior0?"];
    const Adison = Guilherme.cadastrarNovoUsuario(novoUsuario);

    const result = {
        Mensage: 'O cadastro foi realizado com sucesso',
        novoUsuario: novoUsuario,
        cadastroValido: true
    };

    expect(Adison).toEqual(result);
});

//Cadastrar novo usuario sem realizar o login
//Cadastrar novo usuario com email existem
//Cadastrar novo usuario com senha invalida
//Cadastrar novo usuario com senha email invalido 
//Cadastrar novo usuario com senha senha e email invalidos
//Cadastrar novo usario com status inativo
//Cadastrar novo usario sem premisão