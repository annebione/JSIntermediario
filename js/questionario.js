/**
 * Objeto com os dados informados pelo usuário.
 */
var dados = {
    nome_completo:"",
    apelido:"",
    tratamento:"",
    sexo:"",
    data_nascimento:"",
    idade:"",
    email:"",
    acao:"nome_completo"
};

/**
 * Objeto com o nome dos campos.
 */
var nomeCampo = {
    nome_completo:{
        nome:"Nome",
        proximo:"apelido",
        anterior:""
    },
    apelido:{
        nome:"Apelido",
        proximo:"sexo",
        anterior:"nome_completo"
    },
    sexo:{
        nome:"Sexo",
        proximo:"tratamento",
        anterior:"apelido"
    },
    tratamento:{
        nome:"Tratamento",
        proximo:"data_nascimento",
        anterior:"sexo"
    },
    data_nascimento:{
        nome:"Data de Nascimento",
        proximo:"idade",
        anterior:"tratamento"
    },
    idade:{
        nome:"Idade",
        proximo:"email",
        anterior:"data_nascimento"
    },
    email:{
        nome:"E-mail",
        proximo:"fim",
        anterior:"idade"
    },
    fim:{
        nome:"Fim",
        proximo:"",
        anterior:"email"
    }
};

/**
 * Objeto com os dados de tratamento de acordo com o sexo.
 */
var tratamento = {
    Masculino:{
        a:{
            abr:"Sr",
            desc:"Senhor"
        },
        b:{
            abr:"Você",
            desc:"Você"
        },
        c:{
            abr:"Dr",
            desc:"Doutor"
        },
        d:{
            abr:"Seu",
            desc:"Seu"
        }
    },
    Feminino:{
        a:{
            abr:"Sra",
            desc:"Senhora"
        },
        b:{
            abr:"Você",
            desc:"Você"
        },
        c:{
            abr:"Dra",
            desc:"Doutora"
        },
        d:{
            abr:"Dona",
            desc:"Dona"
        },
        e:{
            abr:"Srta",
            desc:"Senhorita"
        }
    }
};

/*
 * Função responsável por finalizar o questionário. Ela abre uma nova janela com as informações 
 * inseridas pelo usuário no formulário e nesta nova janela tem a opção de imprimir ou fechar.
 */
function concluir(acao){
    // Verifica se a ação é para finalizar o formulário se for
    // ele exibe uma mensagem solicitando confirmação da finalização
    if(acao==='fim'){
        // Criar um alerta para confirmar a finalização do formulário
        var confirmacao = confirm("Você deseja finalizar o questionário?");
        // Ser a resposta for sim recarrega a página
        if(confirmacao){
            location.href='questionario.html';
        }
    }
    // A ação não for para finalizar o formulário é criado um popup
    // com os dados das questões que é exibido para o usário
    else{
        var telaFinal = "";
        telaFinal += "<table style='font-size: small; font-family: Verdana, Arial; border: 1px; width: 300px; border-style: solid;'>";
        telaFinal += "<tr>";
        telaFinal += "<td colspan='2' style='text-align:center; font-size: large; font-weight: bold;'>Questionário Final</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right; width: 40%;'>Nome:</td><td style='text-align:left;'>"+dados.nome_completo+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>Apelido:</td><td style='text-align:left;'>"+dados.apelido+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>Sexo:</td><td style='text-align:left;'>"+dados.sexo+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>Tratamento:</td><td style='text-align:left;'>"+dados.tratamento+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>Data de Nascimento:</td><td style='text-align:left;'>"+dados.data_nascimento+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>Idade:</td><td style='text-align:left;'>"+dados.idade+"</td>";
        telaFinal += "</tr>";
        telaFinal += "<tr>";
        telaFinal += "<td style='text-align:right;'>E-mail:</td><td style='text-align:left;'>"+dados.email+"</td>";
        telaFinal += "</tr>";
        telaFinal += "</table>";
        telaFinal += "<table style='text-align: center; font-size: small; font-family: Verdana, Arial; border: 1px; width: 300px; border-style: solid;'>";
        telaFinal += "<tr>";
        telaFinal += "<td><input type='button' value='Finalizar' onclick=window.close();window.opener.concluir('fim') /></td><td><input type='button' value='Cancelar' onclick='window.close();' /></td>";
        telaFinal += "</tr>";
        telaFinal += "</table>";
        // Uma nova janela é aberta
        var novaJanela = window.open('','Conclusão','width=320,height=260,status=yes,resizable=false');
        // Nesta nova janela é inserido o código criado com as informações
        // digitadas no questionário
        novaJanela.document.write(telaFinal);
        // O foco é direcionado para a nova janela
        novaJanela.focus();
    }
}

