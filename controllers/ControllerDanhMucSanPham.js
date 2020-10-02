var express = require('express');
var modelCategory = require('../models/Category');
var router = express.Router();

router.get('/DanhMucSanPham', async (req, res, next) => {

    const category=await modelCategory.getListCategory();
    res.render('DanhMucSanPham',{data:category});
});


module.exports = router;