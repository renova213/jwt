import express from 'express';
import authController from '../controller/auth_controller.js';

const route=express.Router();

route.post('/auth/login', authController.login);
route.post('/auth/register', authController.register);
route.post('/auth/refresh-token', authController.refreshAccessToken);

export default route;