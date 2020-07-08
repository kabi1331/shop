//购物车表格对象
var table=document.getElementById("tab");
// 购物车中商品的数量
var count=0;

// 将商品添加到购物车
function addFoodCar(name,price){
    if(checkName(name)){
        var tr=table.insertRow(-1);
        tr.insertCell(0).innerHTML="<input type='checkbox' name='choose' onclick='changeCheck()'>"
        tr.insertCell(1).innerHTML=name;
        tr.insertCell(2).innerHTML=price;
        tr.insertCell(3).innerHTML="<input type='button' value='-' onclick='reduceNumber(this)'><span>1</span><input onclick='addNumber(this)' type='button' value='+'>"
        tr.insertCell(4).innerHTML="<input type='button' value='删除' onclick='deleteFood(this)'>"
        document.getElementById("count").innerHTML=++count;
    }
}
//判断商品在购物车中是否存在
function checkName(name){
    var rs=table.rows;
    var r=true;
    for(var i=1;i<rs.length;i++){
        if(name==rs[i].cells[1].innerHTML){
            r=false;
            break;
        }
    }
    return r;
}
// 全选
function checkAll(obj){
    var boxs=document.getElementsByName("choose");
    for(var i=0;i<boxs.length;i++){
        boxs[i].checked=obj.checked
    }
    pay();
}
// 根据表格中复选框的状态决定全选按钮是否被选中
function changeCheck(){
    var c=0;
    var boxs=document.getElementsByName("choose");
    for(var i=0;i<boxs.length;i++){
        if(boxs[i].checked){
            c++
        }
    }
    document.getElementById("a").checked=c==table.rows.length-1;
    pay();
}
// 删除选中项
function deleteChecked(){
    var boxs=document.getElementsByName("choose");
    for(var i=boxs.length-1;i>=0;i--){
        if(boxs[i].checked){
            table.deleteRow(i+1);
            document.getElementById("count").innerHTML=--count;
        }
    }
    pay()
}
// 删除当前行
function deleteFood(obj){
    var index=obj.parentNode.parentNode.rowIndex; //获得当前行的行号
    table.deleteRow(index);
    document.getElementById("count").innerHTML=--count;
    pay()
}

// 结算（选中项结算）
function pay(){
    var money=0;
    var boxs=document.getElementsByName("choose");
    for(var i=0;i<boxs.length;i++){
        if(boxs[i].checked){
            console.log(boxs[i].parentNode);
            
            money+=parseInt(boxs[i].parentNode.parentNode.cells[2].innerHTML)*parseInt(boxs[i].parentNode.parentNode.cells[3].children[1].innerHTML);
        }
    }
    document.getElementById("m").innerHTML=money;
}
// 显示购物车
function showCar(){
    document.getElementById("section").style.display="none"
    document.getElementById("article").style.display="block";
}
// 显示商店
function showShop(){
    document.getElementById("section").style.display="block"
    document.getElementById("article").style.display="none";
}

// 购物车商品数量累加
function addNumber(obj){
    // previousSibling 对象的前一个节点
   var n= obj.previousSibling.innerHTML;
   obj.previousSibling.innerHTML=parseInt(n)+1;
   pay();
}
function reduceNumber(obj){
    var n=obj.nextElementSibling.innerHTML;
    if(n>1){
        obj.nextElementSibling.innerHTML=parseInt(n)-1;
    }
    pay();
}