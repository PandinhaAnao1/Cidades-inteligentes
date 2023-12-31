const {Usuario, dataBase} = require('./desafio.js'); 

//fazer a rota de cadastra com email errado e senha
describe("Metodos publicos da classe usuario.",()=>{
    
    novoUsuario = new Usuario('Guilherme krause','GuilhermeKrause@gmail.com','Altenirgomes1.',[true,true,true,true]);
    segundoNovoUsuario = new Usuario('Adilson junior portilho Barbosa','adisonPortilhoBarbosa@gmail.com','OaltenirEmuitoGostoso4#');

    it("Teste para criar um novo usario esperado objeto",()=>{
        expect(novoUsuario).toBeInstanceOf(Usuario);
        expect(dataBase).toContain(novoUsuario);
    });

    describe("Testes da função fazer login",()=>{
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
    });
    
    describe("Teste da função listar usuarios",()=>{
        it("Testa se o usuario consegue listar todos usuarios",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const listaDeUsario = novoUsuario.listarUsuarios();
            expect(listaDeUsario).toEqual(dataBase);

        });

        it("Testa se o usuario consegue listar outros usuarios pelo email especifico!",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const listarUnicoUsuarioPorEmail = novoUsuario.listarUsuarios('adisonPortilhoBarbosa@gmail.com');
            expect(listarUnicoUsuarioPorEmail).toEqual(segundoNovoUsuario);

        });

        it("Testa se o usuario lista outro pelo email errado esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const usuarioComEmailErrado = novoUsuario.listarUsuarios("EmaiErrado@gmail.com");
            const resutado = { Mensage: 'Voce inseriu um email errado por favor tente com outro.' };
            expect(usuarioComEmailErrado).toEqual(resutado); 
        });

        it("Testa se o usuario consegue listar sem estar logado esperado mensage de erro.",()=>{
            novoUsuario.logado = false;
            novoUsuario.statusUsuario = true;

            const listarUsuariSemEstarLogado = novoUsuario.listarUsuarios();
            const resutado =  { 
                Mensage: 'Desculpe não foi possivel buscar usuarios verifique seu status e login.',
                loginAutenticado: false,
                statusUsuario: true
            };
            expect(listarUsuariSemEstarLogado).toEqual(resutado);
        });
        
        it("Testa se o usuario consegue listar sem ser ativo esperado mensage de erro.",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = false;

            const listarUsuariSemEstarAtivo = novoUsuario.listarUsuarios();
            const resutado =  { 
                Mensage: 'Desculpe não foi possivel buscar usuarios verifique seu status e login.',
                loginAutenticado: true,
                statusUsuario: false
            };
            expect(listarUsuariSemEstarAtivo).toEqual(resutado);
        });
    })

});

describe("Validação de Funções de Email e Senha da classe usuario.",()=>{

    describe("Testes para vaidar senha do usuario atende os criterios",()=>{
        it("Teste para verificar se o usario inseriu uma senha valida senha valida esperado true",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaValida = novoUsuario.verificaSenha("SenhaValidaComNumeroEespecias10@@");
            expect(senhaValida).toEqual(true);
        });
        it("Teste para verificar se a senha inserida é invalida sem numeros eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaInvalidaSemNumeros = novoUsuario.verificaSenha("senhaSemNumeros?");
            expect(senhaInvalidaSemNumeros).toEqual(false);
        });
        it("Teste para verificar se a senha inserida é invalida sem letras maiusculas eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaInvalidaSemMaiusculas = novoUsuario.verificaSenha("senhasemletrasmaiusculas1?");
            expect(senhaInvalidaSemMaiusculas).toEqual(false);
        });
        it("Teste para verificar se a senha inserida é invalida sem letras minusculas eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaInvalidaSemMinusculas = novoUsuario.verificaSenha("SENHASEMLETRASMINUSCULAS1?");
            expect(senhaInvalidaSemMinusculas).toEqual(false);
        });
        it("Teste para verificar se a senha inserida é invalida sem caracteres especias eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaInvalidaSemEspecias = novoUsuario.verificaSenha("senhasemEspeciais1");
            expect(senhaInvalidaSemEspecias).toEqual(false);
        });
        it("Teste para verificar se a senha inserida é invalida menor que 8 caracteres eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const senhaInvalidaPequena = novoUsuario.verificaSenha("s1Nh@");
            expect(senhaInvalidaPequena).toEqual(false);
        });
        

    });

    describe("Testes para verificar a autencidade do emai conforme um regex",()=>{
        it("Teste para verificar se email é valido deacordo com um regex esperado true",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emailValido =  novoUsuario.validaEmailRegex("emialValido@hotmail.com");
            expect(emailValido).toEqual(true);
        });

        it("Teste email ivalido sem arroba esperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emaiSemaArroba = novoUsuario.validaEmailRegex("emailsemarrobaProton.me");
            expect(emaiSemaArroba).toEqual(false);
        });

        it("Teste email invalido sem ponto esperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emailSemPontoCom = novoUsuario.validaEmailRegex("emaiSemOpontocom@gmaicom");
            expect(emailSemPontoCom).toEqual(false);
        });

    });

    describe("Testes para verificar se um emai é unico na database",()=>{

        it("Teste para verificar se um email é unico na base de dados",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emailUnico = novoUsuario.validarEmailUnico("altenirgomesmodesto@gmail.com");
            expect(emailUnico).toEqual(true);
        })
        it("Teste para verificar se o email é repetido na base de dados eperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const novoUsuarioParaOemail = new Usuario('Maria','maria@yahoo.com','Senha456@Fort!',[true, false, false, false]);
            const buscandoPorEmailRepitido = novoUsuario.validarEmailUnico('maria@yahoo.com');
            expect(buscandoPorEmailRepitido).toEqual(false);  
        });
    });

    describe("Teste para verifcar se o usario inseriu um email valido e unico",()=>{

        it("Teste para verificar se o email unico e valido esperado true",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emailUnicoEvalido = novoUsuario.validaEmail("pedro@hotmail.com");
            expect(emailUnicoEvalido).toEqual(true);
        });
        it("Teste para verificar se o email unico e não valido esperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const emailUnicoEvalido = novoUsuario.validaEmail("pedrohotmail.com");
            expect(emailUnicoEvalido).toEqual(false);
        });
        it("Teste para verificar se o email valido e nao unico esperado false",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const novoUsarioDoEmailUnico = new Usuario('Julia','julia@hotmail.com','SenhaMuitoForte1__',[true, false, true, true])  
            const emailUnicoEvalido = novoUsuario.validaEmail('julia@hotmail.com');
            expect(emailUnicoEvalido).toEqual(false);
        });

    })

});

