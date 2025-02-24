const limit = 4;

const getProducts = async () => {
  const { data } = await axios.get(`https://fakestoreapi.com/products`);
  return data;
};
const pages = async (page = 2) => {
  const data = await getProducts();
  const skip = (page - 1) * limit;
  let products = ``;
  for (let i = skip; i < skip + limit; i++) {
    products += `
        <div class="product">
            <img src="${data[i].image} " class="productImg" >
            <h1>${data[i].category}</h1>
        </div>
        `;
  }
  document.querySelector(".products").innerHTML = products;
  const numberOfPages = Math.ceil(data.length / limit);
  let num = ``;
  if (page > 1) {
    num = ` <button onclick = pages(${page - 1}) > &lt; </button>	`;
  } else {
    num = ` <button disabled > &lt; </button>	`;
  }
  for (let i = 1; i <= numberOfPages; i++) {
    num += `<button onclick = pages(${i}) > ${i} </button>`;
  }
  if (page >= numberOfPages) {
    num += `<button disabled > &gt; </button>`;
  } else {
    num += `<button onclick = pages(${page + 1}) > &gt; </button>`;
  }

  document.querySelector(".pagination").innerHTML = num;

  document.querySelectorAll(".productImg").forEach((img) => {
    img.addEventListener("click", (e) => {
      //console.log("mariana test function"); // =================== 1 ==================
      customModal();
    });
  });
};
pages();

const getCategories = async () => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/categories`
  );
  const displayData = data
    .map(
      (e) =>
        `
        <li>${e}</li>
        `
    )
    .join("");
  // push data
  document.querySelector("nav .categories ul").innerHTML = displayData;
  const categories = document.querySelectorAll("nav .categories ul li");
  categories.forEach(function (ele) {
    ele.addEventListener("click", (e) => {
      const name = e.target.innerHTML;
      displayCategories(1, name);
    });
  });
};
getCategories();

const buttonCategories = document.querySelector(".categories button");
buttonCategories.addEventListener("click", function () {
  document.querySelector(".categories ul").classList.toggle("d-n");
});

const displayCategories = async (page = 1, name) => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/category/${name}`
  );
  document.querySelector("body > h1 ").textContent = name;
  const skip = (page - 1) * limit;
  let products = ``;
  for (let i = skip; i < skip + limit; i++) {
    products += `
        <div class="product">
            <img src="${data[i].image}" alt="">
            <h1>${data[i].category}</h1>
        </div>
        `;
  }

  document.querySelector(".products").innerHTML = products;
  const imgs = document.querySelectorAll(".productImg");
  console.log("imgs", imgs);
  const numberOfPages = Math.ceil(data.length / limit);
  let num = ``;
  if (page > 1) {
    num = ` <button onclick = pages(${page - 1}) > &lt; </button>	`;
  } else {
    num = ` <button disabled > &lt; </button>	`;
  }
  for (let i = 1; i <= numberOfPages; i++) {
    num += `<button onclick = pages(${i}) > ${i} </button>`;
  }
  if (page >= numberOfPages) {
    num += `<button disabled > &gt; </button>`;
  } else {
    num += `<button onclick = pages(${page + 1}) > &gt; </button>`;
  }

  document.querySelector(".pagination").innerHTML = num;
};

function customModal() {
  const modal = document.querySelector(".my-modal");
  const leftA = document.querySelector(".l-a");
  const rightA = document.querySelector(".r-a");
  const closeB = document.querySelector(".c-b");

  const imgs = document.querySelectorAll(".productImg");// =================== 2 ==================
  let index = 0;
  imgs.forEach(function (img) {
    img.addEventListener("click", (e) => {
      modal.classList.remove("d-n");
      index = imgs.indexOf(e.target);
      modal.querySelector("img").setAttribute("src", e.target.src);
    });
  });

  closeB.addEventListener("click", (e) => {
    modal.classList.add("d-n");
  });

  rightA.addEventListener("click", (e) => {
    index++;
    if (index >= imgs.length) {
      index = 0;
    }
    modal.querySelector("img").setAttribute("src", imgs[index].src);
  });

  leftA.addEventListener("click", (e) => {
    index--;
    if (index < 0) {
      index = imgs.length - 1;
    }
    modal.querySelector("img").setAttribute("src", imgs[index].src);
  });

  document.addEventListener("keydown", (e) => {
    console.log(e.code);
    if (e.code == "ArrowRight") {
      index++;
      if (index >= imgs.length) {
        index = 0;
      }
      modal.querySelector("img").setAttribute("src", imgs[index].src);
    } else if (e.code == "ArrowLeft") {
      index--;
      if (index < 0) {
        index = imgs.length - 1;
      }
      modal.querySelector("img").setAttribute("src", imgs[index].src);
    } else if ((e.code = "Escape")) {
      modal.classList.add("d-n");
    }
  });
}
