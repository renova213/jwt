const searchMahasiswa=async (data, key, param, res) => {
    let filterData=[];
    data.forEach(element => {
        if (element[key].toLowerCase().includes(param)) {
            filterData.push(element);
        }
    });

    if (filterData.length!==0) {
        return res.json({
            message: "Data berhasil didapat",
            data: filterData
        });
    } else {
        return res.json({
            message: "Data tidak ditemukan",
            data: filterData
        });
    }
};
export default searchMahasiswa;