describe("Validação de ativação e desativação de usario.",()=>{

    describe("Testes de ativação de usuarios.",()=>{
        it("Teste verifica se a ativação correu corretamente esperado mensage de sucesso.",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const novoUsuarioDesativo = new Usuario("Carlos","carlos@yahoo.com","Senha654Boa??",[false, true, false, false])
            novoUsuarioDesativo.statusUsuario = false;
            const usuarioAtivado = novoUsuario.ativarUsuarios("carlos@yahoo.com");
            const resutado = {
                Mensage: `O usuario ${novoUsuarioDesativo.nome} foi ativado com sucesso!`,
                usuarioHabilitado: true
            };
            expect(usuarioAtivado).toEqual(resutado);
            expect(novoUsuarioDesativo.statusUsuario).toEqual(true);

        });
        it("Teste se o usuario pode realiza auto ativação esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const reealizarAutoAtivacao = novoUsuario.ativarUsuarios('GuilhermeKrause@gmail.com')
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:false
            };
            expect(reealizarAutoAtivacao).toEqual(resultado);
        });
        it("Teste que verifica se o usuario realizou login para usar a função esperado mensagem de erro",()=>{
            novoUsuario.logado = false;
            novoUsuario.statusUsuario = true;
            const usuarioParaDesativa = new Usuario("Lucas","lucas@gmail.com","Senha456Ford%%",[false, true, true, false]);
            usuarioParaDesativa.statusUsuario = false;
            const realizarAtivacao = novoUsuario.ativarUsuarios("lucas@gmail.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: false,
                statusUsuario: true,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(false);
        });
        it("Teste que verifica se um usuario esta ativo para realizara a ativação eperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = false;
            const usuarioParaDesativa = new Usuario("Fernanda","fernanda@yahoo.com","Seasijuijfa3838??~´",[true, false, false, true]);
            usuarioParaDesativa.statusUsuario = false;
            const realizarAtivacao = novoUsuario.ativarUsuarios("fernanda@yahoo.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: true,
                statusUsuario: false,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(false);
        });
        it("Teste se o usuario não tema permissão para realizar ativação esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[2] = false
            const usuarioParaDesativa = new Usuario("Ricardo","ricardo@hotmail.com","ALALALALksmw4::",[true, false, false, true]);
            usuarioParaDesativa.statusUsuario = false;
            const realizarAtivacao = novoUsuario.ativarUsuarios("ricardo@hotmail.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: true,
                permissao:false,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(false);
        })
        it("Teste que verifica se um email informado para ativação email esta errado esperado mensage de erro.",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[2] = true;
            const usuarioParaDesativa = new Usuario("Patricia","patricia@gmail.com","senhaBao1.2::",[false, true, false, false]);
            usuarioParaDesativa.statusUsuario = false;
            const realizarAtivacao = novoUsuario.ativarUsuarios("emailErrado@.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar ativar um usuario verifique os dados!',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: false,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(false);
        });
    });
    describe("Testes que verificão a funcão de desativação de usuarios.",()=>{
        it("Teste verifica se a desativação correu corretamente esperado mensage de sucesso.",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const novoUsuarioAtivado = new Usuario("Gustavo","gustavo@yahoo.com","GUUUUU..103s",[true, true, true, false]);
            const usuarioDesativado = novoUsuario.desativarUsuarios("gustavo@yahoo.com");
            const resutado = {
                Mensage: `O usuario ${novoUsuarioAtivado.nome} foi desativado com sucesso!`,
                usuarioHabilitado: false
            };
            expect(usuarioDesativado).toEqual(resutado);
            expect(novoUsuarioAtivado.statusUsuario).toEqual(false);

        });
        it("Teste se o usuario pode realiza auto desativação esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            const reealizarAutoDesativacao = novoUsuario.desativarUsuarios('GuilhermeKrause@gmail.com')
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:false
            };
            expect(reealizarAutoDesativacao).toEqual(resultado);
            expect(novoUsuario.statusUsuario).toEqual(true);
        });
        it("Teste que verifica se o usuario realizou login para usar a função destivar usarios esperado mensagem de erro",()=>{
            novoUsuario.logado = false;
            novoUsuario.statusUsuario = true;
            const usuarioParaDesativa = new Usuario("Camila","camila@gmail.com","katatiMVA3.",[true, false, true, false]);
            const realizarDesaativacao = novoUsuario.desativarUsuarios("camila@gmail.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: false,
                statusUsuario: true,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarDesaativacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(true);
        });
        it("Teste que verifica se um usuario esta ativo para realizara a desativação eperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = false;
            const usuarioParaDesativa = new Usuario("Eduardo","eduardo@yahoo.com","SenhaLImap2r._",[false, true, false, true]);
            const realizarDesaativacao = novoUsuario.desativarUsuarios("eduardo@yahoo.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: true,
                statusUsuario: false,
                emailValido: true,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarDesaativacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(true);
        });
        it("Teste se o usuario não tema permissão para realizar desativação esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[2] = false
            const usuarioParaDesativa = new Usuario("Amanda","amanda@hotmail.com","amanDInha12.::",[true, false, false, false]);
            const realizarAtivacao = novoUsuario.desativarUsuarios("amanda@hotmail.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: true,
                permissao:false,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(true);
        })
        it("Teste que verifica se um email informado para desativação email esta errado esperado mensage de erro.",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[2] = true;
            const usuarioParaDesativa = new Usuario("Isabel","isabel@yahoo.com","nomeEsta12::",[false, false, true, true]);
            const realizarAtivacao = novoUsuario.desativarUsuarios("emailErrado@.com")
            const resultado = {
                Mensage: 'Ocorreu um erro ao tentar desativar um usuario',
                loginAutenticado: true,
                statusUsuario: true,
                emailValido: false,
                permissao:true,
                emailDeOutroUser:true
            };
            expect(realizarAtivacao).toEqual(resultado);
            expect(usuarioParaDesativa.statusUsuario).toEqual(true);
        });

    })
});

