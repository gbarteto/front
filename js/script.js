const formUmbtn = document.getElementById("form-1-title");
const formDoisbtn = document.getElementById("form-2-title");
const formTresbtn = document.getElementById("form-3-title");

const form1 = document.getElementById("form-1");
const form2 = document.getElementById("form-2");
const form3 = document.getElementById("form-3");

formUmbtn.addEventListener('click',function (){
  form1.style.display="block";
  form2.style.display="none";
  form3.style.display="none";
  formUmbtn.classList.add('active-tab');
  formDoisbtn.classList.remove('active-tab');
  formTresbtn.classList.remove('active-tab');
});

formDoisbtn.addEventListener('click',function (){
  form2.style.display="block";
  form1.style.display="none";
  form3.style.display="none";
  formDoisbtn.classList.add('active-tab');
  formUmbtn.classList.remove('active-tab');
  formTresbtn.classList.remove('active-tab');
});

formTresbtn.addEventListener('click',function (){
  form3.style.display="block";
  form1.style.display="none";
  form2.style.display="none";
  formTresbtn.classList.add('active-tab');
  formDoisbtn.classList.remove('active-tab');
  formUmbtn.classList.remove('active-tab');
});

  function enviarFormularios() {
    const form1Data = document.getElementById("form-1");
    const form2Data = document.getElementById("form-2");
    const form3Data = document.getElementById("form-3");

  // Cria um objeto para juntar todos os dados
    const allData = new FormData();

  // Adiciona os dados de cada formulário ao allData
    function appendFormData(form) {
        var formData = new FormData(form);
        for (var [key, value] of formData.entries()) {
            allData.append(key, value);
        }
    }

    appendFormData(form1);
    appendFormData(form2);
    appendFormData(form3);

  // Enviar via fetch (ou AJAX)
  fetch('sua_url_de_envio', {
  method: 'POST',
  body: allData
})
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
})
  .catch(error => {
  console.error('Error:', error);
});
}

