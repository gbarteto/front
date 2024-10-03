function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    document.getElementById('pais').value=("");
}

function meu_callback(respostaCep) {
    if (!("erro" in respostaCep)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value=(respostaCep.logradouro);
        document.getElementById('bairro').value=(respostaCep.bairro);
        document.getElementById('cidade').value=(respostaCep.localidade);
        document.getElementById('estado').value=(respostaCep.uf);
        document.getElementById('pais').value="Brasil";
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(cep) {

    //Nova variável "cep" somente com dígitos.
    var cepFormatado = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cepFormatado != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cepFormatado)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('estado').value="...";
            document.getElementById('pais').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cepFormatado + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

document.getElementById('cep').addEventListener('focusout',()=>{
    pesquisacep(cep.value);
})