import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../middleware/authMiddleware.js";
import PostModel, { Post } from "../models/postModel.js";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const createPost: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    // we accept title, content, image.

    const { title, content } = req.body;

    if (!title || !content) {
      res
        .status(401)
        .json({ success: false, message: "title and content is required." });
      return;
    }
 
    // creating a post.
    const post: Post = {
      author: Number(req?.user?.id),
      title: title,
      content: content,
    };

    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded." });
      return;
    }
    // Set up S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // S3 bucket name
      Key: `${Date.now()}_${req.file.originalname}`, // File name with timestamp
      Body: req.file.buffer, // File buffer, // Set the file to be publicly readable
      ContentType: req.file.mimetype, // File MIME type
    };

    // Create the PutObjectCommand for S3
    const command = new PutObjectCommand(params);

    // Upload the file to S3
    const data = await s3Client.send(command);

    // Construct the file's public URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    const imageUrl = fileUrl;
    post.cover_image = imageUrl; // URL of the uploaded image in S3

    const status = await PostModel.createPost(post);

    if (!status) {
      res.status(401).json({
        status: false,
        message: "Failed to create the blog post",
        body: {
          title: title,
          content: content,
          cover_image: imageUrl,
        },
      });
      return;
    }

    res.status(201).json({
      status: true,
      message: "Blog post created successfully",
      data: status,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Failed to create the blog post" });
  }
};

export const getAllPosts: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.status(201).json({
      success: true,
      message: `There are ${posts.length} posts`,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching posts." });
  }
};

export const getPost: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postId = Number(id);

    if (isNaN(postId)) {
      res.status(404).json({ success: false, message: `Not a valid post id` });
      return;
    }

    const post = await PostModel.getPostById(postId);

    if (!post) {
      res
        .status(404)
        .json({ success: false, message: `No post found by id ${postId}` });
      return;
    }

    res.status(201).json({
      success: true,
      message: `Here, is the post of id ${postId}`,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error while fetching post of id ${id} .`,
    });
  }
};

export const updatePost: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // we accept title, content.

    if (!title || !content) {
      res
        .status(401)
        .json({ success: false, message: "title and content is required." });
      return;
    }

    // here, i need to check that only author can update the post.
    const postId = Number(id);

    if (isNaN(postId)) {
      res.status(404).json({ success: false, message: `Not a valid post id` });
      return;
    }
    
    const post = await PostModel.getPostById(postId);

    if (!post) {
      res
        .status(404)
        .json({ success: false, message: `No post found by id ${postId}` });
      return;
    }

    // Verifing that author is trying to delete the post.
    if (post?.username != req?.user?.username) {
      res.status(403).json({
        success: false,
        message: `You are not authorized to delete the post ${postId}`,
      });
      return;
    }

    // Updating Post
    post.title = title
    post.content = content

    const status = await PostModel.updatePost(post);
    if (!status) {
      res
        .status(500)
        .json({ success: false, message: `Failed to update the postId ${post.id}` });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "Post updated successfully." });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: `Something went wrong while updating post.` });
  }
};

export const deletePost: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  // here, first get the id.
  const { id } = req.params;
  try {
    const postId = Number(id);

    if (isNaN(postId)) {
      res.status(404).json({ success: false, message: `Not a valid post id` });
      return;
    }
    const post = await PostModel.getPostById(postId);

    if (!post) {
      res
        .status(404)
        .json({ success: false, message: `No post found by id ${postId}` });
      return;
    }

    // Verifing that author is trying to delete the post.
    if (post?.username != req?.user?.username) {
      res.status(403).json({
        success: false,
        message: `You are not authorized to delete the post ${postId}`,
      });
      return;
    }

    const status = await PostModel.deletePost(postId);
    if (!status) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete the post" });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "Your post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete the post" });
  }
};

