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
      errorMessage: "title è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "title deve essere una stringa",
      bail: true,
    },
    isLength: {
      errorMessage: "title deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "content è un campo obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "content deve essere una stringa",
      bail: true,
    },
    isLength: {
      errorMessage: "content deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  image: {
    in: ["body"],
    optional: { nullable: true },
    isString: {
      errorMessage: "image deve essere una stringa",
      bail: true,
    },
  },
  published: {
    in: ["body"],
    notEmpty: {
      errorMessage: "published è un campo obbligatorio",
      bail: true,
    },
    isBoolean: {
      errorMessage: "published deve essere un booleano",
      bail: true,
    },
  },
  categoryId: {
    in: ["body"],
    optional: { nullable: true },
    isInt: {
      errorMessage: "Category Id deve essere un numero",
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