describe("Cadastrar classe usuario.",()=>{
    describe("Testes que verificão a função de cadastrar novos usarios.",()=>{
        it("Teste que verifica se o cadastrastro foi realizado com sucesso",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[0] = true
            const novoCadastroDeUsuario = novoUsuario.cadastrarNovoUsuario("Luiz","luiz@gmail.com","Senha123Açr232!",[true, false, true, false]);
            expect(novoCadastroDeUsuario).toBeInstanceOf(Usuario);
            expect(dataBase).toContain(novoCadastroDeUsuario);
        })
        it("Teste que verifica se o usuario realizou login para cadastrar novos usarios esperado mensage de erro",()=>{
            novoUsuario.logado = false;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[0] = true
            const novoCadastroDeUsuario = novoUsuario.cadastrarNovoUsuario("Carolina","carolina@yahoo.com","senhaquePass2..",[false, true, false, true])
            const resultado = {
                Mensage: 'Não foi possivel cadastrar verifique os dados e login para realizar o cadastro!',
                loginAutenticado: false,
                statusUsuario: true,
                permissao:true
            };
            expect(novoCadastroDeUsuario).toEqual(resultado);
         

        })
        it("Teste que verifica se um usario tem status ativo para cadastrar novo usuarios eperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = false;
            novoUsuario.permisoes[0] = true
            const novoCadastroDeUsuario = novoUsuario.cadastrarNovoUsuario("Roberto","roberto@hotmail.com","senhaqddd4..",[false, true, false, true])
            const resultado = {
                Mensage: 'Não foi possivel cadastrar verifique os dados e login para realizar o cadastro!',
                loginAutenticado: true,
                statusUsuario: false,
                permissao:true
            };
            expect(novoCadastroDeUsuario).toEqual(resultado);
        })
        it("Teste que verifica se o usario tem permisão para realizar o cadastro de novos usuario esperado mensage de erro",()=>{
            novoUsuario.logado = true;
            novoUsuario.statusUsuario = true;
            novoUsuario.permisoes[0] = false
            const novoCadastroDeUsuario = novoUsuario.cadastrarNovoUsuario("Larissa","larissa@gmail.com","funciona3093^..",[true, true, true, false])
            const resultado = {
                Mensage: 'Não foi possivel cadastrar verifique os dados e login para realizar o cadastro!',
                loginAutenticado: true,
                statusUsuario: true,
                permissao:false
            };
            expect(novoCadastroDeUsuario).toEqual(resultado);
        })
    })





})
