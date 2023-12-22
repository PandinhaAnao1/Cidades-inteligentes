const usuario = require('./desafio.js')

//Auot cadastro sucesso
it("Testando se usuario realizou o seu cadastro correto esperado um objeto com os dados do usuario",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

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
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "altenirgomes1.")

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

it("Testando se usuario realizou cadasto correto esperado mensage de sucesso",()=>{
    const novoUsuario = new usuario("Guilherme", "krause@gmail.com", "Altenirgomes1.")

    const novoUsuaroLogin = novoUsuario.cadastrarNovoUsuario("krause@mail.com", "Atenirgomes1.")

    const result = {
        Mensage:'Falha ao realizar login!',
        statusUsuario: true,
        senhaValida: false,
        emailValido: false
    };

    expect(novoUsuaroLogin).toEqual(result);
});
