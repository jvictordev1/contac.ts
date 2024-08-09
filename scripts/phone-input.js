const telefoneInput = document.getElementById("friend-phone");

telefoneInput.addEventListener("input", function (event) {
  let value = telefoneInput.value.replace(/\D/g, ""); // Remove tudo que não é dígito

  if (value.length > 2) {
    value = "(" + value.substring(0, 2) + ") " + value.substring(2);
  }

  if (value.length > 4) {
    value = value.substring(0, 5) + " " + value.substring(5);
  }

  if (value.length > 10) {
    value = value.substring(0, 10) + "-" + value.substring(10);
  }

  telefoneInput.value = value.substring(0, 15); // Limita o valor a 16 caracteres
});
