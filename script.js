const API_URL = "http://localhost:5000/itens";
document.addEventListener("DOMContentLoaded", () => {
    carregarItens();
    document.getElementById("form-cadastro").addEventListener("submit",cadastrarItem);
});