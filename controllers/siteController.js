const Checkout = require("../models/site/cart");
const User = require("../models/auth/User");
const Sneaker = require("../models/site/sneakers");
const { Op } = require("sequelize");
const Cart = require("../models/site/cart");

exports.GetSite = async (req, res, next) => {
  try {
    const result = await Sneaker.findAll();

    const sneakers = result.map((result) => result.dataValues);

    res.render("site/site", {
      pageTitle: "SneakPeak",
      sneakers: sneakers,
      sneakersPage: true,
      headerBar: true,
      footerBar: true,
      // RegionActive: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetSneakers = async (req, res, next) => {
  try {
    let filter_page = req.query.filter;

    if (!filter_page) {
      // Si filter_page es undefined o vacío, asignar un valor predeterminado o manejar el caso según tus necesidades
      filter_page = 0; // Puedes cambiar 'default_value' según tus necesidades
      const result = await Sneaker.findAll();

      const sneakers = result.map((result) => result.dataValues);

      res.render("site/sneakers", {
        pageTitle: "SneakPeak",
        sneakers: sneakers,
        sneakersPage: true,
        headerBar: true,
        footerBar: true,
        hasSneakers: sneakers.length > 0,
        // RegionActive: true,
      });
    }

    // Buscar en el campo 'brand'
    let filter_search = await Sneaker.findAll({
      where: {
        brand: filter_page,
      },
    });

    // Si no se encuentra nada en el campo 'brand', buscar en el campo 'gender'
    if (filter_search.length === 0) {
      filter_search = await Sneaker.findAll({
        where: {
          gender: filter_page,
        },
      });
    }

    // Si no se encuentra nada en el campo 'gender', buscar en el campo 'material'
    if (filter_search.length === 0) {
      filter_search = await Sneaker.findAll({
        where: {
          material: filter_page,
        },
      });
    }

    const sneakers = filter_search.map((result) => result.dataValues);

    console.log("parte 3 sneakers", sneakers);

    if (sneakers.length === 0) {
      // Si no se encuentra nada en ninguno de los dos campos, redirigir a la vista de error
      res.render("site/sneakers", {
        pageTitle: "SneakPeak",
        notFound: true,
        sneakersPage: true,
        headerBar: true,
        footerBar: true,
        // RegionActive: true,
      });
    } else {
      // Mostrar los resultados de la búsqueda
      res.render("site/sneakers", {
        pageTitle: "Sneakers search",
        sneakerInfo: true,
        headerBar: true,
        footerBar: true,
        sneakers: sneakers,
      });
    }
  } catch (error) {
    console.error(error);
    // Manejar el error adecuadamente, por ejemplo, enviar una respuesta de error al cliente.
    res.status(500).send("Internal Server Error");
  }
};

exports.GetAddSneaker = (req, res, next) => {
  res.render("site/save-sneakers", {
    pageTitle: "Add New Sneaker",
    editMode: false,
    // RegionActive: true,
  });
};

exports.PostAddSneaker = async (req, res, next) => {
  const image = req.file;
  const model = req.body.model;
  const brand = req.body.brand;
  const gender = req.body.gender;
  const material = req.body.material;
  const price = req.body.price;
  const description = req.body.description;
  const stock = req.body.stock;
  try {
    await Sneaker.create({
      imagePath: "/" + image.path,
      model,
      brand,
      gender,
      material,
      price,
      description,
      stock,
    });
    req.flash("success", "Sneaker added successfully");
    return res.redirect("/SneakerCrud");
  } catch (error) {
    console.log(error);
  }
};

exports.GetEditSneaker = async (req, res, next) => {
  const sneakerId = req.params.sneakerId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  const result = await Sneaker.findOne({ where: { id: sneakerId } });

  const sneaker = result.dataValues;

  if (!sneaker) {
    return res.redirect("/");
  }

  res.render("site/save-sneakers", {
    pageTitle: "Edit sneaker",
    editMode: edit,
    sneaker: sneaker,
  });
};

exports.PostEditSneaker = async (req, res, next) => {
  //Necesito saber que datos es que se pueden editar
  const image = req.file;
  const model = req.body.model;
  const brand = req.body.brand;
  const gender = req.body.gender;
  const material = req.body.material;
  const price = req.body.price;
  const description = req.body.description;
  const stock = req.body.stock;
  const sneakerId = req.body.sneakerId;

  try {
    Sneaker.update({ name: regionName }, { where: { id: sneakerId } });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.PostDeleteSneaker = async (req, res, next) => {
  const sneakerId = req.body.sneakerId;
  try {
    await Sneaker.update({ status: 0 }, { where: { id: sneakerId } });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.GetAboutUs = (req, res, next) => {
  res.render("site/AboutUs", {
    pageTitle: "About us",
    AboutUsActive: true,
    headerBar: true,
    footerBar: true,
  });
};

exports.GetConsultasPreguntas = async (req, res, next) => {
  res.render("site/ConsultasPreguntas", {
    pageTitle: "Consultas y preguntas",
    ConsultaPregunta: true,
    headerBar: true,
    footerBar: true,
  });
};

exports.GetDevoluciones = async (req, res, next) => {
  res.render("site/Devoluciones", {
    pageTitle: "Devoluciones",
    Devoluciones: true,
    headerBar: true,
    footerBar: true,
  });
};

exports.GetCrudSneakers = async (req, res, next) => {
  res.render("site/sneakerCrud", {
    pageTitle: "SneakersCrud",
    sneakerCrud: true,
    headerBar: true,
    footerBar: true,
    // RegionActive: true,
  });
};

exports.GetSneakersInfo = async (req, res, next) => {
  const sneakerId = req.params.sneakerId;

  const result = await Sneaker.findOne({ where: { id: sneakerId } });

  const sneaker = result.dataValues;

  res.render("site/sneakerInfo", {
    pageTitle: "Sneakers Info",
    sneakerInfo: true,
    headerBar: true,
    footerBar: true,
    sneaker,
  });
};

exports.GetSearch = async (req, res, next) => {
  try {
    let user_search = req.query.search;

    // Buscar en el campo 'model'
    let sneaker_search = await Sneaker.findAll({
      where: {
        model: {
          [Op.like]: `%${user_search}%`,
        },
      },
    });

    // Si no se encuentra nada en el campo 'model', buscar en el campo 'brand'
    if (sneaker_search.length === 0) {
      sneaker_search = await Sneaker.findAll({
        where: {
          brand: {
            [Op.like]: `%${user_search}%`,
          },
        },
      });
    }

    const sneakers = sneaker_search.map((result) => result.dataValues);

    if (sneakers.length === 0) {
      // Si no se encuentra nada en ninguno de los dos campos, redirigir a la vista de error
      res.render("templates/error", {
        pageTitle: "Error",
        errorMessage: "No se encontraron resultados para la búsqueda.",
        headerBar: true,
        footerBar: true,
      });
    } else {
      // Mostrar los resultados de la búsqueda
      res.render("site/search", {
        pageTitle: "Sneakers search",
        sneakerInfo: true,
        headerBar: true,
        footerBar: true,
        sneakers: sneakers,
      });
    }
  } catch (error) {
    console.error(error);
    // Manejar el error adecuadamente, por ejemplo, enviar una respuesta de error al cliente.
    res.status(500).send("Internal Server Error");
  }
};

exports.pruebaTetsuo = async (req, res, next) => {
  res.render("site/tetsuo", {
    pageTitle: "tetsuo",
    tetsuo: true,
    headerBar: true,
    footerBar: true,
  });
};

exports.GetCart = async (req, res, next) => {
  const result = await Cart.findAll({ include: [{ model: Sneaker }] });
  const cart = result.map((result) => result.dataValues);

  console.log(cart);

  res.render("site/cart", {
    pageTitle: "Cart",
    cartActive: true,
    headerBar: true,
    footerBar: true,
    cart,
  });
};

exports.PostCart = async (req, res, next) => {
  const sneakerId = req.body.idSneaker;
  const size = req.body.options_base;
  const userId = req.user.id;

  if (!size) {
    res.redirect("Sneaker-info/" + sneakerId);
  }

  try {
    await Cart.create({ size,userId, sneakerId });
    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
    req.flash(
      "errors",
      "Ha ocurrido un error al momento de guardar el carrito"
    );
  }
};

exports.GetCheckout = async (req, res, next) => {

  res.render("site/checkout", {
    pageTitle: "Checkout",
    cartActive: true,
    headerBar: true,
    footerBar: true,
  });
};
