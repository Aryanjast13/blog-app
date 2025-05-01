import express, {Router} from "express";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";


const mainRouter: Router = express.Router();

mainRouter.use('/auth', authRoutes)

mainRouter.use('/posts', postRoutes)

export default mainRouter;
