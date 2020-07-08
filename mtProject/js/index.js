var o = document.getElementById("order");
var c = document.getElementById("cart");
var all = document.getElementsByClassName("all");
// 点餐
    // 添加节点
function addFood(n){
        //创建元素
var food = document.createElement("div");
var f_img = document.createElement("img");
var f_ul1 = document.createElement("ul");
var f_name = document.createElement("li");
var f_price = document.createElement("li");
var f_monthlysold = document.createElement("p");
var f_ul2 = document.createElement("ul");
var f_startcost = document.createElement("li");
var f_fee = document.createElement("li");
var f_time = document.createElement("li");
var f_add = document.createElement("p");
        //分配属性
f_img.src = foods[n].Img;
f_name.innerHTML = foods[n].Name;
f_price.innerHTML = foods[n].Price + "元/份";
f_monthlysold.innerHTML = "月销" + foods[n].MonthlySold + "单";
f_startcost.innerHTML = "起送￥" + foods[n].StartCost;
f_fee.innerHTML = "免配送费";
f_time.innerHTML = foods[n].Time + "分钟";
f_add.innerHTML = '<input type="button" value="加入购物车" onclick="addCart('+n+')">';
        //元素封装
f_ul1.appendChild(f_name);
f_ul1.appendChild(f_price);
f_ul2.appendChild(f_startcost);
f_ul2.appendChild(f_fee);
f_ul2.appendChild(f_time);
food.appendChild(f_img);
food.appendChild(f_ul1);
food.appendChild(f_monthlysold);
food.appendChild(f_ul2);
food.appendChild(f_add);
return food;
}
    //调用添加
var l1 = document.getElementById("line1");
var l2 = document.getElementById("line2");
for(var i = 0;i < 4;i++){
    l1.appendChild(addFood(i));
}
for(var i = 4;i < 8;i++){
    l2.appendChild(addFood(i));
}

function cartOn(){
    o.style.display = "none";
    c.style.display = "block";
}
//购物车
var cart_num = document.getElementById("cart_num");
var c_n = 0;
var tab = document.getElementById("tab");
function addCart(n){
    var tr = tab.insertRow(-1);
    var tdcheck = tr.insertCell(0);
    tdcheck.innerHTML = '<input type="checkbox" name="" class="all" onclick="addcheck()">';
    var tdname = tr.insertCell(1);
    tdname.innerHTML = foods[n].Name;
    var tdprice = tr.insertCell(2);
    tdprice.innerHTML = foods[n].Price;
    var tdnum = tr.insertCell(3);
    var a1 = 1;
    tdnum.innerHTML = '<input type="button" value="-" class="dx"><span>' + a1 + '</span><input type="button" value="+" class="ax">';
    var dx = document.getElementsByClassName("dx");
    var ax = document.getElementsByClassName("ax");
    for(var i = 0;i < dx.length;i++){
        dx[i].onclick = function(){
            this.nextSibling.innerHTML = parseInt(this.nextSibling.innerHTML)-1;
        }
        ax[i].onclick = function(){
            this.previousSibling.innerHTML = parseInt(this.previousSibling.innerHTML)+1;
        }
    }
    var tdoper = tr.insertCell(4);
    tdoper.innerHTML = '<input type="button" value="删除" class="delR">';
    var dd = document.getElementsByClassName("delR");
    for(var i = 0;i < dd.length;i++){
        dd[i].onclick = function(){
            var flag = confirm("确定要删除吗？")
            if(flag){
                deleteRow(this);
                c_n--;
                cart_num.innerHTML = c_n;
                addcheck();
            }
        }
    }
    c_n++;
    cart_num.innerHTML = c_n;
    alert("加入购物车成功！");
}

function deleteRow(r){
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tab").deleteRow(i);
}

function slcAll(checkbox){
    for(var i = 0;i < all.length;i++){
        all[i].checked = checkbox.checked;
    }
    addcheck();    
}

function delslc(){
    var flag = confirm("确定要删除购物车中所有选中的订单吗?");
    if(flag){
        for(var i = all.length - 1;i >= 0;i--){
            if(all[i].checked){
                deleteRow(all[i]);
                c_n--;
                cart_num.innerHTML = c_n;
            }
        }
        alert("删除成功！");
        addcheck();
    }
}

function addcheck(){
    var bill = document.getElementById("total");
    bill.innerHTML = totalbill();
}

function totalbill(){
    var y = document.getElementById("sa");
    var total = 0;
    var flag = [];
    for(var i = 0;i < all.length;i++){
        if(all[i].checked){
            total += Number(all[i].parentNode.nextSibling.nextSibling.innerText) * Number(all[i].parentNode.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerText);
            flag[i] = true;
        }
        else{
            flag[i] = false;
        }
    }
    y.checked = true;
    for(var j = 0;j < flag.length;j++){
        if(flag[j] == false){
            y.checked = false;
            break;
        }
    }
    return total;
}

function buy(){
    addcheck();
    alert("总共付款" + totalbill() + "元");
    for(var i = all.length - 1;i >= 0;i--){
        if(all[i].checked){
            deleteRow(all[i]);
            c_n--;
            cart_num.innerHTML = c_n;
        }
    }
    addcheck();
}

function cartOff(){
    c.style.display = "none";
    o.style.display = "block";
}