function soloLetras(e) {
  var key = e.charCode || e.keyCode || 0;
  return (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32;
}

function register() {
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var birthdate = document.getElementById("birthdate").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var gender = document.getElementById("gender").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Validar campos
  if (!firstname || !lastname || !birthdate || !email || !phone || !gender || !password || !confirmPassword) {
    document.getElementById("error-message").innerHTML = "Todos los campos son obligatorios";
    document.getElementById("success-message").innerHTML = "";
    return;
  }

  if (!soloLetras({ keyCode: firstname.charCodeAt(0) }) || !soloLetras({ keyCode: lastname.charCodeAt(0) })) {
    document.getElementById("error-message").innerHTML = "El nombre y apellidos no deben contener números";
    document.getElementById("success-message").innerHTML = "";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("error-message").innerHTML = "Correo electrónico no válido";
    document.getElementById("success-message").innerHTML = "";
    return;
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    document.getElementById("error-message").innerHTML = "Formato de teléfono no válido (por ejemplo, (809)-456-7890)";
    document.getElementById("success-message").innerHTML = "";
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("error-message").innerHTML = "Las contraseñas no coinciden";
    document.getElementById("success-message").innerHTML = "";
    return;
  }

  // Lógica para el registro (puedes enviar los datos a un servidor, almacenar en una base de datos, etc.)
  
  // Mostrar mensaje de éxito
  document.getElementById("error-message").innerHTML = "";
  document.getElementById("success-message").innerHTML = "Registro exitoso";
}

function cancel() {
  // Lógica para cancelar el registro, redirigir, etc.
}
