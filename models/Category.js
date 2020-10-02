const db=require('../utils/db');
const tbnDanhMuc='the_loai_sach';
const run=db.errorhandle;

exports.getNameCategory=async(idCategory)=>{
    const sql=`SELECT * FROM ${tbnDanhMuc} WHERE '${idCategory}'=IDLOAISACH;`
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
exports.getListCategory=async()=>{
    const sql=`SELECT * FROM ${tbnDanhMuc}`
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