/*
 * Esta função é acionada quando clicamos no botão 'OK' das questões.
 * Ela é responsável por efetuar a validação dos campos e chamar a função
 * que verificará qual a próxima ação a tomar
 */
function ok(funcao){
    // Cria uma variável para armazenar o resultado da chamada
    // da validação para cada uma das funções executadas
    var resultado;
    // Verifica qual função deve ser chamada
    switch (funcao){
        case "nome_completo":
            resultado = validaNomeCompleto();
            break;
        case "apelido":
            resultado = validaApelido();
            break;
        case "sexo":
            resultado = validaSexo();
            break;
        case "tratamento":
            resultado = validaTratamento();
            break;
        case "data_nascimento":
            resultado = validaDataNascimento();
            break;
        case "idade":
            resultado = validaIdade();
            break;
        case "email":
            resultado = validaEmail();
            break;
    }
    // Após executar a função de acordo com o campo chama a função
    // verificaResultado() informando qual função que foi executada
    // e qual foi o resultado desta função
    verificaResultado(funcao, resultado);
}

/*
 * Função responsável por calculara a idade do usuário
 */
function calculaIdade(data) { 
    // Quebra a data em partes utilizando como referência o caractere
    // / (barra normal)
    data = data.split('/');   
    // Monta um objeto Date com as informações da data de nascimento
    var dataNascimento = new Date(data[2]+"-"+data[1]+"-"+data[0]);
    // Recupera a data atual
    var dataAtual = new Date();
    // Recupera apenas o ano atual
    var anoAtual = dataAtual.getFullYear();
    // Verifica se o usuário já fez aniverário este ano
    var aniversarioEsteAno = new Date(anoAtual, dataNascimento.getMonth(), dataNascimento.getDate());
    // A partir do ano de nascimento e do ano atual é calculada a idade
    // do usuário
    var idade = anoAtual - dataNascimento.getFullYear();
    // Se o usário ainda não fez aniversário este ano então
    // é tirado um ano da idade
    if(aniversarioEsteAno > dataAtual) {
        idade--;
    }
    // A idade é retornada
    return idade;
}


/*
 * Função responsável por verificar se o nome completo está correto
 */
function validaNomeCompleto(){
    // Cria uma expressão regular
    var nome = document.getElementById("nome_completo").value;
    // Verifica se o tamanho do campo é maior que 5
    if(nome.length > 5){
        // Se o campo for maior que 5 verifica se há correspondência
        // entre o valor do campo e a expressão regular
        if(regex = /[a-z]+\s[a-z]+/gi.exec(nome)){
            // Se houver correspondência retorna true
            return true;
        }
        else{
            // Se não houver correspondência retorna a informação do erro
            // que neste caso é a falta do sobrenome
            return "sobrenome";
        }
    }
    // Verifica se o campo está em branco
    else if( trim(nome) === ""){
        // Se o campo estiver em branco envia um retorno informando
        return "branco";
    }
    else{
        // Se nenhuma das opções acima foi atendida então o
        // único erro possível é o tamanho ser menor que o permitido.
        // Desta forma enviará um retorno informando o que o tamanho está
        // incorreto
        return "tamanho";
    }
}

/*
 * Função responsável por validar o apelido
 */
