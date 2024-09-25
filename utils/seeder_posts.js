// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient();

// const posts = [];

// for (let i = 0; i < 100; i++) {
//     const post = {
//         title: Post ${i + 1},
//         slug: post-${i + 1},
//         content: Content ${i + 1},
//         published: Boolean(Math.round(Math.random()))
//     }
//     posts.push(post);
// }

// prisma.post.createMany({
//     data: posts
// })
//     .then(count => console.log(count))
//     .catch(err => console.error(err))

// // prisma.post.deleteMany({
// //     where: {
// //         id: {
// //             gt: 4
// //         }
// //     }
// // })
// //     .then(count => console.log(count))
// //     .catch(err => console.error(err))