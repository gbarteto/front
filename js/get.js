const url = "http://localhost:8080/task/user/1"; 

function hideLoader(){
    console.log("Hiding loader...");
    document.getElementById("loading").style.display = "none";
}

function show(tasks){
    console.log("Showing tasks...");
    console.log(`Tasks received: ${JSON.stringify(tasks)}`);
    let tab = `<thead>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Username</th>
                <th scope="col">User ID</th>
               </thead> 
                `;

    for(let task of tasks){ //pegando uma task da lista de tasks
        console.log(`Showing task ${task.id}`);
        console.log(`Task: ${JSON.stringify(task)}`);
        tab += `
            <tr>
                <td scope="row">${task.id}</td
                <td scope="row">${task.description}</td
                <td scope="row">${task.user.username}</td
                <td scope="row">${task.user.id}</td
            </tr>
        `;
    }

    console.log("Adding tasks to the table...");
    console.log(`Table content: ${tab}`);
    document.getElementById("tasks").innerHTML = tab; //adicionando o código na div
    
}

async function getAPI(url){
    console.log(`Making GET request to ${url}`);
    const response = await fetch(url, {method: "GET"}); //recebe os dados da request da url
    var data = await response.json(); //buscar os dados do response

    console.log(`Response: ${JSON.stringify(response)}`);
    console.log(`Data: ${JSON.stringify(data)}`);

    if(response.ok){
        hideLoader();
        show(data);
    } else {
        console.log("Error: " + response.statusText);
    }
}

getAPI(url);

