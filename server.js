const express = require('express');
const app = express();
var hbs = require('hbs');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var createError = require('http-errors');

app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
// Tạo option select
hbs.registerHelper("Option", function(options, value){
    var html='';
    options.forEach(item => {
        html+=`<option value="${item.IDLOAISACH}" ${item.IDLOAISACH==value?"selected":""}>${item.TEN}</option>`;
    });
    return html;
});
hbs.registerHelper("ConvertDat",function(num){
    var mydate=new Date(num);
    return mydate.toLocaleString();
});

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use("/public",express.static('public'));

require('./middlewares/passport');
app.use(passport.initialize());
app.use(passport.session()); 
//app.use(flash()); 

app.use('/', require("./controllers/ControllerAccount"));
app.use('/admin',isLoggedIn, require("./controllers/ControllerHome"));
app.use('/admin', isLoggedIn, require("./controllers/ControllerDanhMucSanPham"));
app.use('/admin/Book', isLoggedIn, require("./controllers/CTLSaveorUpdateBook"));
app.use('/admin',isLoggedIn,require("./controllers/CTLPhieuNhap"));
app.use('/admin',isLoggedIn,require("./controllers/CTLPhieuBan"));
app.use('/admin',isLoggedIn,require("./controllers/CTLPhieuThu"));
app.use('/admin',isLoggedIn,require("./controllers/CTLSearch"));
app.use('/admin',isLoggedIn,require("./controllers/CTLKhachHang"));
app.use('/admin',isLoggedIn,require("./controllers/CTLlichsuban"));
app.use('/admin',isLoggedIn,require("./controllers/CTLListBook"));              //////////
app.use('/admin/ImportBook',isLoggedIn, require("./controllers/ControllerImport"));
// app.get('/',(req,res)=>{
//     res.render('DetailBook');
// })
 
  
// app.post('/upload-profile-pic', (req, res) => {
    
// });
app.use('/', function(req,res){
    if (req.isAuthenticated())
        {res.redirect('/admin');
        return;
    }
    res.redirect('/login');
})

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}!`));

function isLoggedIn(req,res,next){
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}