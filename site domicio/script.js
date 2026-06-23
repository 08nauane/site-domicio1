document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // ESCOLHER TAMANHO DA MARMITA
    // ============================

    window.escolherMarmita = function(tamanho) {
        localStorage.setItem("tamanhoMarmita", tamanho);
        window.location.href = "montar.html";
    };

    // ============================
    // PEGAR TAMANHO ESCOLHIDO
    // ============================

    var selects = document.querySelectorAll("select");
    if (selects.length > 0) {
        var tamanho =
            localStorage.getItem("tamanhoMarmita");
        if (tamanho) {
            selects[0].value = tamanho;
        }
    }

    // ============================
    // FINALIZAR PEDIDO
    // ============================

    var formulario = document.querySelector("form");
    if (formulario && document.title === "Monte Sua Marmita") {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            var campos =
                document.querySelectorAll("select");
            var observacao =
                document.querySelector("textarea").value;
            var mensagem =
                "MARMITARIA SABOR CASEIRO\n\n" +
                "Tamanho: " +
                campos[0].value +
                "\n\n" +
                "Arroz: " +
                campos[1].value +
                "\n\n" +
                "Proteina 1: " +
                campos[2].value +
                "\n\n" +
                "Proteina 2: " +
                campos[3].value +
                "\n\n" +
                "Acompanhamento: " +
                campos[4].value +
                "\n\n" +
                "Salada: " +
                campos[5].value +
                "\n\n" +
                "Observacoes: " +
                observacao;
            var telefone =
                "(45) 99839-1497";
            var link =
                "https://wa.me/" +
                telefone +
                "?text=" +
                encodeURIComponent(mensagem);

           // Salva o pedido temporariamente
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


// Vai para cadastro
window.location.href = "cadastro.html";
        });
    }

    // ============================
    // CADASTRO
    // ============================
    if (formulario && document.title === "Cadastro") {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            var inputs =
                document.querySelectorAll("input");
            if(inputs[4].value !== inputs[5].value) {
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
            alert(
                "Cadastro realizado com sucesso!"
            );
           // Recupera os dados do pedido
let pedido =
JSON.parse(localStorage.getItem("pedido"));


// Cria mensagem
let mensagem =
"MARMITARIA SABOR CASEIRO\n\n" +

"Cliente: " + cliente.nome +
"\nTelefone: " + cliente.telefone +
"\nEndereco: " + cliente.endereco +

"\n\nPedido:\n" +

"Tamanho: " + pedido.tamanho +
"\nArroz: " + pedido.arroz +
"\nProteina 1: " + pedido.proteina1 +
"\nProteina 2: " + pedido.proteina2 +
"\nAcompanhamento: " + pedido.acompanhamento +
"\nSalada: " + pedido.salada +
"\nObservacao: " + pedido.observacao;


// Seu WhatsApp
let telefone =
"5545998391497";


let link =
"https://wa.me/" +
telefone +
"?text=" +
encodeURIComponent(mensagem);


// Abre WhatsApp
window.open(link, "_blank");
        });
    }
});