function validaApelido(){
    // Recupera os dados do nome completo
    var nome = dados.nome_completo;
    // Recupera os dados do apelido
    var apelido = document.getElementById("apelido").value;
    // Verifica se o apelido é parte do nome
    var resultado = nome.toUpperCase().search(apelido.toUpperCase());
    // Se o apelido estive em branco retorna a informação
    if(trim(apelido)===""){
        return "branco";
    }
    else{
        // Se o apelido for parte do nome dá um alerta informando
        if(resultado != -1){
            var retorno = confirm("O apelido '"+apelido+"', é identico a uma parte do seu nome, deseja continuar?");
            return retorno;
        }
        // Se não for retorna true
        else{
            return true;
        }
    }
}

/*
 * Função responsável por validar o sexo
 */
function validaSexo(){
    return true;
}

/*
 * Função responsável por validar o tratamento
 */
function validaTratamento(){
    return true;
}

/*
 * Função responsável por validar a data de nascimento
 */
function validaDataNascimento(){
    // Recupera o valor da data de nascimento
    var data=document.getElementById("data_nascimento").value;
    // Armazena o Obejto do elemento na variável
    var campo=document.getElementById("data_nascimento");
    // Cria um novo array vazio
    var ardt=new Array;
    // Cria uma expressão regular para efetuar o teste da data
    var ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    // Quebra a data em partes utilizando o caractere / como referência
    ardt=data.split("/");
    // Atribue a variável erro o valor false
    var erro=false;
    // Se a expressão regular não tiver correspondência no valor da data
    // é atribuido true a variável erro
    if ( data.search(ExpReg)===-1){
            erro = true;
            }
    // Verifica os messes que tem apenas 30 dias
    else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
            erro = true;
    // Verifica o mês de fevereiro
    else if ( ardt[1]==2) {
            // Feveriro só pode ter 29 dias se a divisão do valor do ano por 4
            // não tiver resto
            if ((ardt[0]>28)&&((ardt[2]%4)!=0))
                    erro = true;
            if ((ardt[0]>29)&&((ardt[2]%4)==0))
                    erro = true;
    }
    // Se houve um erro na data retorna o erro, deixa o foco no campo data
    // de nascimento e apaga o seu valor
    if (erro) {
            campo.focus();
            campo.value = "";
            return "formato";
    }
    // Se tudo estiver ok retorna true
    return true;
}

/*
 * Função responsável por validar a idade
 */
function validaIdade(){
    // A validação da idade é simples, ela precisa ser um valor numérico
    // para isto o valor do campo é recuperado
    var idade=document.getElementById("idade").value;
    // Se ele for um campo isNaN então não é um campo numérico
    if (isNaN(idade)) { 
          return "invalido";
    }else{ 
        return true;
    }
}

/*
 * Função responsável por validar o e-mail
 */
function validaEmail(){
    // Recupera o valor do e-mail
    var email = document.getElementById("email").value;
    // Quebra o valor do campo e-mail em partes utilizando @ como referência
    var parte1 = email.split("@");
    // Quebra o valor do campo e-mail em partes utilizando . como referência
    var parte2 = email.split(".");
    // Verifica a quantidade de caracteres do campo e-mail
    var parte3 = email.length;
    // Se o campo estiver em branco retorna um erro
    if(email === ""){
        return "branco";
    }
    // Se ao quebrar a string do campo e-mail em partes utilizando @ como
    // referência ele tiver mais ou menos que duas partes então há um erro
    else if (parte1.length !== 2){
        return "formato";
    }
    // Se ao quebrar a string do campo e-mail em partes utilizando . como
    // referência ele tiver mais que três partes ou apenas uma parte há um erro
    else if (parte2.length > 3 || parte2.length === 1){
        return "formato";
    }
    // Se o campo tiver menos que seis caracteres retorna um erro
    else if (parte3<=6){
        return "tamanho";
    }
    else{
        return true;
    }
}

/*
 * Função responsável por verificar o resultado e tomar as ações
 */
