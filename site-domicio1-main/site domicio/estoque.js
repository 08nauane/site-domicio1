// ============================
// PROTEÇÃO DA PÁGINA
// ============================

if(localStorage.getItem("funcionarioLogado") == null){

    window.location.href = "funcionario.html";

}


// ============================
// ESTOQUE INICIAL
// ============================

let estoque = JSON.parse(
    localStorage.getItem("estoque")
) || [

    {
        nome:"Arroz Branco",
        quantidade:100
    },

    {
        nome:"Arroz Integral",
        quantidade:50
    },

    {
        nome:"Frango Grelhado",
        quantidade:50
    },

    {
        nome:"Bife Acebolado",
        quantidade:50
    },

    {
        nome:"Carne Assada",
        quantidade:50
    },

    {
        nome:"Linguiça Toscana",
        quantidade:50
    },

    {
        nome:"Batata Frita",
        quantidade:50
    },

    {
        nome:"Purê de Batata",
        quantidade:50
    },

    {
        nome:"Macarrão",
        quantidade:50
    },

    {
        nome:"Farofa",
        quantidade:50
    },

    {
        nome:"Legumes Refogados",
        quantidade:50
    },

    {
        nome:"Embalagem",
        quantidade:200
    }

];



let movimentos = JSON.parse(
    localStorage.getItem("movimentos")
) || [];



// ============================
// BAIXAR ESTOQUE DO PEDIDO
// ============================

function atualizarEstoquePedidos(){


let historico = JSON.parse(
    localStorage.getItem("historicoPedidos")
) || [];



historico.forEach(pedido=>{


    if(pedido.processado){
        return;
    }



    pedido.itens.forEach(item=>{


        if(item.ingredientes){


            item.ingredientes.forEach(ingrediente=>{


                let produto = estoque.find(
                    e=>e.nome == ingrediente
                );



                if(produto){


                    produto.quantidade--;



                    movimentos.push({

                        tipo:"Saída automática",

                        produto:ingrediente,

                        quantidade:1,

                        pedido:pedido.codigoEntrega || "",

                        data:new Date().toLocaleString()

                    });


                }


            });


        }


    });



    pedido.processado = true;


});



localStorage.setItem(
"historicoPedidos",
JSON.stringify(historico)
);



localStorage.setItem(
"estoque",
JSON.stringify(estoque)
);



localStorage.setItem(
"movimentos",
JSON.stringify(movimentos)
);



}



// executa baixa automática
atualizarEstoquePedidos();



// ============================
// MOSTRAR ESTOQUE
// ============================

function mostrar(){


let lista =
document.getElementById("lista");


lista.innerHTML="";



estoque.forEach(item=>{


lista.innerHTML += `

<p>
<strong>${item.nome}</strong>:
${item.quantidade}
</p>

`;



});





let historico =
document.getElementById("historico");


historico.innerHTML="";



movimentos.forEach(m=>{


historico.innerHTML += `

<p>

${m.data}

<br>

<strong>${m.tipo}</strong>

<br>

${m.produto}
(-${m.quantidade})

<br>

Pedido: ${m.pedido || "manual"}

</p>

<hr>

`;



});


}



mostrar();