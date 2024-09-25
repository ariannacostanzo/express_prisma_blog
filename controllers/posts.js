const {PrismaClient} = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();


const store = async (req, res) => {
    const {title, content, categoryId, tags} = req.body;
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")

    const data = {
      title,
      slug,
      content,
      published: req.body.published ? true : false,
      tags: {
        connect: tags.map(id => ({id}))
      }
    };

    if (categoryId) data.categoryId = categoryId;

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
        page: page,
        totalItems,
        totalPages
        
      });
    } catch (err) {
      errorHandlerFunction(res, err);
    }

};



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
      const post = await prisma.post.delete({ where: { slug }});
      res.status(200).json({"message" : `Hai eliminato il post ${slug}`, "data": post});
    } catch (err) {
      errorHandlerFunction(res, err);
    }
}

const update = async (req, res) => {
  const slug = req.params.slug;
  const { title, content, categoryId, tags } = req.body;

  const data = {
    title,
    slug: title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"),
    content,
    published: req.body.published ? true : false,
    tags: {
        set: tags.map(id => ({id}))
      }
  };

  if (categoryId) data.categoryId = categoryId;
  try { 
    const post = await prisma.post.update({ where: { slug }, data });

    res.status(200).json({ message: `Hai modificato il post ${slug}`, data: post });
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};


module.exports = {
    store,
    index, 
    show,
    destroy,
    update 
}