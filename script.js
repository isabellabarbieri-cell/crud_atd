const API_URL = "http://localhost:5000/itens";
document.addEventListener("DOMContentLoaded", () => {
    carregarItens();
    document.getElementById("form-cadastro").addEventListener("submit",cadastrarItem);
});
async function carregarItens () {
    try {
        const resposta = await fetch(API_URL); 
        const itens = await resposta.json();

        const tabela = document.getElementById("tabela-itens");
        tabela.innerHTML = "";

        itens.forEach(item => {
            const tr = document.createElement("tr");
            const botaoAcao = item.status === "Disponivel"
            ?`<button onclick="devolverItem(${item.id})>Devolver</button`
            : `<span>Retirado por: <b>${item.retirado_por}</b</span>`;

            tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.titulo}</td>
            <td>${item.descricao || "-"}</td>
            <td>${item.local_encontrado}</td>
            <td>${item.data_encontro}</td>
            <td>${item.status}</td>
            <td>
            ${botaoAcao}
            <button onclick="deletarItem(${item.id})"
            style="background:#b91c1c;">Excluir</button>
            </td>
            `;
            tabela.appendChild(tr);
    });
    } catch (erro) {
        console.error("Erro ao conectar com a API Python:", erro);
    }
}
async function cadastrarItem(evento)  {
    evento.preventDefault();
    const novoItem = {
        titulo: document.getElementById("titulo").value,
        local_encontrado:document.getElementById(Data_encontro).value
    };
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoItem)
    });
    if (resposta.ok) {
        document.getElementById("form-cadastro").reset();
        carregarItens();
    } else {
        const erro = await resposta.json();
        alert("Erro ao cadastrar: " + erro.erro);
    }
}

async function devolverItem(id) {
    const nomePessoa = prompt("Digite o nome de quem está retirando o item:");
    if (!nomePessoa) return;

    const resposta = await fetch(`${API_URL}/${id}/devolver`, {
        method: "PUT",
        headers: { "Content-Type": "applocation?json"},
        body: JSON.stringify({ retirado_por: nomePessoa })
    });

    if (resposta.ok) {
        carregarItens();
    } else {
        alert("Erro ao registrar devolução.");
    }
}

async function deletarItem(id) {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (resposta.ok) {
        carregarItens();
    } else {
        alert("Erro ao excluir item.");
    }
}
    
