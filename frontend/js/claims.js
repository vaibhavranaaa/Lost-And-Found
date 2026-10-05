// Get page elements
const claimsContainer =
    document.getElementById("claimsContainer");

const message =
    document.getElementById("message");

const emptyState =
    document.getElementById("claimsEmptyState");


// Get logged-in user information
const userId =
    localStorage.getItem("userId");

const role =
    localStorage.getItem("role");


// Check user authentication
if (!userId || role !== "USER") {

    window.location.href = "index.html";

}


// Load user's claims
async function loadClaims() {

    try {

        const response = await fetch(
            `http://localhost:8080/api/claims/user/${userId}`
        );


        if (!response.ok) {

            throw new Error("Failed to load claims");

        }


        const claims = await response.json();

        displayClaims(claims);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load your claims.";

        message.className =
            "claims-message error";

    }

}


// Get item information
async function getItem(itemId) {

    try {

        const response = await fetch(
            `http://localhost:8080/api/items/${itemId}`
        );


        if (!response.ok) {

            return null;

        }


        return await response.json();


    } catch (error) {

        console.error(error);

        return null;

    }

}


// Display claims
async function displayClaims(claims) {

    claimsContainer.innerHTML = "";

    message.textContent = "";


    // No claims
    if (claims.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    // Claims available
    emptyState.style.display = "none";


    for (const claim of claims) {

        const item = await getItem(claim.itemId);


        const card =
            document.createElement("article");

        card.className = "claim-card";


        // Convert status to CSS class
        const status =
            (claim.status || "PENDING").toLowerCase();


        card.innerHTML = `

            <div class="claim-card-top">

                <div class="claim-icon">
                    📦
                </div>

                <span class="claim-status ${status}">
                    ${claim.status || "PENDING"}
                </span>

            </div>


            <h3 class="claim-title">
                ${item ? item.itemName : "Unknown Item"}
            </h3>


            <div class="claim-item-id">
                Item ID: #${claim.itemId}
            </div>


            <div class="claim-message-box">

                <span class="claim-label">
                    Your Message
                </span>

                <p>
                    ${claim.message || "No message provided."}
                </p>

            </div>


            <div class="claim-card-footer">

                <button
                    type="button"
                    class="view-claim-btn"
                    onclick="viewItem(${claim.itemId})">

                    View Item

                    <span>→</span>

                </button>

            </div>

        `;


        claimsContainer.appendChild(card);

    }

}


// View claimed item
function viewItem(itemId) {

    window.location.href =
        `item-details.html?id=${itemId}`;

}


// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");

        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


// Load claims when page opens
loadClaims();