function verificaResultado(acao, valor){
    // Executa o código de acordo com o valor informado
    switch (valor){
        // Quando uma validação está correta ela retorna true, aqui
        // criamos um método para tratar e configurar os campos 
        // indiferente do campo que está sendo testado.
        case true:
            // Descobre qual é o próximo campo a ser editado pelo usuário
            // e armazena a informação no objeto dados, propriedade acao
            dados.acao = nomeCampo[acao].proximo;
            // Recupera o valor do campo atual que foi validado e o armazena
            // no objeto dados e na propriedade com o nome do campo que foi
            // testado
            dados[acao] = document.getElementById(acao).value;
            // Apagar o valor atual do campo que foi validado
            document.getElementById("dad_"+acao).innerHTML = "";
            // Insere nele o novo valor
            document.getElementById("dad_"+acao).innerHTML = dados[acao];
            // Armazena em variáveis as informação da questaão atual
            // que foi respondida para poder efetuar as configurações
            var questaoAtual = document.getElementById("questoes_"+acao);
            var rotuloAtual = document.getElementById("rot_"+acao);
            var dadosAtual = document.getElementById("dad_"+acao);
            // Oculata a questão para poder exibir a próxima questão
            questaoAtual.style.display = "none";
            // Modifica a cor do rótuldo da questão para verde informando
            // que a mesma já foi respondida
            rotuloAtual.className = "rotulo_ok";
            // Modifica a cor da resposta da questão para verde informando
            // que a mesma já foi respondida
            dadosAtual.className = "dados_ok";
            // Exibe a próxima questão
            var questaoProxima = document.getElementById("questoes_"+nomeCampo[acao].proximo);
            questaoProxima.style.display = "block";
            // Verifica se a questão não é a última
            if(nomeCampo[acao].proximo != 'fim'){
                // Se a questão não for a última armazena em variáveis as
                // informações da próxima questão para poder exibi-las
                var rotuloProxima = document.getElementById("rot_"+nomeCampo[acao].proximo);
                var dadosProxima = document.getElementById("dad_"+nomeCampo[acao].proximo);
                // Modifica a cor do rótudo da questão para amarelo
                rotuloProxima.className = "rotulo_atual";
                // Modifica a cor da resposta da questão para amarelo
                // pois a mesma é a questão atual
                dadosProxima.className = "dados_atual";
            }
            // Se o campo atual for o de Data de Nascimento então os campos
            // relacionados devem ser modificados
            if(acao === "data_nascimento"){
                // É efetuado o cálculo da idade automaticamente
                var idade = calculaIdade(dados[acao]);
                // Após preencher o campo Data de Nascimento e clicar em OK
                // se estiver tudo correto a próxima questão será sobre a
                // idade. Então os dados atuais para a próxima questão que é
                // sobre a idade Idade são apagados e a idade que foi
                // calculada é atribuída ao campo
                dadosProxima.innerHTML = "";
                dadosProxima.innerHTML = idade;
                // É inserido o valor da idade no campo Idade que deverá ser
                // preenchido
                document.getElementById('idade').value = idade;
            }
            // Caso o campo atual for o para definir o Sexo então devemos
            // chamar a função confirmaTratamento().
            else if(acao === "sexo"){
                // A função confirmaTratamento() verifica qual o sexo para
                // exibir na hora de se digitar o tipo de tratamento os campos
                // de acordo com o sexo selecionado
                confirmaTratamento();
            }
            
            // Verifica quais botões podem estar habilitados para a próxima
            // questão
            habilitaBotoes();
            
            break;
        // A seguir temos os tratamos para os erros de validação
        // Caso o problema seja o tamanho do campo
        case "tamanho":
            // Deixa o campo atual em branco
            document.getElementById("dad_"+acao).innerHTML = "";
            // E exibe uma mensagem informando que o campo não tem o tamanho
            // correto
            alert("O campo '"+nomeCampo[acao].nome+"', está com o tamanho mínimo menor que o permitido!");
            break;
        // Caso o problema seja a falta do sobrenome
        case "sobrenome":
            // Deixa o campo atual em branco
            document.getElementById("dad_"+acao).innerHTML = "";
            // E exibe uma mensagem informando que o campo está sem o sobrenome
            alert("O campo '"+nomeCampo[acao].nome+"', está faltando o sobrenome!");
            break;
        // Caso o problema seja um campo em branco
        case "branco":
            // Deixa o campo atual em branco
            document.getElementById("dad_"+acao).innerHTML = "";
            // E exibe uma mensagem informando que o campo está em branco
            alert("O campo '"+nomeCampo[acao].nome+"', não pode ficar em branco!");
            break;
        // Caso o problema seja com o formato do campo
        case "formato":
            // Deixa o campo atual em branco
            document.getElementById("dad_"+acao).innerHTML = "";
            // E exibe uma mensagem informando que o campo não tem o formato
            // correto
            alert("O campo '"+nomeCampo[acao].nome+"', está com um formato inválido!");
            break;
        // Caso seja um problema com caracteres inválidos
        case "invalido":
            // Deixa o campo atual em branco
            document.getElementById("dad_"+acao).innerHTML = "";
            // E exibe uma mensagem informando que o campo possui caracteres
            // inválidos
            alert("O campo '"+nomeCampo[acao].nome+"', possui caracteres inválidos!");
            break;
    }
}

