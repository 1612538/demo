var express = require('express');
var modelBook = require('../models/Book');
var router = express.Router();

router.get('/ListBook',async (req, res, next)=>{
    const listBook=await modelBook.getListBook();
    res.render('DanhSachSach',{listBook})
})

module.exports = router;