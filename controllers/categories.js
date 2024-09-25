const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const category = await prisma.category.create({ data });
    res.status(200).send(category);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const index = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).send(categories);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const show = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    res.status(200).json(category);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    res.status(200).json([category, `Hai elimato ${category.name}`]);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const category = await prisma.category.update({ where: { id }, data });
    res.status(200).send(category);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

module.exports = {
  store,
  index,
  show,
  destroy,
  update,
};