/*
 * Como não temos um método TRIM nativo em JavaScript vamos criar uma função para isto
 */
// trim
function trim(str) {
        return str.replace(/^\s+|\s+$/g,"");
}

// left trim
function ltrim(str) {
        return str.replace(/^\s+/,"");
}

// right trim
function rtrim(str) {
        return str.replace(/\s+$/,"");
}

/*
 * Função responsável por gravar na caixa de texto a opcao escolhina no radio
 */
function insereTexto(dado, elemento){
    // Verifica qual foi a opção marcada
    switch(dado){
        case "m":
            // Atribuir ao elemento o valor de acordo com a opção selecionada
            document.getElementById(elemento).value = "Masculino";
            break;
        case "f":
            // Atribuir ao elemento o valor de acordo com a opção selecionada
            document.getElementById(elemento).value = "Feminino";
            break;
        default:
            // Atribuir ao elemento o valor de acordo com a opção selecionada
            if(elemento==='tratamento'){
                document.getElementById(elemento).value = tratamento[dados.sexo][dado].desc;
            }
    }
}

/*
 * Função responsável por verificar o sexo do usuário e incluir no formulário os tratamentos de acordo
 * com o sexo selecionado
 */
function confirmaTratamento(){
    // Se a pessoa selecionar o sexo masculino, por exemplo, ao exibir as
    // opções de tratamento não devem ser exibidas as opções sra, dra ets.
    // Criando uma variável com o texto da pergunta
    var resultado = "Tratamento:&nbsp;&nbsp;<input type='text' id='tratamento' name='tratamento' disabled /><br />";
    // Criando uma variável em branco
    var variaveis;
    // Efetuando um laço para recuperar do objeto tratamento os valores das
    // propriedades de acordo com o sexo selecionado
    for(p in tratamento[dados.sexo]){
        variaveis = "'"+p+"','tratamento'";
        resultado += "<input type='radio' id='trat_"+p+"' name='rad_tratamento' value='rad_tratamento' onclick=insereTexto("+variaveis+") /><label for='"+p+"'>"+tratamento[dados.sexo][p].desc+"</label><br />";
    }
    resultado += "<input type='button' id='ok' name='ok' value='OK' onclick='ok(\"tratamento\")'/>";
    // Inserindo no documento o código HTML criado com as informações de
    // tratamento de acordo com o sexo escolhido
    document.getElementById("questoes_tratamento").innerHTML = resultado;
}

/*
 * Função responsável por fazer a navegação entre as perguntas
 */
