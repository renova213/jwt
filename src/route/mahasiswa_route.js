import mahasiswaController from '../controller/mahasiswa_controller.js';
import express from 'express';
import verifyToken from '../util/verify_token.js';

const route=express.Router();

route.get("/", verifyToken, mahasiswaController.findAllMahasiswa);
route.get("/:name", verifyToken, mahasiswaController.findMahasiswaByName);
route.post("/", verifyToken, mahasiswaController.createMahasiswa);
route.delete("/:id", verifyToken, mahasiswaController.deleteMahasiswa);
route.put("/:id", verifyToken, mahasiswaController.updateMahasiswa);

export default route;