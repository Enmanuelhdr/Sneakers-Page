exports.GetCarrito = async (req, res, next) => {
    res.render("tienda/carrito", {
        pageTitle: "Carrito",
    });
};