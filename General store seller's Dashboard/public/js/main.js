let addButton = document.getElementById("addItem");
let itemList = document.getElementById("itemList");

// FUNCTION TO LIST NEW ITEMS
addButton.addEventListener("click", () => {
	let errorCheck = false;

	let itemName = document.getElementById("itemName").value;
	let itemDescription = document.getElementById("itemDescription").value;
	let itemPrice = parseInt(document.getElementById("itemPrice").value);
	let itemQuantity = parseInt(document.getElementById("itemQuantity").value);

	if (itemName === "") errorCheck = true;
	if (itemDescription === "") errorCheck = true;
	if (isNaN(itemPrice)) errorCheck = true;
	if (isNaN(itemQuantity)) errorCheck = true;

	let obj = {
		itemName: itemName,
		itemDescription: itemDescription,
		itemPrice: itemPrice,
		itemQuantity,
	};
	if (errorCheck) {
		alert("Enter values correctly !!!");
	} else {
		axios
			.post(`http://localhost:3000/addProduct`, obj)
			.then((res) => {
				let newLi = document.createElement("li");
				newLi.name = obj.itemName;
				newLi.id = res.data.id;
				newLi.className = "items-center gap-16 mx-[10%] my-2";

				newLi.innerHTML = `
			  <form class="flex justify-between items-center" >

			    <p class="w-1/2 text-slate-100">${obj.itemName} - ${obj.itemDescription} - ${obj.itemPrice} - ${obj.itemQuantity}</p>
			    <div class="flex gap-10 w-fit items-center text-sm">

			    <div class="flex gap-2">

			      <input id="sell" placeholder="SELL" class="bg-slate-200 p-2 rounded-md text-center w-16" type="number">
			      <button class="bg-slate-300 hover:bg-green-800 hover:text-slate-200 transition-all rounded-md px-4 py-2 sell">SELL</button>

			      <input placeholder="ADD" class="bg-slate-200 p-2 rounded-md text-center w-16 ml-8">
			      <button class="bg-slate-300 hover:bg-blue-700 hover:text-slate-200 transition-all rounded-md px-4 py-2 add">ADD STOCK</button>

			    </div>
			    <div class="gap-6">

			      <button class="bg-slate-300 hover:bg-yellow-600 hover:text-slate-200 transition-all rounded-md px-4 py-2 edit">EDIT</button>
			      <button class="bg-slate-300 hover:bg-red-800 hover:text-slate-200 transition-all rounded-md px-4 py-2 delete">DELETE</button>

			    </div>

			    </div>
			  </form>`;

				itemList.appendChild(newLi);

				document.getElementById("itemName").value = "";
				document.getElementById("itemDescription").value = "";
				document.getElementById("itemPrice").value = "";
				document.getElementById("itemQuantity").value = "";
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

// FUNCTION TO SELL ITEMS
itemList.addEventListener("click", async (e) => {
	e.preventDefault();
	if (e.target.classList.contains("sell")) {
		let requiredQuantity = e.target.previousElementSibling.value;
		requiredQuantity = parseInt(requiredQuantity);
		if (isNaN(requiredQuantity)) {
			alert("Enter a number");
		} else {
			let itemId = e.target.closest("li").id;
			let parentForm = e.target.closest("form");
			let itemText = parentForm.querySelector("p");
			let itemDetails = itemText.textContent.split(" - ");
			let availableQuantity = parseInt(itemDetails[3]);
			let newQuantity = availableQuantity - requiredQuantity;
			if (newQuantity < 0) {
				alert("Not enough stock available");
			} else {
				try {
					let obj = {
						itemName: itemDetails[0],
						itemDescription: itemDetails[1],
						itemPrice: itemDetails[2],
						itemQuantity: newQuantity,
					};
					await axios.patch(
						`http://localhost:3000/sellProduct/${itemId}`,
						obj
					);
					itemDetails[3] = newQuantity.toString();
					itemText.textContent = itemDetails.join(" - ");
					e.target.previousElementSibling.value = "";
				} catch (err) {
					console.log(err, "here");
					alert("ERROR! CHECK LOG");
				}
			}
		}
	}
});

// FUNCTION TO ADD STOCK
itemList.addEventListener("click", async (e) => {
	e.preventDefault();
	if (e.target.classList.contains("add")) {
		let requiredQuantity = e.target.previousElementSibling.value;
		requiredQuantity = parseInt(requiredQuantity);
		if (isNaN(requiredQuantity)) {
			alert("Enter a number");
		} else {
			let itemId = e.target.closest("li").id;
			let parentForm = e.target.closest("form");
			let itemText = parentForm.querySelector("p");
			let itemDetails = itemText.textContent.split(" - ");
			let availableQuantity = parseInt(itemDetails[3]);
			let newQuantity = availableQuantity + requiredQuantity;

			try {
				let obj = {
					itemName: itemDetails[0],
					itemDescription: itemDetails[1],
					itemPrice: itemDetails[2],
					itemQuantity: newQuantity,
				};
				await axios.patch(
					`http://localhost:3000/addStock/${itemId}`,
					obj
				);
				itemDetails[3] = newQuantity.toString();
				itemText.textContent = itemDetails.join(" - ");
				e.target.previousElementSibling.value = "";
			} catch (err) {
				console.log(err, "here");
				alert("ERROR! CHECK LOG");
			}
		}
	}
});

// FUNCTION TO EDIT ITEMS
itemList.addEventListener("click", async (e) => {
	e.preventDefault();
	if (e.target.classList.contains("edit")) {
		let itemId = e.target.closest("li").id;
		let parentForm = e.target.closest("form");
		let itemText = parentForm.querySelector("p");
		let itemDetails = itemText.textContent.split(" - ");

		document.getElementById("itemName").value = itemDetails[0];
		document.getElementById("itemDescription").value = itemDetails[1];
		document.getElementById("itemPrice").value = itemDetails[2];
		document.getElementById("itemQuantity").value = itemDetails[3];

		try {
			axios.delete(`http://localhost:3000/deleteProduct/${itemId}`);
			itemList.removeChild(e.target.closest("li"));
		} catch (err) {
			alert("ERROR! CHECK LOGS");
			console.log(err);
		}
	}
});

// FUNCTION TO DELETE ITEMS
itemList.addEventListener("click", async (e) => {
	e.preventDefault();
	if (e.target.classList.contains("delete")) {
		let itemId = e.target.closest("li").id;

		try {
			axios.delete(`http://localhost:3000/deleteProduct/${itemId}`);
			itemList.removeChild(e.target.closest("li"));
		} catch (err) {
			alert("ERROR! CHECK LOGS");
			console.log(err);
		}
	}
});

// USED TO LOAD ALL THE ITEMS ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
	axios
		.get(`http://localhost:3000/getProducts`)
		.then((res) => {
			let data = res.data;
			data.forEach((obj) => {
				let newLi = document.createElement("li");
				newLi.name = obj.name;
				newLi.id = obj.id;
				newLi.className = "items-center gap-16 mx-[10%] my-2 transition-all p-2 rounded-md hover:bg-gray-800";

				newLi.innerHTML = `
		    <form class="flex justify-between items-center" >

		      <p class="w-1/2 text-slate-100">${obj.name} - ${obj.description} - ${obj.price} - ${obj.quantity}</p>
		      <div class="flex gap-10 w-fit items-center text-sm">

		      <div class="flex gap-2">

		        <input id="sell" placeholder="SELL" class="bg-slate-200 p-2 rounded-md text-center w-16" type="number">
		        <button class="bg-slate-300 hover:bg-green-800 hover:text-slate-200 transition-all rounded-md px-4 py-2 sell">SELL</button>

		        <input placeholder="ADD" class="bg-slate-200 p-2 rounded-md text-center w-16 ml-8">
		        <button class="bg-slate-300 hover:bg-blue-700 hover:text-slate-200 transition-all rounded-md px-4 py-2 add">ADD STOCK</button>

		      </div>
		      <div class="gap-6">

		        <button class="bg-slate-300 hover:bg-yellow-600 hover:text-slate-200 transition-all rounded-md px-4 py-2 edit">EDIT</button>
		        <button class="bg-slate-300 hover:bg-red-800 hover:text-slate-200 transition-all rounded-md px-4 py-2 delete">DELETE</button>

		      </div>

		      </div>
		    </form>`;

				itemList.appendChild(newLi);
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
