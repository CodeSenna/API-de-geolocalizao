// Ao campo CEP perder o foco será feito a tratativa
document.getElementById("cep").addEventListener("blur", async function () {
  const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numericos

  // Verifica se o CEP tem exatamente 8 Dig.
  if (cep.length !== 8) {
    alert("CEP inválido, deve ter 8 digitos"); // Alerta se for inválido
    return; // Não executa o código para baixo
  }

  try {
    // Faz uma requisição para o Backend e a consulta do CEP informado
    const response = await fetch(`http://localhost:3000/api/cep/${cep}`);
    if (!response.ok) {
      // Verifica se a resposta foi bem sucedida
      throw new Error("Erro ao buscar o CEP"); // Erro ao falhar
    }

    // Converte a resposta da req. para JSON
    const data = await response.json();

    // Verifica se o CEP retornado pela API é inválido
    if (data.erro) {
      alert("Cep não encontrado!");
      return;
    }

    // Preenche os campos do formulário com os dados retornardos
    document.getElementById("logradouro").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("estado").value = data.uf;

    // Adiciona um feedback visual, alterando a cor da borda dos campos
    document.querySelectorAll(".form-group input").forEach((input) => {
        input.style.borderColor = "#6a11cb"; // Borda roxa ao CPF for encontrado
    });
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error); // Exibe o erro no console
    alert("Erro ao buscar o CEP. Verifique o console para mais detalhes");
  }
});
