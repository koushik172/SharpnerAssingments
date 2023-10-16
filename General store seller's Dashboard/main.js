let addButton = document.getElementById("addItem");
let itemList = document.getElementById("itemList");

itemList.addEventListener("click", sellItem);

addButton.addEventListener("click", () => {
  let itemName = document.getElementById("itemName").value;
  let itemDescription = document.getElementById("itemDescription").value;
  let itemPrice = document.getElementById("itemPrice").value;
  let itemQuantity = document.getElementById("itemQuantity").value;

  let obj = {
    itemName: itemName,
    itemDescription: itemDescription,
    itemPrice: itemPrice,
    itemQuantity,
  };

  axios
    .post(
      "https://crudcrud.com/api/b46143a747d147569e8d1f11a89c8ea2/Items",
      //   "https://reqres.in/api/users",
      obj
    )
    .then((res) => {
      let newLi = document.createElement("li");
      newLi.name = obj.itemName;
      newLi.id = res.data._id;
      newLi.className = "flex justify-around items-center gap-16 mx-[20%] my-2";

      newLi.innerHTML = `<p>${obj.itemName} - ${obj.itemDescription} - ${obj.itemPrice} - ${obj.itemQuantity}</p>
    <div class="flex gap-16">
      <button id="1" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 1</button>
      <button id="2" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 2</button>
      <button id="3" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 3</button>
    </div>`;

      itemList.appendChild(newLi);

      document.getElementById("itemName").value = "";
      document.getElementById("itemDescription").value = "";
      document.getElementById("itemPrice").value = "";
      document.getElementById("itemQuantity").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
});

function sellItem(e) {
  if (e.target.classList.contains("sell")) {
    let sellCount = e.target.id;
    let itemId = e.target.parentElement.parentElement.id;
    let stock =
      e.target.parentElement.parentElement.firstChild.textContent.split(" - ");

    console.log(itemId);

    let newObj = {
      itemName: stock[0],
      itemDescription: stock[1],
      itemPrice: stock[2],
      itemQuantity: stock[3] - sellCount,
    };
    axios
      .put(
        `https://crudcrud.com/api/b46143a747d147569e8d1f11a89c8ea2/Items/${itemId}`,
        newObj
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err, "here", itemId);
      });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/b46143a747d147569e8d1f11a89c8ea2/Items")
    .then((res) => {
      let data = res.data;
      data.forEach((obj) => {
        let newLi = document.createElement("li");
        newLi.name = obj.itemName;
        newLi.id = obj._id;
        newLi.className =
          "flex justify-around items-center gap-16 mx-[20%] my-2";

        newLi.innerHTML = `<p>${obj.itemName} - ${obj.itemDescription} - ${obj.itemPrice} - ${obj.itemQuantity}</p>
    <div class="flex gap-16">
      <button id="1" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 1</button>
      <button id="2" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 2</button>
      <button id="3" class="bg-green-200 rounded-2xl px-4 py-2 sell">Buy 3</button>
    </div>`;

        itemList.appendChild(newLi);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
