const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;
  
  const data = {
    name
  };

  try {
    const tag = await prisma.tag.create({ data });
    res.status(200).send(tag);
  } catch (error) {
    errorHandlerFunction(error);
  }

};

const index = async (req, res) => {
  
  try {
    const tags = await prisma.tag.findMany();
    res.status(200).send(tags);
  } catch (error) {
    errorHandlerFunction(error);
  }
  
};

const show = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tag = await prisma.tag.findUnique({
      where: { id }
    });
    res.status(200).json(tag);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tag = await prisma.tag.delete({
      where: { id },
    });
    res.status(200).json([tag, `Hai elimato ${tag.name}`]);
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
        const tag = await prisma.tag.update({ where: {id}, data });
        res.status(200).send(tag);
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
