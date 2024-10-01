const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const paramSlug = {
    slug: {
        in: ["params"],
        isString : {
            errorMessage: "Lo slug deve essere una stringa",
            bail: true
        },
        custom: {
            options: async (value) => {
                const post = await prisma.post.findUnique({
                    where: { slug: value}
                });
                if (!post) throw new Error ("Il post specificato non esiste")
                
                return true
            }
        }
    }
}


const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il titolo è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "Il titolo deve essere una stringa",
      bail: true,
    },
    custom: {
      options: (value) => {
        if (value.length <= 3) {
          throw new Error("Il titolo deve superare 3 caratteri");
        }
        if (value.length >= 100) {
          throw new Error("Il titolo non può superare i 100 caratteri");
        }
        return true;
      },
    },
  },
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "La descrizione è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "La descrizione deve essere una stringa",
      bail: true,
    },
    custom: {
      options: (value) => {
        if (value.length <= 3) {
          throw new Error("La descrizione deve superare 3 caratteri");
        }
        if (value.length >= 100) {
          throw new Error("La descrizione non può superare i 100 caratteri");
        }
        return true;
      },
    },
  },
  section: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il contenuto è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "Il contenuto deve essere una stringa",
      bail: true,
    },
    custom: {
      options: (value) => {
        if (value.length <= 3) {
          throw new Error("Il contenuto deve superare 3 caratteri");
        }
        if (value.length >= 2000) {
          throw new Error("Il titolo non può superare i 2000 caratteri");
        }
        return true;
      },
    },
  },
  image: {
    in: ["body"],
    optional: { nullable: true },
    isString: {
      errorMessage: "Immagine deve essere una stringa",
      bail: true,
    },
  },
  published: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Pubblicato è un campo obbligatorio",
      bail: true,
    },
    isBoolean: {
      errorMessage: "Pubblicato deve essere un booleano",
      bail: true,
    },
  },
  categoryId: {
    in: ["body"],
    optional: { nullable: true },
    isInt: {
      errorMessage: "Devi scegliere una categoria",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const categoryId = parseInt(value);
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category) {
          throw new Error("non esiste questa categoria");
        }
      },
    },
  },
  tags: {
    in: ["body"],
    optional: { nullable: true },
    isArray: {
      errorMessage: "Tags deve essere un array",
      bail: true,
    },
    custom: {
      options: async (ids) => {
        const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new Error("Uno o più id non sono dei numeri interi");
        }
        const tags = await prisma.tag.findMany({
          where: { id: { in: ids } },
        });
        if (tags.length != ids.length) {
          throw new Error("uno o più tags specificati non esistono");
        }
        return true;
      },
    },
  },
};

module.exports = {
    paramSlug,
    bodyData
}