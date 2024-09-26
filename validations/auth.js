const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "L'email è obbligatoria",
      bail: true,
    },
    isEmail: {
      errorMessage: "Il formato email non è corretto",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });
        if (user) {
          throw new Error("C'è già un user associato a questa email");
        }
        return true;
      },
    },
  },
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Il nome deve essere una stringa",
      bail: true,
    },
    isLength: {
      errorMessage: "Il nome deve avere almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "La password è obbligatoria",
      bail: true,
    },
    isString: {
      errorMessage: "La password deve essere una stringa",
      bail: true,
    },
  },
};

const loginBody = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "L'email è obbligatoria",
      bail: true,
    },
    isEmail: {
      errorMessage: "Il formato email non è corretto",
      bail: true,
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "La password è obbligatoria",
      bail: true,
    },
    isString: {
      errorMessage: "La password deve essere una stringa",
      bail: true,
    },
  },
};

module.exports = {
  registerBody,
  loginBody,
};
