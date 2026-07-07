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

const quantidade = parseInt(document.getElementById("quantidade").value) || 1;


pedidos.push({

    nome: campos[0].value,

    preco: precos[campos[0].value],

    quantidade: quantidade,


    arroz: campos[1].value,

    proteina1: campos[2].value,

    proteina2: campos[3].value,

    acompanhamento: campos[4].value,

    salada: campos[5].value,


    observacao: observacao,


    // INGREDIENTES PARA O ESTOQUE
    ingredientes: [

        campos[1].value,      // arroz

        campos[2].value,      // proteína 1

        campos[3].value,      // proteína 2

        campos[4].value,      // acompanhamento

        campos[5].value,      // salada

        "Embalagem"

    ]

});


localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidos)
);




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

// Limpa os dados temporários
localStorage.removeItem("pedido");
localStorage.removeItem("tamanhoMarmita");

// Limpa o carrinho automaticamente
localStorage.removeItem("pedidos");
localStorage.removeItem("pedidoPendente");

alert("Pedido enviado com sucesso!");
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

        pedidos.forEach(function(item, index){
            subtotal += item.preco * (item.quantidade || 1);

           tabela.innerHTML += `
<tr>
    <td>${item.nome}</td>

    <td>
        <button class="btn-quantidade" onclick="diminuir(${index})">−</button>

        ${item.quantidade || 1}

        <button class="btn-quantidade" onclick="aumentar(${index})">+</button>
    </td>

    <td>
        R$ ${(item.preco * (item.quantidade || 1)).toFixed(2)}
    </td>
</tr>
`;

        });
window.finalizarPedido = function(){

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if(pedidos.length === 0){
        alert("Seu carrinho está vazio.");
        return;
    }


    localStorage.setItem(
        "pedidoPendente",
        JSON.stringify({
            itens: pedidos,
            status:"Aguardando cadastro",
            data:new Date().toLocaleString()
        })
    );


    window.location.href="cadastro.html";

};


// Esvaziar carrinho manualmente
window.esvaziarCarrinho = function(){

    if(confirm("Deseja realmente esvaziar o carrinho?")){

        localStorage.removeItem("pedidos");

        alert("Carrinho esvaziado!");

        location.reload();

    }

};
        document.getElementById("subtotal").innerHTML =
            "R$ " + subtotal.toFixed(2);

        document.getElementById("entrega").innerHTML =
            "R$ " + taxaEntrega.toFixed(2);
document.getElementById("total").innerHTML =
    "R$ " + (subtotal + taxaEntrega).toFixed(2);

}

window.aumentar = function(index){

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos[index].quantidade = (pedidos[index].quantidade || 1) + 1;

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    location.reload();

};


window.diminuir = function(index){

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if((pedidos[index].quantidade || 1) > 1){

        pedidos[index].quantidade--;

    } else {

        pedidos.splice(index,1);

    }

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    location.reload();

};
function escolherMarmita(nome) {
    localStorage.setItem("marmitaEscolhida", nome);

    window.location.href = "montar.html";
}

});