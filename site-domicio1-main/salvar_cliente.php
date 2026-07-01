<?php

$nome = $_POST["nome"];
$email = $_POST["email"];
$telefone = $_POST["telefone"];
$endereco = $_POST["endereco"];


$dados = "Nome: ".$nome."\n";
$dados .= "Email: ".$email."\n";
$dados .= "Telefone: ".$telefone."\n";
$dados .= "Endereço: ".$endereco."\n";
$dados .= "--------------------------\n";


$arquivo = fopen("clientes.txt", "a");

fwrite($arquivo, $dados);

fclose($arquivo);


header("Location: pagamento.html");

?>