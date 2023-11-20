var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
// Edit event
itemList.addEventListener("click", editItem);

// Add item
function addItem(e) {
	e.preventDefault();

	// Get input value
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;

	// Create new li element
	var li = document.createElement("li");
	// Add class
	li.className = "list-group-item";
	li.name = name;
	// Add text node with input value
	li.appendChild(
		document.createTextNode(name + " - " + email + " - " + phone)
	);
	let obj = { name: name, email: email, phone: phone };

	axios
		.post("http://localhost:3000/addAppointments", obj)
		.then((res) => {
			location.reload();
		})
		.catch((err) => console.log(err));
}

// Remove item
function removeItem(e) {
	if (e.target.classList.contains("delete")) {
		if (confirm("Are You Sure?")) {
			var li = e.target.parentElement;
			axios
				.delete(`http://localhost:3000/deleteAppointments/${li.id}`)
				.then((res) => {
					location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
			location.reload();
		}
	}
}

// Filter Items
function filterItems(e) {
	// convert text to lowercase
	var text = e.target.value.toLowerCase();
	// Get lis
	var items = itemList.getElementsByTagName("li");
	// Convert to an array
	Array.from(items).forEach(function (item) {
		var itemName = item.firstChild.textContent;
		if (itemName.toLowerCase().indexOf(text) != -1) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}

// Edit Items
function editItem(e) {
	if (e.target.classList.contains("edit")) {
		if (confirm("Are You Sure?")) {
			var li = e.target.parentElement;
			let data = li.textContent;
			data = data.split(" - ");
			console.log(data);
			document.getElementById("name").value = data[0];
			document.getElementById("email").value = data[1];
			document.getElementById("phone").value = data[2];
			itemList.removeChild(li);
			axios
				.delete(`http://localhost:3000/deleteAppointments/${li.id}`)
				.then((res) => {
					itemList.removeChild(li);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
}

window.addEventListener("DOMContentLoaded", function () {
	axios
		.get("http://localhost:3000/getAppointments")
		.then((res) => {
			let data = res.data; // For crud crud
			// let data = res.data.data; // For reqres
			data.forEach((item) => {
				var li = document.createElement("li");

				li.className = "";
				li.id = item.id;

				li.appendChild(
					document.createTextNode(
						item.name +
							" - " +
							item.email +
							" - " +
							item.number +
							""
					)
				);

				var deleteBtn = document.createElement("button");
				var editBtn = document.createElement("button");

				deleteBtn.className =
					"btn btn-danger btn-sm float-right delete ms-5";
				editBtn.className =
					"btn btn-primary btn-sm float-right edit ms-2";

				deleteBtn.appendChild(document.createTextNode("🗑️"));
				editBtn.appendChild(document.createTextNode("✏️"));

				li.appendChild(deleteBtn);
				li.appendChild(editBtn);

				itemList.appendChild(li);
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
