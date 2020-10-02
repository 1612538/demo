var express=require('express');
var khModel = require("../models/khachhang");
var hdModel = require("../models/HoaDon");
var pttModel = require("../models/PhieuThu");

var router=express.Router();

router.get('/KhachHang', async (req,res,next)=>{
    const allKH = await khModel.getAll();
    res.render('KhachHang', {
        khachhang: allKH,
    });
});

module.exports = router;