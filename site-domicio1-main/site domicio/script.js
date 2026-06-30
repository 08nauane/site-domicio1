document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // PREÇOS DAS MARMITAS
    // ============================

    const precos = {
        "Marmita P": 20.90,
        "Marmita M": 24.90,
        "Marmita G": 29.90
    };

    // ============================
    // ESCOLHER TAMANHO DA MARMITA
    // ============================

    window.escolherMarmita = function (tamanho) {

        localStorage.setItem("tamanhoMarmita", tamanho);

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        pedidos.push({
            nome: tamanho,
            preco: precos[tamanho]
        });

        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        window.location.href = "montar.html";
    };

    // ============================
    // PEGAR TAMANHO ESCOLHIDO
    // ============================

    var selects = document.querySelectorAll("select");

    if (selects.length > 0) {

        var tamanho = localStorage.getItem("tamanhoMarmita");

        if (tamanho) {
            selects[0].value = tamanho;
        }

    }

    // ============================
    // FINALIZAR PEDIDO
    // ============================

    var formulario = document.querySelector("form");

    if (formulario && document.title === "Monte Sua Marmita") {

        formulario.addEventListener("submit", function (e) {

            e.preventDefault();

            var campos = document.querySelectorAll("select");

            var observacao = document.querySelector("textarea").value;

            var mensagem =
                "MARMITARIA SABOR CASEIRO\n\n" +
                "Tamanho: " + campos[0].value +
                "\n\nArroz: " + campos[1].value +
                "\n\nProteína 1: " + campos[2].value +
                "\n\nProteína 2: " + campos[3].value +
                "\n\nAcompanhamento: " + campos[4].value +
                "\n\nSalada: " + campos[5].value +
                "\n\nObservações: " + observacao;

            localStorage.setItem(
                "pedido",
                JSON.stringify({
                    tamanho: campos[0].value,
                    arroz: campos[1].value,
                    proteina1: campos[2].value,
                    proteina2: campos[3].value,
                    acompanhamento: campos[4].value,
                    salada: campos[5].value,
                    observacao: observacao
                })
            );

           // Adiciona a marmita personalizada ao carrinho
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

pedidos.push({
    nome: campos[0].value,
    preco: precos[campos[0].value],
    arroz: campos[1].value,
    proteina1: campos[2].value,
    proteina2: campos[3].value,
    acompanhamento: campos[4].value,
    salada: campos[5].value,
    observacao: observacao
});

localStorage.setItem("pedidos", JSON.stringify(pedidos));

// Vai para o carrinho
window.location.href = "carrinho.html";

        });

    }

    // ============================
// BLOQUEAR ACESSO AO CADASTRO
// ============================

if (document.title === "Cadastro") {

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        alert("Finalize um pedido antes de realizar o cadastro.");
        window.location.href = "index.html";
    }

}

    // ============================
    // CADASTRO
    // ============================

    if (formulario && document.title === "Cadastro") {

        formulario.addEventListener("submit", function (e) {

            e.preventDefault();

            var inputs = document.querySelectorAll("input");

            if (inputs[4].value !== inputs[5].value) {
                alert("As senhas não conferem!");
                return;
            }

            var cliente = {
                nome: inputs[0].value,
                email: inputs[1].value,
                telefone: inputs[2].value,
                endereco: inputs[3].value
            };

            localStorage.setItem(
                "cliente",
                JSON.stringify(cliente)
            );

            alert("Cadastro realizado com sucesso!");

            let pedido = JSON.parse(localStorage.getItem("pedido"));

            let mensagem =
                "MARMITARIA SABOR CASEIRO\n\n" +

                "Cliente: " + cliente.nome +
                "\nTelefone: " + cliente.telefone +
                "\nEndereço: " + cliente.endereco +

                "\n\nPedido\n" +

                "\nTamanho: " + pedido.tamanho +
                "\nArroz: " + pedido.arroz +
                "\nProteína 1: " + pedido.proteina1 +
                "\nProteína 2: " + pedido.proteina2 +
                "\nAcompanhamento: " + pedido.acompanhamento +
                "\nSalada: " + pedido.salada +
                "\nObservação: " + pedido.observacao;

            let telefone = "5545998391497";

            let link =
                "https://wa.me/" +
                telefone +
                "?text=" +
                encodeURIComponent(mensagem);

            window.open(link, "_blank");
            localStorage.removeItem("pedidos");
            localStorage.removeItem("pedido");
            localStorage.removeItem("tamanhoMarmita");

        });

    }

    // ============================
    // PÁGINA DO CARRINHO
    // ============================

    if (document.title === "Carrinho - Marmitaria Sabor Caseiro") {

        const taxaEntrega = 8.00;

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        let tabela = document.getElementById("listaPedidos");

        let subtotal = 0;

        pedidos.forEach(function(item){

            subtotal += item.preco;

            tabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                </tr>
            `;

        });

        document.getElementById("subtotal").innerHTML =
            "R$ " + subtotal.toFixed(2);

        document.getElementById("entrega").innerHTML =
            "R$ " + taxaEntrega.toFixed(2);

        document.getElementById("total").innerHTML =
            "R$ " + (subtotal + taxaEntrega).toFixed(2);

        window.finalizarPedido = function(){
            window.esvaziarCarrinho = function () {

    if (confirm("Deseja realmente esvaziar o carrinho?")) {

        localStorage.removeItem("pedidos");

        alert("Carrinho esvaziado com sucesso!");

        location.reload();
    }

};

    if(pedidos.length === 0){
        alert("Seu carrinho está vazio.");
        return;
    }

    // Vai para o cadastro
    window.location.href = "cadastro.html";

        };

    }

});