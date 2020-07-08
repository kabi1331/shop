var asidenode=document.getElementById("aside")
var articlenode=document.getElementById("article")
var anode=document.getElementById("a1")
var num = document.getElementById("num")
var ul=document.getElementsByTagName("ul")
var ta=document.getElementById("t")
var list=document.getElementsByClassName("list")
var c=document.getElementsByClassName("c")
var price=document.getElementById("sum")
var num1=parseInt(num.innerHTML)
var ch=document.getElementById("check")
var sum1=0;
var h2=document.getElementsByTagName("h2")
window.start= function() {
    asidenode.style.display="none"
    h2[0].style.display="none"
}
window.changepage =function() {
    asidenode.style.display="block"
    articlenode.style.display="none"
}
window.changepage2 =function() {
    asidenode.style.display="none"
    articlenode.style.display="flex"
}
window.add = function(obj) {
    num1++;
    num.innerHTML=num1;
    var tr=ta.insertRow(-1);
    tr.align="center";
    tr.style.background="white"
    var t1=tr.insertCell(0);
    t1.innerHTML="<input type='checkbox' class='c' onclick='sel(this)'></input>"
    var t2=tr.insertCell(1);
    t2.innerHTML=obj.parentNode.parentNode.children[1].children[0].innerHTML
    var t3=tr.insertCell(2);
    t3.innerHTML=parseInt(obj.parentNode.parentNode.children[1].children[1].innerHTML.split("元/份")[0]);
    var t4=tr.insertCell(3);
    t4.innerHTML="<input type='button' value='删除' onclick='del(this)' id='dele'></input>"
    var c=document.getElementsByClassName("c")
    for(var i=0;i<c.length;i++){
        if(!c[i].checked){
            ch.checked=false;
        }
    }
    if(ta.rows.length>1){
        h2[0].style.display="none";
    }
    alert("加入购物车成功")
}
window.del = function(obj) {
    if(obj.parentNode.parentNode.children[0].children[0].checked){
        sum1-=parseInt(obj.parentNode.parentNode.children[2].innerHTML) 
    }
    ta.deleteRow(obj.parentNode.parentNode.rowIndex);
    num1--
    num.innerHTML=num1;
    price.innerHTML=sum1;
    var c=document.getElementsByClassName("c")
    for(var i=0;i<c.length;i++){
        if(c[i].checked){
            ch.checked=true;
        }
    }
    if(ta.rows.length==1){
        h2[0].style.display="block";
        ch.checked=false;
    }
    return sum1;
}
window.che = function(obj) {
    var c=document.getElementsByClassName("c")
    var sum=0;
    if(obj.checked){
        for(var i=0;i<c.length;i++){
            c[i].checked=true;
            sum+=parseInt(c[i].parentNode.parentNode.children[2].innerHTML)
        }
        sum1=sum;
    }else{
        for(var i=0;i<c.length;i++){
            c[i].checked=false;
        }
        sum1=0
    }
    price.innerHTML=sum;
    return sum1
}
window.sel = function(obj) {
    var c=document.getElementsByClassName("c")
    var count=0;
    var dele= document.getElementById("dele")
    for(var i=0;i<c.length;i++){
        if(c[i].checked){
            count++;
        }
    }
    if(count==c.length){
        ch.checked=true;
    }else{
        ch.checked=false;
    }
    if(obj.checked){
        sum1+=parseInt(obj.parentNode.parentNode.children[2].innerHTML)  
    }else{
        sum1-=parseInt(obj.parentNode.parentNode.children[2].innerHTML) 
    }
    price.innerHTML=sum1;
    return sum1;
}
window.deleteall = function() {
    var c=document.getElementsByClassName("c")
    if(ch.checked){
        while(ta.rows.length>1){
            ta.deleteRow(-1);
        }
        ch.checked=false;
        sum1=0;
        num1=0;
    }else{
        for(var i=c.length-1;i>=0;i--){
            if(c[i].checked){
                sum1-=parseInt(c[i].parentNode.parentNode.children[2].innerHTML);
                ta.deleteRow(c[i].parentNode.parentNode.rowIndex);
                num1--
            }
        }
    }
    if(ta.rows.length==1){
        h2[0].style.display="block";
        ch.checked=false;
    }
    if(sum1<0){
        sum1=0;
    }
    price.innerHTML=sum1;
    num.innerHTML=num1;
    return sum1;
}
window.addall = function() {
    alert("共计消费"+price.innerHTML+"元")
    deleteall();
}
require('./indexcss.css');