$(".PhieuNhap").click(function(){
    console.log(this.value);
    localStorage.setItem(this.value, 15);
});

$(".PhieuBan").click(function(){
    console.log(this.value);
    sessionStorage.setItem(this.value, 15);
});