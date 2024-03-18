async function sourchProdutcs() {
  const apiRespone = await fetch("https://fakestoreapi.com/products");

  if (apiRespone.ok) {
    return await apiRespone.json();
  } else {
    throw new Error("API request error");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  let filter;
  let sortBy;

  const productList = await sourchProdutcs();
  showProductsList(productList);

  const categoryFilter = document.getElementById("category");

  categoryFilter.addEventListener("change", function () {
    filter = this.value;
    filterAndSortList(productList, filter, sortBy);
  });

  const sortPrice = document.getElementById("price-sort");
  sortPrice.addEventListener("change", function () {
    sortBy = this.value;
    filterAndSortList(productList, filter, sortBy);
  });
});

function showProdutcsScreen(product) {
  const productsection = document.getElementById("list-products");
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `<img class="image" src=${product.image} alt="" />
  <h3 class="title" >${product.title}</h3>
  <p class="description">${product.description}</p>
  <p class="description">${product.category}</p>
  <p class="price">${product.price}</p>
  <button class="button" >Buy</button>`;

  console.log(product);

  productsection.append(div);
}

function filterAndSortList(productList, filter, sortBy) {
  let productToShow = productList;
  if (filter) {
    productToShow = productToShow.filter(function (product) {
      if (product.category == filter) {
        return true;
      }
    });
  }

  if (sortBy) {
    productToShow = productToShow.sort(function (productA, productB) {
      return productA.price - productB.price;
    });

    if (sortBy == "desc") {
      productToShow = productToShow.reverse();
    }
  }

  showProductsList(productToShow);
}

function showProductsList(productList) {
  const productsection = document.getElementById("list-products");
  productsection.innerHTML = "";
  for (let product = 0; product < productList.length; product++) {
    showProdutcsScreen(productList[product]);
  }
}