function navegacao(acaoNavegacao){
    // Armazena na variável acao o valor da propriedade acao do objeto dados
    var acao = dados.acao;
    
    // Consulta qual a questão aual e armazena os dados dos elementos
    // envolvidos em variáveis
    var atual = document.getElementById("questoes_"+acao);
    var rotuloAtual = document.getElementById("rot_"+acao);
    var dadosAtual = document.getElementById("dad_"+acao);
    
    // Oculta a questão atual
    atual.style.display = "none";
    
    // Armazena em variáveis os dados dos elementos que devem ser modificados,
    // quando o botão 'Anterior' é acionado são os elementos da questão
    // anterior que são armazenados quando o botão próximo é acionado
    // são os elementos da próxima questão que são acionados
    var questaoModificar = document.getElementById("questoes_"+nomeCampo[acao][acaoNavegacao]);
    var rotuloModificar = document.getElementById("rot_"+nomeCampo[acao][acaoNavegacao]);
    var dadosModificar = document.getElementById("dad_"+nomeCampo[acao][acaoNavegacao]);
    
    // Modifica a visibilidade e as cores da próximo ou da questão anterior
    questaoModificar.style.display = "block";
    rotuloModificar.className = "rotulo_atual";
    dadosModificar.className = "dados_atual";
    
    // Verifica se não é a última questão
    if(acao != 'fim'){
        // Se não for modifica os dados do rótulo atual. Se os dados não  
        // foram preenchidos ele os modifica para a cor vermelha
        if(dados[acao] === ""){
            rotuloAtual.className = "rotulo_faltando";
            dadosAtual.className = "dados_faltando";
        }
        else{
            // Se os dados já foram preenchidos ele os modifica para a cor verde
            rotuloAtual.className = "rotulo_ok";
            dadosAtual.className = "dados_ok";
        }
    }
    
    // Grava na propriedade acao do objeto dados o valor da ação atual
    // após avançar ou retroceder uma questão
    dados.acao = nomeCampo[acao][acaoNavegacao];
    
    // Verifica quais botões podem ou não ser exibidos
    habilitaBotoes();
}

/*
 * Função responsável por habilitar e desabilitar os botões de navegação
 */
function habilitaBotoes(){
    // Verifica qual é o campo que está sendo editado
    var acao = dados.acao;
    
    // Desabilita todos os botões, menos o botão imprimir por segurança
    document.getElementById("anterior").disabled = false;
    document.getElementById("limpar").disabled = false;
    document.getElementById("proximo").disabled = false;
    document.getElementById("concluir").disabled = false;
    
    // Se não existir ação anterior então o botão 'Anterior' deve ser
    // desabilitado
    if(nomeCampo[acao].anterior === ''){
            document.getElementById("anterior").disabled = true;
    }
    // Se for a última ação então o botão 'Próximo' deve ser desabilitado
    else if(nomeCampo[acao].proximo === '' || dados[nomeCampo[acao].proximo] === '' || nomeCampo[acao].proximo === 'fim'){
            document.getElementById("proximo").disabled = true;
    }
    
    // Se o valor do campo e-mail não estiver em branco então o botão
    // 'Concluir' pode ser habilitado
    if(dados.email == ''){
        document.getElementById("concluir").disabled = true;
    }
}

/*
 * Função responsável por limpar a Janela
 */
function limpar(acaoLimpar, questao){
    // Se a ação for para limpar o questionário
    if(acaoLimpar === 'questionario'){
        // Verifica se o usuário quer realmente limpar o questionário
        var resposta = confirm("Você tem certeza que deseja cancelar preenchimento do formulário?");
        // Se sim a tela é recarregada
        if(resposta){
            location.href='questionario.html';
        }
    }
}

/*
 * Não permite que caracteres que não sejam dígitos sejam digitados no campo
 * idade
 */
function verificaIdade(){
    // Recupera o valor do campo idade
    var idade=document.getElementById("idade").value;
    // Verifica atraves de tratamento de evento qual tecla foi pressionada
    var tecla = event.keyCode;
    // Se o campo idade for isNaN ou o código da tecla pressionada não for
    // de um número então exibe o erro
    if (isNaN(idade) || tecla < 48 || tecla > 57){ 
        alert("Somente números são permitidos");
        event.returnValue = false; 
    }
}

/*
 * Função responsável por inserir o e-mail na caixa de texto
 */
function insereEmail(){
    // Recupera o valor do e-mail que foi digitado
    var email = document.getElementById("email").value;
    // Abra uma caixa de diálogo solicitando que o e-mail seja digitado
    var resposta = prompt("Digite o seu e-mail abaixo:");
    // Insere no campo e-mail do formulário o valor digitado na caixa de diálogo
    document.getElementById("email").value = resposta;
}
