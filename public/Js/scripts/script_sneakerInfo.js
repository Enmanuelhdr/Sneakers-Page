function changeImage(imagePath) {
    // Cambiar la imagen principal
    document.getElementById('mainImage').src = imagePath;

    // Quitar la clase 'selected' de todas las miniaturas
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.classList.remove('selected');
    });

    // Agregar la clase 'selected' a la miniatura clicada
    event.target.classList.add('selected');
}