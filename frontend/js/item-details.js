// Get page elements
const itemDetails =
    document.getElementById("itemDetails");

const message =
    document.getElementById("message");

const claimSection =
    document.getElementById("claimSection");

const claimBtn =
    document.getElementById("claimBtn");

const claimMessage =
    document.getElementById("claimMessage");

const claimMessageResult =
    document.getElementById("claimMessageResult");


// Get item ID from URL
const params =
    new URLSearchParams(window.location.search);

const itemId =
    params.get("id");


// Get logged-in user information
const userId =
    localStorage.getItem("userId");

const role =
    localStorage.getItem("role");


// Redirect if user is not logged in
if (!userId) {

    window.location.href = "index.html";

}


// Load item
async function loadItem() {

    if (!itemId) {

        message.textContent =
            "Item ID is missing.";

        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/items/${itemId}`
        );


        if (!response.ok) {

            throw new Error("Item not found");

        }


        const item =
            await response.json();


        displayItem(item);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load item.";

    }

}


// Display item details
function displayItem(item) {

    const type =
        (item.type || "UNKNOWN").toLowerCase();

    const status =
        (item.status || "ACTIVE").toLowerCase();


    itemDetails.innerHTML = `

        <div class="details-card-top">

            <div class="details-image">
    ${
        item.imageUrl
            ? `<img src="http://localhost:8080${item.imageUrl}" alt="${item.itemName}">`
            : `<div class="details-icon">📦</div>`
    }
</div>

            <div class="details-badges">

                <span class="details-type ${type}">
                    ${item.type || "UNKNOWN"}
                </span>

                <span class="details-status ${status}">
                    ${item.status || "ACTIVE"}
                </span>

            </div>

        </div>


        <h2 class="details-item-title">
            ${item.itemName}
        </h2>


        <div class="details-information">

            <div class="details-information-item">

                <span class="details-icon">
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


            <div class="details-information-item">

                <span class="details-icon">
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


            <div class="details-information-item">

                <span class="details-icon">
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


        <div class="details-description">

            <h3>
                Description
            </h3>

            <p>
                ${item.description || "No description provided."}
            </p>

        </div>

    `;


    // Hide claim section when item
    // is not active or user is admin
    if (
        item.status !== "ACTIVE" ||
        role === "ADMIN"
    ) {

        claimSection.style.display = "none";

    }

}


// Submit claim
claimBtn.addEventListener(
    "click",
    submitClaim
);


// Submit claim to backend
async function submitClaim() {

    const messageText =
        claimMessage.value.trim();


    if (!messageText) {

        claimMessageResult.textContent =
            "Please enter a message.";

        claimMessageResult.className =
            "claim-result error";

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/claims",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    item: {
                        id: Number(itemId)
                    },

                    user: {
                        id: Number(userId)
                    },

                    message: messageText

                })
            }
        );


        const text =
            await response.text();


        let data;


        try {

            data =
                JSON.parse(text);

        } catch {

            data = {
                message: text
            };

        }


        if (!response.ok) {

            claimMessageResult.textContent =
                data.message ||
                text ||
                "Claim failed.";

            claimMessageResult.className =
                "claim-result error";

            return;

        }


        claimMessageResult.textContent =
            "Claim submitted successfully.";

        claimMessageResult.className =
            "claim-result success";


        claimMessage.value = "";

        claimBtn.disabled = true;

        claimBtn.textContent =
            "Claim Submitted";

    } catch (error) {

        console.error(error);

        claimMessageResult.textContent =
            "Unable to connect to server.";

        claimMessageResult.className =
            "claim-result error";

    }

}


// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");

        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


// Load item when page opens
loadItem();