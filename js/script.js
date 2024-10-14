const formUmbtn = document.getElementById("form-1-title");
const formDoisbtn = document.getElementById("form-2-title");

const form1 = document.getElementById("form-1");
const form2 = document.getElementById("form-2");

formUmbtn.addEventListener('click',function (){
  form1.style.display="block";
  form2.style.display="none";
  formUmbtn.classList.add('active-tab');
  formDoisbtn.classList.remove('active-tab');
});

formDoisbtn.addEventListener('click',function (){
  form2.style.display="block";
  form1.style.display="none";
  formDoisbtn.classList.add('active-tab');
  formUmbtn.classList.remove('active-tab');
});


  function enviarFormularios() {
    event.preventDefault();
    const form1Data = document.getElementById("form-1");
    const form2Data = document.getElementById("form-2");

    // Extrair dados do formulário 1 (dados pessoais)
    const nome = form1.elements['nome'].value;
    const genero = form1.elements['genero'].value;
    const cpf = form1.elements['cpf'].value;
    const tipoTelefone = form1.elements['tipoTelefone'].value;
    const telefone = form1.elements['telefone'].value;
    const email = form1.elements['email'].value;
    const senha = form1.elements['senha'].value;
    const dataNascimento = form1.elements['dataNascimento'].value;

    // Extrair dados do formulário 2 (endereços)
    const numero = form2.elements['numero'].value;
    const tipoResidencia = form2.elements['tipoResidencia'].value;

    //verificando tipo endereço
    const checkboxes = form2.elements['tipoEndereco'];
    let tipoEndereco = '';
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        tipoEndereco = checkboxes[i].value;
        break; // Pega apenas o primeiro checkbox marcado
      }
    }

    const observacoes = form2.elements['complemento'].value;
    const cep = form2.elements['cep'].value;
    const logradouroCompleto = form2.elements['logradouro'].value;
    const tpLogradouro = logradouroCompleto.split(' ')[0]; // Pega a primeira palavra como tipo de logradouro
    const logradouro = logradouroCompleto.split(' ').slice(1).join(' '); // O resto da string é o nome do logradouro
    const bairro = form2.elements['bairro'].value;
    const cidade = form2.elements['cidade'].value;
    const uf = form2.elements['estado'].value;
    const pais = form2.elements['pais'].value;

    // Criar o objeto no formato JSON desejado
    const jsonData = {
      ranking: 1,
      nome: nome,
      genero: genero,
      cpf: cpf,
      tipoTelefone: tipoTelefone,
      telefone: telefone,
      email: email,
      senha: senha,
      dataNascimento: dataNascimento,
      enderecos: [
        {
          numero: numero,
          tipoResidencia: tipoResidencia,
          tipoEndereco: tipoEndereco,
          observacoes: observacoes,
          endereco: {
            cep: cep,
            logradouro: {
              tpLogradouro: {
                tpLogradouro: tpLogradouro
              },
              logradouro: logradouro
            },
            bairro: {
              bairro: bairro,
              cidade: {
                cidade: cidade,
                uf: {
                  uf: uf,
                  pais: {
                    pais: pais
                  }
                }
              }
            }
          }
        }
      ]
    };

    // Visualiza o JSON no console (para testar)
    console.log("JSON gerado:", JSON.stringify(jsonData, null, 2));

    // Enviar o JSON via fetch
    fetch('sua_url_de_envio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}

