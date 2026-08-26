const itemsContainer =
    document.getElementById("itemsContainer");

const message =
    document.getElementById("message");

const role =
    localStorage.getItem("role");


if (role !== "ADMIN") {

    window.location.href = "index.html";

}


async function loadItems() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/items"
        );


        if (!response.ok) {

            throw new Error("Failed to load items");

        }


        const items = await response.json();

        displayItems(items);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load items.";

    }

}


function displayItems(items) {

    itemsContainer.innerHTML = "";


    if (items.length === 0) {

        itemsContainer.innerHTML =
            "<p>No items found.</p>";

        return;

    }


    items.forEach(function (item) {

        const card =
            document.createElement("div");

        card.className = "admin-item-card";


        let actions = "";


        if (item.status === "ACTIVE") {

            actions = `

                <button
                    onclick="resolveItem(${item.id})">
                    Mark Resolved
                </button>

                <button
                    onclick="deleteItem(${item.id})">
                    Delete
                </button>

            `;

        } else {

            actions = `

                <button
                    onclick="deleteItem(${item.id})">
                    Delete
                </button>

            `;

        }


        card.innerHTML = `

            <h3>${item.itemName}</h3>

            <p>
                <strong>ID:</strong>
                ${item.id}
            </p>

            <p>
                <strong>Category:</strong>
                ${item.category}
            </p>

            <p>
                <strong>Description:</strong>
                ${item.description}
            </p>

            <p>
                <strong>Location:</strong>
                ${item.location}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>Type:</strong>
                ${item.type}
            </p>

            <p>
                <strong>User ID:</strong>
                ${item.userId}
            </p>

            <p>
                <strong>Status:</strong>

                <span class="item-status ${item.status.toLowerCase()}">
                    ${item.status}
                </span>

            </p>

            <div class="item-actions">
                ${actions}
            </div>

        `;


        itemsContainer.appendChild(card);

    });

}


async function resolveItem(itemId) {

    const confirmed =
        confirm("Mark this item as resolved?");

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/items/${itemId}/resolve`,
            {
                method: "PUT"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to resolve item"
            );

        }


        alert("Item marked as resolved.");

        loadItems();


    } catch (error) {

        console.error(error);

        alert("Unable to resolve item.");

    }

}


async function deleteItem(itemId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this item?"
        );

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/items/${itemId}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to delete item"
            );

        }


        alert("Item deleted successfully.");

        loadItems();


    } catch (error) {

        console.error(error);

        alert("Unable to delete item.");

    }

}


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");

        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


loadItems();