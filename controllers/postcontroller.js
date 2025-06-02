const prisma=require('../lib/prisma');
const jwt=require('jsonwebtoken');

const getPosts = async (req, res) => {
  const query = req.query;

  const minPrice = parseInt(query.minPrice);
  const maxPrice = parseInt(query.maxPrice);
  const bedroom = parseInt(query.bedroom);

  try {
    const posts = await prisma.post.findMany({
      where: {
        city:
          query.city && query.city.trim() !== ""
            ? { equals: query.city, mode: "insensitive" }
            : undefined,
        type: query.type ? query.type.toLowerCase() : undefined,
        property: query.property ? query.property.toLowerCase() : undefined,
        bedroom: !isNaN(bedroom) ? bedroom : undefined,
        price:
          (!isNaN(minPrice) && minPrice > 0) ||
          (!isNaN(maxPrice) && maxPrice > 0)
            ? {
                gte: minPrice > 0 ? minPrice : undefined,
                lte: maxPrice > 0 ? maxPrice : undefined,
              }
            : undefined,
      },
    });
    
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};



const getPost = async (req, res) => {
  const id = req.params.id;
 
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });

          return res.status(200).json({ ...post, isSaved: !!saved });
        } else {
          // token is invalid
          return res.status(200).json({ ...post, isSaved: false });
        }
      });
    } else {
      // no token, send response immediately
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};


const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
   
    return res.status(200).json(newPost);
    
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ message: "Failed to create post" });
  }
};


const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
module.exports={
    getPosts,
    getPost,
    addPost,
    deletePost,
    updatePost,
}
