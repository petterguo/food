function checkImg(data) {
    if(typeof FileReader !== 'undefined'){  
        var file = data.files[0];
        if((file.type).indexOf("image/") === -1){
            showMessage("请上传图片!（格式BMP、JPG、JPEG、PNG )");
            data.value = "";
        }  
    }
    else{ 
        var fileName= data.value;
        var suffixIndex=fileName.lastIndexOf(".");  
        var suffix=fileName.substring(suffixIndex+1).toUpperCase();
        if(suffix!=="BMP"&&suffix!=="JPG"&&suffix!=="JPEG"&&suffix!=="PNG"){  
            showMessage("提示请上传图片（格式BMP、JPG、JPEG、PNG等");
            fileName = "";
        }  
    }  
}

function postForm(){
    let name = document.getElementById("goods_name").value;
    let image = document.getElementById("goods_image").files[0];
    let selectNode = document.getElementById("doc-select-1");
    let selectIndex = selectNode.selectedIndex;
    let label =  selectNode.options[selectIndex].text;
    let price = document.getElementById("goods_price").value;
    let des = document.getElementById("goods_des").value;
    let save = document.getElementById("goods_save").value;
    let arr = [{name: name}, {image: image}, {label: label}, {price: price}, {des: des}, {save: save}];
    let formdata = new FormData();
    for(let i=0;i<arr.length;i++){
        let attr = Object.keys(arr[i])[0];
        if(! arr[i][attr]){
            let temp;
            if(attr === 'name'){
                temp = '商品名称';
            }
            else if(attr === 'image'){
                temp = '商品图片';
            }

            else if(attr === 'price'){
                temp = '商品价格';
            }

            else if(attr === 'save'){
                temp = '商品库存';
            }

            else if(attr === 'label'){
                temp = '商品分类';
            }
            
            else if(attr === 'des'){
                temp = '商品描述';
            }
            showMessage(temp + "不能为空");
            return ;
        }
        else{
            formdata.append(attr,arr[i][attr]);
        }
    }   
    $.ajax({
        url: "/hello",
        data: formdata,
        type: "post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (result) {
            alert("上传完成!");
        },
    })
}

function showMessage( message ){
    $("#showMessage").text(message);
    $('#my-alert').modal('open');
}

function checkType(value, attr,message){
    if( typeof value !== attr){
        throw new Error(message);
        return false;
    }
    else{
        return true;
    }
}