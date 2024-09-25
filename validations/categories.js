const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const paramId = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "L'id' deve essere un numero",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const category = await prisma.category.findUnique({
          where: { id: parseInt(value) },
        });
        if (!category) throw new Error("La categoria specificata non esiste");

        return true;
      },
    },
  },
};

const bodyData = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "name è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "name deve essere una stringa",
      bail: true,
    },
    isLength: {
      errorMessage: "name deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
};

module.exports = {
  paramId,
  bodyData,
};
