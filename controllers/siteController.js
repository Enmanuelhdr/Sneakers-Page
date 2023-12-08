const Sneaker = require("../models/site/sneakers");
const { Op } = require('sequelize');

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
      hasSneakers: sneakers.length > 0,
      // RegionActive: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetSneakers = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
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

exports.PostDeleteRegion = async (req, res, next) => {
  const sneakerId = req.body.sneakerId;
  try {
    await Sneaker.update({ status: 0 }, { where: { id: regionId } });

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
  res.render("site/sneaker-info", {
    pageTitle: "Sneakers",
    sneakerInfo: true,
    headerBar: true,
    footerBar: true,
    // RegionActive: true,
  });
};

exports.GetSearch = async (req, res, next) => {
  try {
    let user_search = req.query.search;

    // Buscar en el campo 'model'
    let sneaker_search = await Sneaker.findAll({
      where: {
        model: {
          [Op.like]: `%${user_search}%`
        }
      }
    });

    // Si no se encuentra nada en el campo 'model', buscar en el campo 'brand'
    if (sneaker_search.length === 0) {
      sneaker_search = await Sneaker.findAll({
        where: {
          brand: {
            [Op.like]: `%${user_search}%`
          }
        }
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
        sneakers: sneakers
      });
    }

  } catch (error) {
    console.error(error);
    // Manejar el error adecuadamente, por ejemplo, enviar una respuesta de error al cliente.
    res.status(500).send("Internal Server Error");
  }
};