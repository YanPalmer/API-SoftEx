const button = document.getElementById("button");
button.addEventListener("click", salvarDados);

async function salvarDados() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpf = document.getElementById("cpf").value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            cpf: cpf
        })
    })
    // console.log(response);
    // Converte a resposta em json
    const teste = await response.json();
    console.log("Minha resposta: ", teste.body);
    alert("Usuário salvo com sucesso!");
}