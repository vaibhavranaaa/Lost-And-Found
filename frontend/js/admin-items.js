const itemsContainer =
    document.getElementById("itemsContainer");

const message =
    document.getElementById("message");

const emptyState =
    document.getElementById("adminItemsEmptyState");

const role =
    localStorage.getItem("role");


/* =========================================
   ADMIN AUTHORIZATION
   ========================================= */

if (role !== "ADMIN") {

    window.location.href = "index.html";

}


/* =========================================
   LOAD ITEMS
   ========================================= */

async function loadItems() {

    try {

        message.textContent = "";

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

        message.style.color = "#dc2626";

    }

}


/* =========================================
   DISPLAY ITEMS
   ========================================= */

function displayItems(items) {

    itemsContainer.innerHTML = "";

    if (emptyState) {
        emptyState.style.display = "none";
    }


    if (!items || items.length === 0) {

        if (emptyState) {

            emptyState.style.display = "block";

        } else {

            itemsContainer.innerHTML = `
                <p>No items found.</p>
            `;

        }

        return;

    }


    items.forEach(function (item) {

        const card =
            document.createElement("article");

        card.className = "admin-item-card";


        /* -----------------------------------------
           Item type
           ----------------------------------------- */

        const type =
            (item.type || "UNKNOWN").toLowerCase();

        const status =
            (item.status || "ACTIVE").toLowerCase();


        let typeClass = "";

        if (type === "lost") {
            typeClass = "lost";
        }

        if (type === "found") {
            typeClass = "found";
        }


        /* -----------------------------------------
           Action buttons
           ----------------------------------------- */

        let actions = "";


        if (item.status === "ACTIVE") {

            actions = `

                <button
                    type="button"
                    class="admin-item-action resolve-action"
                    onclick="resolveItem(${item.id})">

                    ✓ Mark Resolved

                </button>

                <button
                    type="button"
                    class="admin-item-delete"
                    onclick="deleteItem(${item.id})">

                    Delete

                </button>

            `;

        } else {

            actions = `

                <button
                    type="button"
                    class="admin-item-delete"
                    onclick="deleteItem(${item.id})">

                    Delete

                </button>

            `;

        }


        /* -----------------------------------------
           Card HTML
           ----------------------------------------- */

        card.innerHTML = `

            <div class="admin-item-card-header">

                <div class="admin-item-icon">
                    📦
                </div>

                <span class="admin-item-type ${typeClass}">
                    ${item.type || "UNKNOWN"}
                </span>

            </div>


            <h3 class="admin-item-title">
                ${item.itemName || "Unnamed Item"}
            </h3>


            <div class="admin-item-details">

                <div class="admin-item-detail">

                    <div class="admin-item-detail-icon">
                        🆔
                    </div>

                    <div class="admin-item-detail-content">

                        <small>Item ID</small>

                        <strong>
                            #${item.id}
                        </strong>

                    </div>

                </div>


                <div class="admin-item-detail">

                    <div class="admin-item-detail-icon">
                        📁
                    </div>

                    <div class="admin-item-detail-content">

                        <small>Category</small>

                        <strong>
                            ${item.category || "Not specified"}
                        </strong>

                    </div>

                </div>


                <div class="admin-item-detail">

                    <div class="admin-item-detail-icon">
                        📍
                    </div>

                    <div class="admin-item-detail-content">

                        <small>Location</small>

                        <strong>
                            ${item.location || "Not specified"}
                        </strong>

                    </div>

                </div>


                <div class="admin-item-detail">

                    <div class="admin-item-detail-icon">
                        📅
                    </div>

                    <div class="admin-item-detail-content">

                        <small>Date</small>

                        <strong>
                            ${item.date || "Not specified"}
                        </strong>

                    </div>

                </div>


                <div class="admin-item-detail">

                    <div class="admin-item-detail-icon">
                        👤
                    </div>

                    <div class="admin-item-detail-content">

                        <small>Reported By</small>

                        <strong>
                            User #${item.userId || "N/A"}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="admin-item-description">

                <strong>Description</strong>

                <p>
                    ${item.description || "No description provided."}
                </p>

            </div>


            <div class="admin-item-card-footer">

                <span class="admin-item-status ${status}">
                    ${item.status || "ACTIVE"}
                </span>


                <div class="admin-item-actions">

                    ${actions}

                </div>

            </div>

        `;


        itemsContainer.appendChild(card);

    });

}


/* =========================================
   RESOLVE ITEM
   ========================================= */

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


/* =========================================
   DELETE ITEM
   ========================================= */

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


/* =========================================
   LOGOUT
   ========================================= */

document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");

        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


/* =========================================
   INITIAL LOAD
   ========================================= */

loadItems();