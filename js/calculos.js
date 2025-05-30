$(document).ready(function () {
    $("#btnCalcular").click(function () {
      var nome = $("#nome").val().trim();
      var idade = parseFloat($("#idade").val());
      var dependentes = parseFloat($("#dependentes").val());
      var salario = parseFloat($("#salario").val());
  
      if (!nome) {
        alert("Por favor, digite seu nome.");
        return;
      }
  
      if (isNaN(idade) || isNaN(dependentes) || isNaN(salario)) {
        alert("Por favor, insira números válidos para idade, dependentes e salário.");
        return;
      }
  
      if (idade >= 50) {
        salario += 300;
      } else {
        salario += 200;
      }
  
      if (dependentes >= 1) {
        salario += dependentes * 50;
      }
  
      var inss = salario * 0.08;
      var vt = salario * 0.05;
  
      var salarioLiquido = salario - inss - vt;
  
      // Agora busca a cotação do dólar para real
      // Usando a ExchangeRate-API (base EUR): 
      // Endpoint gratuito sem API key:
      // https://open.er-api.com/v6/latest/BRL
      $.get("https://open.er-api.com/v6/latest/BRL", function(data) {
        if (data && data.result === "success") {
          var dolarRate = data.rates.USD;
          var salarioDolar = salarioLiquido * dolarRate;
  
          $("#resultado").html(
            `Salário líquido de ${nome}: R$ ${salarioLiquido.toFixed(2)}<br>` +
            `Equivalente em Dólar: $ ${salarioDolar.toFixed(2)} (cotação: ${dolarRate.toFixed(4)})`
          );
        } else {
          $("#resultado").text("Erro ao buscar cotação do dólar.");
        }
      }).fail(function() {
        $("#resultado").text("Erro ao buscar cotação do dólar.");
      });
    });
  });
  