let allItems = [];

const itemsContainer = document.getElementById("itemsContainer");
const message = document.getElementById("message");

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");

async function loadItems() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/items"
        );

        if (!response.ok) {
            throw new Error("Failed to load items");
        }

        allItems = await response.json();

        createCategoryOptions();

        displayItems(allItems);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load items from server.";
    }
}


function createCategoryOptions() {

    const categories = [
        ...new Set(
            allItems.map(item => item.category)
        )
    ];

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


function displayItems(items) {

    itemsContainer.innerHTML = "";

    if (items.length === 0) {

        itemsContainer.innerHTML =
            "<p>No items found.</p>";

        return;
    }


    items.forEach(item => {

        const card = document.createElement("div");

        card.className = "item-card";

        card.innerHTML = `
            <h3>${item.itemName}</h3>

            <p>
                <strong>Category:</strong>
                ${item.category}
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
                <strong>Status:</strong>
                ${item.status}
            </p>

            <p>
                ${item.description}
            </p>

            <button onclick="viewItem(${item.id})">
                View Details
            </button>
        `;

        itemsContainer.appendChild(card);
    });
}


function filterItems() {

    const search =
        searchInput.value.toLowerCase().trim();

    const type =
        typeFilter.value;

    const category =
        categoryFilter.value;

    const location =
        locationFilter.value.toLowerCase().trim();


    const filteredItems = allItems.filter(item => {

        const matchesSearch =
            item.itemName.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

        const matchesType =
            type === "ALL" ||
            item.type === type;

        const matchesCategory =
            category === "ALL" ||
            item.category === category;

        const matchesLocation =
            item.location.toLowerCase().includes(location);

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesLocation
        );
    });


    displayItems(filteredItems);
}


function viewItem(id) {

    window.location.href =
        `item-details.html?id=${id}`;
}


searchInput.addEventListener(
    "input",
    filterItems
);

typeFilter.addEventListener(
    "change",
    filterItems
);

categoryFilter.addEventListener(
    "change",
    filterItems
);

locationFilter.addEventListener(
    "input",
    filterItems
);


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";
    });


loadItems();