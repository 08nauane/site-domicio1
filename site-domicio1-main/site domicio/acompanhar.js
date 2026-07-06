// Simulação de pedidos

function buscarPedido(){

    let codigo = document.getElementById("codigo").value;
    let resultado = document.getElementById("resultado");

    let historico = JSON.parse(localStorage.getItem("historicoPedidos")) || [];

    // procura pedido pelo código
    let pedido = historico.find(p => p.codigoEntrega == codigo);

    if(!pedido){
        resultado.innerHTML = "<h3>Pedido não encontrado.</h3>";
        return;
    }

    let etapa1 = "";
    let etapa2 = "";
    let etapa3 = "";

    if(pedido.status == "Em preparação"){
        etapa1 = "ativa";
    }

    if(pedido.status == "Saiu para entrega"){
        etapa1 = "ativa";
        etapa2 = "ativa";
    }

    if(pedido.status == "Entregue"){
        etapa1 = "ativa";
        etapa2 = "ativa";
        etapa3 = "ativa";
    }

    resultado.innerHTML = `
        <h3>Olá, ${pedido.cliente.nome}</h3>

        <p class="codigo">
            Código do Pedido: ${codigo}
        </p>

        <div class="etapa ${etapa1}">
            👨‍🍳 Pedido sendo preparado
        </div>

        <div class="etapa ${etapa2}">
            🛵 Saiu para entrega
        </div>

        <div class="etapa ${etapa3}">
            ✅ Pedido entregue
        </div>
    `;
}

