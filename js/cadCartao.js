// Obtém os elementos dos botões para alternar entre os formulários
const formCartaobtn = document.getElementById("form-cartao-title");
const formBandeirabtn = document.getElementById("form-bandeira-title");

// Obtém os elementos dos formulários
const form1 = document.getElementById("formCartao");
const form2 = document.getElementById("formBandeira");

// Adiciona um evento de clique no botão do Formulário 1
formCartaobtn.addEventListener('click', function () {
    console.log("Switching to Form 1"); // Exibe no console que está alternando para o Formulário 1
    form1.style.display = "block"; // Mostra o Formulário 1
    form2.style.display = "none"; // Esconde o Formulário 2
    formCartaobtn.classList.add('active-tab'); // Adiciona a classe 'active-tab' ao botão do Formulário 1
    formBandeirabtn.classList.remove('active-tab'); // Remove a classe 'active-tab' do botão do Formulário 2
});

// Adiciona um evento de clique no botão do Formulário 2
formBandeirabtn.addEventListener('click', function () {
    console.log("Switching to Form 2"); // Exibe no console que está alternando para o Formulário 2
    form2.style.display = "block"; // Mostra o Formulário 2
    form1.style.display = "none"; // Esconde o Formulário 1
    formBandeirabtn.classList.add('active-tab'); // Adiciona a classe 'active-tab' ao botão do Formulário 2
    formCartaobtn.classList.remove('active-tab'); // Remove a classe 'active-tab' do botão do Formulário 1
});

// Função para enviar os dados dos formulários
function enviarFormularioCartao() {
    console.log("Submitting Form Data..."); // Exibe no console que os dados do formulário estão sendo enviados
    event.preventDefault(); // Previne o comportamento padrão do envio do formulário
    const formCartaoData = document.getElementById("formCartao"); // Obtém o Formulário 1
    const formBandeiraData = document.getElementById("formBandeira"); // Obtém o Formulário 2

    // Verifica se os elementos dos formulários foram encontrados
    if (!formCartaoData || !formBandeiraData) {
        console.error("Error: Form elements not found"); // Exibe um erro se não encontrar os formulários
        return; // Interrompe a execução da função
    }

    // Extrai dados do formulário 1 (dados pessoais)
    const cpfCartao = formCartaoData.elements['cpfCartao']?.value;
    const nCartao = formCartaoData.elements['nCartao']?.value;
    const nomeCartao = formCartaoData.elements['nomeCartao']?.value;
    const bandeira = formCartaoData.elements['bandeira']?.value;
    const codSeguranca = formCartaoData.elements['codSeguranca']?.value;

    // Verifica se todos os campos do formulário 1 estão preenchidos
    const requiredDadosPessoaisFields = ["cpfCartao", "nCartao", "nomeCartao", "bandeira", "codSeguranca"];
    const missingDadosPessoaisFields = requiredDadosPessoaisFields.filter(field => !formCartaoData.elements[field]?.value);

    if (missingDadosPessoaisFields.length) {
        console.error("Error: Form 1 missing fields: missing dados pessoais fields:", missingDadosPessoaisFields); // Exibe um erro se algum campo estiver vazio
        return; // Interrompe a execução da função
    }

    // Exibe os dados do Formulário 1 no console
    console.log("Form Cartao Data: ", {
        cpfBusca: cpfCartao,
        nCartao: nCartao,
        nomeCartao: nomeCartao,
        bandeira: bandeira,
        codSeguranca: codSeguranca
    });

    // Criar o objeto no formato JSON desejado
    const jsonCartao = {
        //TODO: COLOCAR FORMATO JSON CRIACAO DE CARTAO
    };

    // Visualiza o JSON no console (para testar)
    console.log("JSON gerado:", JSON.stringify(jsonCartao, null, 2)); // Exibe o JSON gerado de forma formatada

    // Enviar o JSON via fetch
    fetch('sua_url_de_envio', { // TODO:Altere para a URL de envio desejada
        method: 'POST', // Define o metodo como POST
        headers: {
            'Content-Type': 'application/json' // Define o cabeçalho Content-Type como JSON
        },
        body: JSON.stringify(jsonCartao) // Converte o objeto jsonCartao em uma string JSON para enviar no corpo da requisição
    })
        .then(response => response.json()) // Processa a resposta como JSON
        .then(data => {
            console.log('Success:', data); // Exibe a resposta de sucesso no console
        })
        .catch(error => {
            console.error('Error:', error); // Exibe qualquer erro que ocorrer
        });
}