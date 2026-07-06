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

function buscarPedido(){
    let tempoEstimado = "";

if(pedido.status == "Em preparação"){
    tempoEstimado = "30 a 40 minutos";
}

if(pedido.status == "Saiu para entrega"){
    tempoEstimado = "10 a 20 minutos";
}

if(pedido.status == "Entregue"){
    tempoEstimado = "Pedido finalizado";
}

    let codigo = document.getElementById("codigo").value;

    let resultado = document.getElementById("resultado");

    if(!pedidos[codigo]){
        resultado.innerHTML = "<h3>Pedido não encontrado.</h3>";
        return;
    }

    let pedido = pedidos[codigo];

    let preparo = "";
    let entrega = "";
    let entregue = "";

    if(pedido.status=="preparo"){
        preparo="ativa";
    }

    if(pedido.status=="entrega"){
        preparo="ativa";
        entrega="ativa";
    }

    if(pedido.status=="entregue"){
        preparo="ativa";
        entrega="ativa";
        entregue="ativa";
    }

    resultado.innerHTML=`

    <h3>Olá, ${pedido.nome}</h3>

    <p class="codigo">
    Código do Pedido: ${codigo}
    </p>

    <div class="etapa ${preparo}">
    👨‍🍳 Pedido sendo preparado
    </div>

    <div class="etapa ${entrega}">
    🛵 Saiu para entrega
    </div>

    <div class="etapa ${entregue}">
    ✅ Pedido entregue
    </div>

    `;

}