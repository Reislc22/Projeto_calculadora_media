// constante recebendo o formulario pelo ID
const form = document.getElementById ('form-atividade')
//constantes com as imagens
const imgAprovado = '<img src= "./imagens/aprovado.png" alt="emoji festejando" />';
const imgReprovado = '<img src= "./imagens/reprovado.png" alt="emoji decepcionado" />';
// array para receber as atividades e armazenar
const atividades = [];
// array para receber as notas e armazenar
const notas = [];
//criando linhas de codigo de HTML em constantes, para quando reprovar e aprovar
const spanAprovado = '<span class="resultado aprovado">aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
//constante para o usuario poder escolher a nota minima, assim não fica só uma padrão
const notaMinima = parseFloat (prompt("Digite a nota minima:"));
// essa variavel recebe os valores da linha foi criado no escopo global porque sempre que a ação submit era enviada ela retornava a nada, então fica aqui porque ela ainda vai ficar mesmo que envie, pois não reiniciara
let linhas = '';

// adicionando um evento ao enviar("submit") e o function (e) é para receber o evento
form.addEventListener('submit', function(e){
// esse codigo é para previnir a ação padrão do navegador de recarregar quando envia ("submit")
    e.preventDefault();
//quando a ação de enviar "submit" ocorrer ele puxa essa função, ae não prescisa ficar tudo aqui, fica mais organizado
    adicionaLinha();
//função que quando envia atualiza a tabela, tbm para organizar melhor
    atualizaTabela();
// função que atualiza a media final 
    atualizaMediaFinal();
});

// função para adicionar as linhas no corpo da tabela
function adicionaLinha() {
// constantes para puxar o nome e nota da atividade
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
//se a ativade existe dentro do array, não sera adicionado,assim não repetindo
    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade: ${inputNomeAtividade.value} Já foi inserida`);
    }   else {
//enviar o nome da atividade para a array de atividades
    atividades.push(inputNomeAtividade.value);
//enviar a nota da atividade para a array de notas(("parseFloat seria para transforma em numeros,float pode ser qualquer numero, tanto inteiro como quebrado "))
    notas.push(parseFloat(inputNotaAtividade.value));
// variavel (porque muda o valor) para a linha da tabela
    let linha = '<tr>';

// esse ""linha +=" é mesma coisa que uma contatenação(juntar duas ou mais strings em uma só) ao infez de linha = linha + "outro conteudo" pode simplicar dessa forma "+=" 
// td abre a coluna que recebe o nome da atividade no caso  
    linha += `<td>${inputNomeAtividade.value}</td>`;
// td abre a coluna que recebe a nota da atividade no caso
    linha += `<td>${inputNotaAtividade.value}</td>`;
// para dizer se o aluno foi aprovado ou não botando a constante notaMinima(maior ou igual a 7) "?" seria igual ao "if" e os ":" seria igual ao else(ficaria "SE a nota for maior ou igual a 7 Aprovado SE NÃO reprovado ")
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
// fechando a tag tr que seria a linha da tabela, fechando a variavel que foi criada
    linha +=  '</tr>';
// linhas recebe todos o valores da linha e armazena eles assim pode aparecer varios nomes de atividades e notas"esse variavel linhas foi criada sem nenhum valor, assim recebe todos o valor que foi criado acima na variavel "linha" "
    linhas += linha;
}


    //abaixo é para o campo onde escrever a nota e o nome da atividade ficar vazio toda vez que for enviado
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// essa função é para mecher direto no HTML e atualizar a tabela 
function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    // innerHTML seria para adicionar um conteudo dentro de uma tag HTML
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
// constante que pega e retorna o valor na função "calculaMediaFinal" 
    const mediaFinal =  calculaMediaFinal();
//pegando o id do html e juntando com o mediaFinal usando o innerHTML(toFixed é para limitar as casas decimais)
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); 
//pegando o id para informar se foi aprovado ou reprovado usando o innerHTML, e o "if" que seria "?" e "else" seria ":"
    document.getElementById('media-final-resultado').innerHTML =  mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0

    // um laço que seria (a variavel i é igual a zero, e enquanto i for menor que a nota"notas.lenght") 
        for(let i = 0; i < notas.length; i++) {
    // lembrando que += seria somaDasnotas = somaDasnotas + notas[i] (o i seria mais para apontar o indice mesmo)
            somaDasNotas += notas[i];
        }
    // para retorna  a media que seria a somaDasNotas dividido pela notas
        return  somaDasNotas / notas.length
}