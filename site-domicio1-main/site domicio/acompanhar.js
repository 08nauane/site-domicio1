// Simulação de pedidos

const pedidos = {

    "1497": {
        nome: "João",
        status: "preparo"
    },

    "4321": {
        nome: "Maria",
        status: "entrega"
    },

    "8888": {
        nome: "Carlos",
        status: "entregue"
    }

};

function buscarPedido(){

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