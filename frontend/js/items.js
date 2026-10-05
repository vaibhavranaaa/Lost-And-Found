/* =========================================
   ITEMS PAGE
========================================= */


/* =========================================
   GLOBAL VARIABLES
========================================= */

let allItems = [];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const itemsContainer =
    document.getElementById("itemsContainer");

const message =
    document.getElementById("message");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const locationFilter =
    document.getElementById("locationFilter");

const emptyState =
    document.getElementById("emptyState");


/* =========================================
   LOAD ITEMS FROM BACKEND
========================================= */

async function loadItems() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/items"
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load items"
            );

        }


        allItems = await response.json();


        /* Create category dropdown options */

        createCategoryOptions();


        /* Check URL for LOST / FOUND filter */

        applyUrlFilter();


        /* Display items */

        filterItems();


    } catch (error) {

        console.error(error);


        message.textContent =
            "Unable to load items from server.";

    }

}


/* =========================================
   CREATE CATEGORY OPTIONS
========================================= */

function createCategoryOptions() {

    categoryFilter.innerHTML = `
        <option value="ALL">
            All Categories
        </option>
    `;


    const categories = [
        ...new Set(
            allItems
                .map(item => item.category)
                .filter(category => category)
        )
    ];


    categories.sort();


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value = category;

        option.textContent = category;


        categoryFilter.appendChild(option);

    });

}


/* =========================================
   APPLY URL FILTER
=========================================

   Example:

   items.html?type=LOST

   items.html?type=FOUND
========================================= */

function applyUrlFilter() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const type =
        params.get("type");


    if (
        type === "LOST" ||
        type === "FOUND"
    ) {

        typeFilter.value = type;

    }

}


/* =========================================
   DISPLAY ITEMS
========================================= */

function displayItems(items) {

    itemsContainer.innerHTML = "";


    /* Clear previous message */

    message.textContent = "";


    /* =====================================
       NO ITEMS
    ====================================== */

    if (items.length === 0) {

        if (emptyState) {

            emptyState.style.display = "block";

        }

        return;

    }


    /* Hide empty state */

    if (emptyState) {

        emptyState.style.display = "none";

    }


    /* =====================================
       CREATE ITEM CARDS
    ====================================== */

    items.forEach(item => {

        const card =
            document.createElement("article");


        card.className = "item-card";


        /* Get status class */

        const statusClass =
            getStatusClass(item.status);


        /* Get type class */

        const typeClass =
            getTypeClass(item.type);


        card.innerHTML = `

            <!-- Card header -->

            <div class="item-card-header">

                <div class="item-card-icon">
                    📦
                </div>

                <span class="item-status ${statusClass}">
                    ${item.status || "ACTIVE"}
                </span>

            </div>


            <!-- Item name -->

            <h3 class="item-title">
                ${item.itemName}
            </h3>


            <!-- Item type -->

            <span class="item-type ${typeClass}">
                ${item.type}
            </span>


            <!-- Item information -->

            <div class="item-details">

                <div class="item-detail">

                    <span class="detail-icon">
                        📁
                    </span>

                    <div>

                        <small>
                            Category
                        </small>

                        <strong>
                            ${item.category}
                        </strong>

                    </div>

                </div>


                <div class="item-detail">

                    <span class="detail-icon">
                        📍
                    </span>

                    <div>

                        <small>
                            Location
                        </small>

                        <strong>
                            ${item.location}
                        </strong>

                    </div>

                </div>


                <div class="item-detail">

                    <span class="detail-icon">
                        📅
                    </span>

                    <div>

                        <small>
                            Date
                        </small>

                        <strong>
                            ${item.date}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- Description -->

            <p class="item-description">

                ${item.description || "No description provided."}

            </p>


            <!-- Card footer -->

            <div class="item-card-footer">

                <button
                    type="button"
                    class="view-item-btn"
                    onclick="viewItem(${item.id})"
                >
                    View Details
                    <span>→</span>
                </button>

            </div>

        `;


        itemsContainer.appendChild(card);

    });

}


/* =========================================
   GET STATUS CSS CLASS
========================================= */

function getStatusClass(status) {

    if (!status) {

        return "status-active";

    }


    switch (status.toUpperCase()) {

        case "RETURNED":
            return "status-returned";

        case "LOST":
            return "status-lost";

        case "FOUND":
            return "status-found";

        case "CLAIMED":
            return "status-claimed";

        default:
            return "status-active";

    }

}


/* =========================================
   GET TYPE CSS CLASS
========================================= */

function getTypeClass(type) {

    if (!type) {

        return "type-default";

    }


    switch (type.toUpperCase()) {

        case "LOST":
            return "type-lost";

        case "FOUND":
            return "type-found";

        default:
            return "type-default";

    }

}


/* =========================================
   FILTER ITEMS
========================================= */

function filterItems() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const type =
        typeFilter.value;


    const category =
        categoryFilter.value;


    const location =
        locationFilter.value
            .toLowerCase()
            .trim();


    const filteredItems =
        allItems.filter(item => {


            /* Search filter */

            const itemName =
                (item.itemName || "")
                    .toLowerCase();

            const description =
                (item.description || "")
                    .toLowerCase();


            const matchesSearch =
                itemName.includes(search) ||
                description.includes(search);


            /* Type filter */

            const matchesType =
                type === "ALL" ||
                item.type === type;


            /* Category filter */

            const matchesCategory =
                category === "ALL" ||
                item.category === category;


            /* Location filter */

            const itemLocation =
                (item.location || "")
                    .toLowerCase();


            const matchesLocation =
                itemLocation.includes(location);


            return (
                matchesSearch &&
                matchesType &&
                matchesCategory &&
                matchesLocation
            );

        });


    displayItems(filteredItems);

}


/* =========================================
   VIEW ITEM DETAILS
========================================= */

function viewItem(id) {

    window.location.href =
        `item-details.html?id=${id}`;

}


/* =========================================
   SEARCH EVENT
========================================= */

searchInput.addEventListener(
    "input",
    filterItems
);


/* =========================================
   TYPE FILTER EVENT
========================================= */

typeFilter.addEventListener(
    "change",
    filterItems
);


/* =========================================
   CATEGORY FILTER EVENT
========================================= */

categoryFilter.addEventListener(
    "change",
    filterItems
);


/* =========================================
   LOCATION FILTER EVENT
========================================= */

locationFilter.addEventListener(
    "input",
    filterItems
);


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "userId"
            );

            localStorage.removeItem(
                "role"
            );


            window.location.href =
                "index.html";

        }
    );


/* =========================================
   START APPLICATION
========================================= */

loadItems();