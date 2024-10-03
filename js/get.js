const url = "http://localhost:8080/task/user/1"; 

function hideLoader(){
    document.getElementById("loading").style.display = "none";
}

function show(tasks){
    let tab = `<thead>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Username</th>
                <th scope="col">User ID</th>
               </thead> 
                `;

    for(let task of tasks){ //pegando uma task da lista de tasks
        tab += `
            <tr>
                <td scope="row">${task.id}</td
                <td scope="row">${task.description}</td
                <td scope="row">${task.user.username}</td
                <td scope="row">${task.user.id}</td
            </tr>
        `;
    }

    document.getElementById("tasks").innerHTML = tab; //adicionando o código na div
    
}

async function getAPI(url){
    const response = await fetch(url, {method: "GET"}); //recebe os dados da request da url
    var data = await response.json(); //buscar os dados do response

    console.log(data);

    if(response){
        hideLoader();
        show(data);
    }
}

getAPI(url);