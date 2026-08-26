const claimsContainer =
    document.getElementById("claimsContainer");

const message =
    document.getElementById("message");

const userId =
    localStorage.getItem("userId");

const role =
    localStorage.getItem("role");


if (!userId || role !== "USER") {

    window.location.href = "index.html";

}


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

    }

}


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


async function displayClaims(claims) {

    claimsContainer.innerHTML = "";

    if (claims.length === 0) {

        claimsContainer.innerHTML =
            "<p>You have not submitted any claims yet.</p>";

        return;

    }


    for (const claim of claims) {

        const item = await getItem(claim.itemId);

        const card =
            document.createElement("div");

        card.className = "claim-card";


        card.innerHTML = `

            <h3>
                ${item ? item.itemName : "Unknown Item"}
            </h3>

            <p>
                <strong>Item ID:</strong>
                ${claim.itemId}
            </p>

            <p>
                <strong>Your Message:</strong>
                ${claim.message}
            </p>

            <p>
                <strong>Status:</strong>
                <span class="claim-status ${claim.status.toLowerCase()}">
                    ${claim.status}
                </span>
            </p>

            <button
                onclick="viewItem(${claim.itemId})">
                View Item
            </button>

        `;


        claimsContainer.appendChild(card);

    }

}


function viewItem(itemId) {

    window.location.href =
        `item-details.html?id=${itemId}`;

}


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


loadClaims();