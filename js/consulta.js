document.getElementById('filtroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const queryParams = new URLSearchParams();

    // Adiciona os campos preenchidos como parâmetros de URL
    for (let [key, value] of formData.entries()) {
        if (value) queryParams.append(key, value);
    }

    try {
        // Faz a requisição GET com os parâmetros na URL
        const resposta = await fetch(`http://localhost:8080/clientes/consulta?${queryParams.toString()}`); //TODO VERIFICAR LINK
        const clientes = await resposta.json();
        renderTabela(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
});

function renderTabela(clientes) {
    const tbody = document.querySelector('#table-clientes tbody');
    tbody.innerHTML = ''; // Limpa os resultados anteriores

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.email}</td>
            <td>
<!--            TODO: VERIFICIAR PARAMETROS QUEM VEM NO CLIENTE-->
                <button class="btn-endereco" data-id="${cliente.id}" data-endereco="${JSON.stringify(cliente.endereco)}">Endereço</button>
                <button class="btn-cartao" data-id="${cliente.id}" data-cartao="${JSON.stringify(cliente.cartao)}">Cartão</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Adiciona os eventos aos botões
    document.querySelectorAll('.btn-endereco').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const endereco = JSON.parse(e.target.getAttribute('data-endereco'));
            exibirModalEndereco(endereco);
        });
    });

    document.querySelectorAll('.btn-cartao').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartao = JSON.parse(e.target.getAttribute('data-cartao'));
            exibirModalCartao(cartao);
        });
    });

    function exibirModalEndereco(endereco) {
        const modalEndereco = document.getElementById('modalEndereco');
        const enderecoInfo = document.getElementById('enderecoInfo');

        // Preenche as informações do endereço no modal
        enderecoInfo.innerHTML = `
        Rua: ${endereco.tipoLogradouro} + ${endereco.logradouro}<br>
        Número: ${endereco.numero}<br>
        Bairro: ${endereco.bairro}<br>
        Cidade: ${endereco.cidade}<br>
        Estado: ${endereco.estado}
    `;

        // Exibe o modal
        modalEndereco.style.display = 'flex';
    }

    function exibirModalCartao(cartao) {
        const modalCartao = document.getElementById('modalCartao');
        const cartaoInfo = document.getElementById('cartaoInfo');

        // Preenche as informações do cartão no modal
        cartaoInfo.innerHTML = `
        Número do Cartão: ${cartao.numero}<br>
        Bandeira: ${cartao.bandeira}<br>
        Data de Vencimento: ${cartao.dataVencimento}
    `;

        // Exibe o modal
        modalCartao.style.display = 'flex';
    }

// Função para fechar o modal de Endereço
    document.getElementById('closeEndereco').addEventListener('click', () => {
        document.getElementById('modalEndereco').style.display = 'none';
    });

// Função para fechar o modal de Cartão
    document.getElementById('closeCartao').addEventListener('click', () => {
        document.getElementById('modalCartao').style.display = 'none';
    });

}
