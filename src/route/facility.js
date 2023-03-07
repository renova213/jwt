import express from 'express';
import verifyToken from '../util/verify_token.js';
import verifyTokenAdmin from '../util/verify_token_admin.js';

const route=express.Router();

route.get('/facility', verifyToken, (req, res) => res.json({ "message": "Kita bisa" }));
route.post('/facility', verifyTokenAdmin, (req, res) => res.json({ "message": "Kita bisa" }));

export default route;