import mahasiswa from '../model/mahasiswa_model.js';
import searchMahasiswa from '../util/search_mahasiswa.js';

const createMahasiswa=async (req, res) => {
    try {
        const nameExist=await mahasiswa.findOne({ "nama_lengkap": req.body.nama_lengkap });

        if (nameExist) {
            return res.status(400).json({ "message": "Nama sudah digunakan" });
        }

        mahasiswa.create(req.body).then(() =>
            res.json({ message: "Data mahasiswa berhasil disimpan", data: req.body })).catch(err =>
                res.status(400).json({ message: err['message'] }));

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const findAllMahasiswa=async (req, res) => {
    try {
        const data=await mahasiswa.find();
        res.json({ message: "Data mahasiswa berhasil didapat", data: data });
    } catch (_) {
        res.status(500).json({ message: "Server Error" });
    }
};

const findMahasiswaByName=async (req, res) => {
    try {
        const name=req.params.name;
        const data=await mahasiswa.find();

        searchMahasiswa(data, 'nama_lengkap', name.toLowerCase(), res);
    } catch (_) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateMahasiswa=(req, res) => {
    try {
        const id=req.params.id;
        mahasiswa.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                return res.status(404).json({ message: "id tidak ditemukan" });
            }
            res.json({ message: "Data mahasiswa berhasil diubah" });
        });
    } catch (_) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteMahasiswa=(req, res) => {
    try {
        const id=req.params.id;
        mahasiswa.findByIdAndRemove(id).then(data => {
            if (!data) {
                return res.status(404).json({ message: "id tidak ditemukan" });
            }
            res.json({ message: "Data mahasiswa berhasil dihapus" });
        });
    } catch (_) {
        res.status(500).json({ message: "Server Error" });
    }
};

export default { createMahasiswa, findAllMahasiswa, findMahasiswaByName, updateMahasiswa, deleteMahasiswa };