const Sneaker = require("../models/site/sneakers");

exports.GetSneakers = async (req, res, next) => {
  try {
    const result = await Sneaker.findAll();

    const sneakers = result.map((result) => result.dataValues);

    res.render("site/sneakers", {
      pageTitle: "SneakPeak",
      sneaker: sneakers,
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
    return res.redirect("/");
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
  });
};