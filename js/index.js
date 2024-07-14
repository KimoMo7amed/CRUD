
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('proudctCategory');
var productDescraptionInput = document.getElementById('proudctDescraption');
var productImageInput = document.getElementById('productimage');
var productElement = document.getElementById('productElement');
var addProductBotton = document.getElementById('addProductButton');
var updateProductBotton = document.getElementById('updateProductBotton');

var productIndexUpdate;


productList = [];

if(localStorage.getItem("ourProducts")!== null){

  productList = JSON.parse(localStorage.getItem("ourProducts"))
  desplayProduct(productList)
}

function addProduct(){

    var product ={


        productName : productNameInput.value,
        productPrice : productPriceInput.value,
        productCategory : productCategoryInput.value,
        productDescraption : productDescraptionInput.value,
        productImage:productImageInput.files[0].name,

     
    }


    productList.push(product);
    localStorage.setItem("ourProducts" , JSON.stringify(productList))
    desplayProduct(productList)
    resetProductInputs()
   


}




function resetProductInputs(){

    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = 'CHooes Your Category';
    productDescraptionInput.value = null;
    productImageInput.value = null;

}



function desplayProduct(arr){

    var productContent = ``
    for(var i= 0 ; i<arr.length ; i++){

        productContent+= `<div class="col my-4">

        <div class="border shadow-sm p-2 rounded">
          <div class="product-img mb-5 ">
            <img src="./images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
          </div>
          <h3 class="fs-5">${arr[i].productName}</h3>
          <p class="fs-6 text-secondary">${arr[i].productDescraption}</p>
          <p><span class="fw-semibold">Category :</span> ${arr[i].productCategory}</p>
          <div class="d-flex justify-content-between">
            <p class="fw-semibold">${arr[i].productPrice}</p>
          <div class="pe-2">
            <i onclick= "deleteProducts(${i})" class="fa-solid fa-trash-can text-danger "></i>
            <i onclick="showProductIninput(${i})" class="fa-solid fa-pen-to-square text-success"></i>
          </div>
          </div>
        </div>
      </div>`
    }

    productElement.innerHTML = productContent;
}


function deleteProducts(index){

  productList.splice(index,1)
  localStorage.setItem("ourProducts" , JSON.stringify(productList))
  desplayProduct(productList)

}


function searchByName(term){

  var fillteredproduct=[]

  for(var i=0 ; i<productList.length ; i++){

    if(productList[i].productName.toLowerCase().includes(term.toLowerCase())==true){

      fillteredproduct.push( productList[i])

    }
  }
  desplayProduct(fillteredproduct)
}


function showProductIninput(index){
productNameInput.value = productList[index].productName;
productPriceInput.value = productList[index].productPrice;
productDescraptionInput.value = productList[index].productDescraption;
productCategoryInput.value = productList[index].productCategory;

addProductBotton.classList.replace("d-block" , "d-none")
updateProductBotton.classList.replace("d-none" , "d-block")

productIndexUpdate = index;

}

function updateProducts(){

  productList[productIndexUpdate].productName = productNameInput.value;
  productList[productIndexUpdate].productCategory = productCategoryInput.value;
  productList[productIndexUpdate].productPrice = productPriceInput.value;
  productList[productIndexUpdate].productDescraption = productDescraptionInput.value;


  if(productImageInput.files.length !==0){

    productList[productIndexUpdate].productImage = productImageInput.files[0].name
  }


  addProductBotton.classList.replace("d-none" , "d-block")
  updateProductBotton.classList.replace("d-block" , "d-none")
  desplayProduct(productList)
  localStorage.setItem("ourProducts" , JSON.stringify(productList))

  resetProductInputs()

}
















