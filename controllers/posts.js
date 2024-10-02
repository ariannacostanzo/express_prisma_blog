const {PrismaClient} = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();
const baseUrl = "http://localhost:8000";
const path = require('path');
const fs = require('fs')


const store = async (req, res) => {

    const {title, content, categoryId, tags, section} = req.body;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;

    const data = {
      title,
      slug,
      content,
      section,
      published: req.body.published ? true : false,
      tags: {
        connect: tags.map(id => ({id}))
      },
      image: imageUrl
    };

     if (categoryId) {
       data.category = {
         connect: { id: categoryId },
       }; 
     }

    try {
        const post = await prisma.post.create({ data });    
        res.status(200).send(post); 
    } catch (error) { 
        errorHandlerFunction(error) 
    }
    
    
}

const index = async (req, res) => {

    const searchText = req.query.filter;
    const published = req.query.pub;

    //paginazione
    const {page = 1, limit = 5} =  req.query;

    const offset = (page - 1) * limit;


    let filterPublished = {};
    if (published != undefined) {
        if (published === "true") {
            filterPublished.published = published
        } else if (published === "false") {
            filterPublished.published = published;
        } 
        
    } 
    

    try {
      const totalItems = await prisma.post.count({
        where: {
          OR: [
            {
              title: {
                contains: searchText ? searchText : "",
              },
            },
            {
              content: {
                contains: searchText ? searchText : "",
              },
            },
          ],
          published: filterPublished.published,
        },
        
      });

      const totalPages = Math.ceil(totalItems / limit)
 
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchText ? searchText : "",
              },
            },
            {
              content: {
                contains: searchText ? searchText : "",
              },
            },
          ],
          published: filterPublished.published
        },
        include: {
          category: {
            select: {
              name: true
            }
          },
          tags: {
            select : { 
              name: true
            }
          }
        },
        take: parseInt(limit),
        skip: parseInt(offset)
      });
      res.status(200).json({
        data: posts, 
        page: parseInt(page),
        totalItems,
        totalPages
        
      });
    } catch (err) {
      errorHandlerFunction(res, err);
    }

};

const latestPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true, // Filtra solo i post pubblicati, se necessario
      },
      orderBy: {
        createdAt: "desc", // Ordina in base alla data di creazione in ordine decrescente
      },
      take: 5, // Limita a 5 post
      include: {
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore nel recupero degli ultimi post", error: err });
  }
}



const show = async (req, res) => {
  const slug = req.params.slug;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { category: {select: {name: true}}, tags: {select: {name: true}} },
    });
    res.status(200).json(post);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const destroy =  async (req, res) => {
    const slug = req.params.slug;
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
      });

      if (!post) {
        return res.status(404).json({ message: "Post non trovato" });
      }

      // Elimina l'immagine associata se esiste
      if (post.image) {
        const imageName = post.image.split("/").pop();
        const imagePath = path.join(__dirname, "../uploads", imageName);

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Errore durante l'eliminazione dell'immagine:", err);
          } else {
            console.log("Immagine eliminata:", post.image);
          }
        });
      }
      await prisma.post.delete({ where: { slug }});
      res.status(200).json({"message" : `Hai eliminato il post ${slug}`, "data": post});
    } catch (err) {
      errorHandlerFunction(res, err); 
    }
}

const update = async (req, res) => {
  const slug = req.params.slug;
  const { title, content, categoryId, tags, section } = req.body;
  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null; 

  const data = {
    title,
    slug: title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
    content,
    section,
    published: req.body.published ? true : false,
    image: imageUrl,
    // tags: {
    //     set: tags.map(id => ({id}))
    //   }
  };

  if (categoryId) data.categoryId = parseInt(categoryId);
  try { 
    const post = await prisma.post.update({ where: { slug }, data });

    res.status(200).json({ message: `Hai modificato il post ${slug}`, data: post });
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const getPostsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  // Paginazione
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const totalItems = await prisma.post.count({
      where: {
        categoryId: categoryId,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    const posts = await prisma.post.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    res.status(200).json({
      data: posts,
      page: parseInt(page),
      totalItems,
      totalPages,
    });
  } catch (err) {
    errorHandlerFunction(res, err);
  }
}


module.exports = {
    store,
    index, 
    show,
    destroy,
    update,
    latestPosts,
    getPostsByCategory
}