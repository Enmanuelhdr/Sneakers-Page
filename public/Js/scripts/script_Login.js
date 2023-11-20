function validateForm() {
    var isValid = true;

    // Validar campo de usuario
    var usernameField = document.getElementById("username");
    var usernameValue = usernameField.value.trim();

    // Validación del formato del correo electrónico (Agregado)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usernameValue)) {
        isValid = false;
        usernameField.classList.remove("is-valid");
        usernameField.classList.add("is-invalid");
        document.getElementById("usernameFeedback").innerHTML = "Ingrese un correo electrónico válido.";
    } else {
        usernameField.classList.remove("is-invalid");
        usernameField.classList.add("is-valid");
        document.getElementById("usernameFeedback").innerHTML = "";
    }

    // Validar campo de contraseña
    var passwordField = document.getElementById("password");
    var passwordValue = passwordField.value.trim();

    // Validación de la longitud de la contraseña (Agregado)
    if (passwordValue.length < 6) {
        isValid = false;
        passwordField.classList.remove("is-valid");
        passwordField.classList.add("is-invalid");
        document.getElementById("passwordFeedback").innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    } else {
        passwordField.classList.remove("is-invalid");
        passwordField.classList.add("is-valid");
        document.getElementById("passwordFeedback").innerHTML = "";
    }

    return isValid;
}