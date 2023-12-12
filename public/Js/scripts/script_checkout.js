 // Obtener el método de pago predeterminado al cargar la página
 var defaultPaymentMethod = document.getElementById('paymentMethod').value;

 // Ocultar todos los detalles de pago excepto el predeterminado
 document.querySelectorAll('.payment-details').forEach(function (detail) {
   if (detail.id === defaultPaymentMethod + 'Details') {
     detail.style.display = 'block';
   } else {
     detail.style.display = 'none';
   }
 });

 // Manejar cambios en el método de pago seleccionado
 document.getElementById('paymentMethod').addEventListener('change', function () {
   // Ocultar todos los detalles de pago
   document.querySelectorAll('.payment-details').forEach(function (detail) {
     detail.style.display = 'none';
   });

   // Mostrar los detalles específicos del método de pago seleccionado
   var selectedMethod = this.value;
   document.getElementById(selectedMethod + 'Details').style.display = 'block';
 });