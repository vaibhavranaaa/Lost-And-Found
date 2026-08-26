const claimsContainer =
    document.getElementById("claimsContainer");

const message =
    document.getElementById("message");

const role =
    localStorage.getItem("role");


if (role !== "ADMIN") {

    window.location.href = "index.html";

}


async function loadClaims() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/claims"
        );


        if (!response.ok) {

            throw new Error("Failed to load claims");

        }


        const claims = await response.json();

        displayClaims(claims);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load claims.";

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
            "<p>No claims found.</p>";

        return;

    }


    for (const claim of claims) {

        const item =
            await getItem(claim.itemId);


        const card =
            document.createElement("div");

        card.className = "admin-claim-card";


        let buttons = "";


        if (claim.status === "PENDING") {

            buttons = `

                <button
                    onclick="acceptClaim(${claim.id})">
                    Accept
                </button>

                <button
                    onclick="rejectClaim(${claim.id})">
                    Reject
                </button>

            `;

        }


        card.innerHTML = `

            <h3>
                ${item ? item.itemName : "Unknown Item"}
            </h3>

            <p>
                <strong>Claim ID:</strong>
                ${claim.id}
            </p>

            <p>
                <strong>Item ID:</strong>
                ${claim.itemId}
            </p>

            <p>
                <strong>User ID:</strong>
                ${claim.userId}
            </p>

            <p>
                <strong>Message:</strong>
                ${claim.message}
            </p>

            <p>
                <strong>Status:</strong>

                <span class="claim-status ${claim.status.toLowerCase()}">
                    ${claim.status}
                </span>

            </p>

            <div class="claim-actions">
                ${buttons}
            </div>

        `;


        claimsContainer.appendChild(card);

    }

}


async function acceptClaim(claimId) {

    const confirmed =
        confirm("Accept this claim?");

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/claims/${claimId}/accept`,
            {
                method: "PUT"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to accept claim"
            );

        }


        alert("Claim accepted successfully.");

        loadClaims();


    } catch (error) {

        console.error(error);

        alert("Unable to accept claim.");

    }

}


async function rejectClaim(claimId) {

    const confirmed =
        confirm("Reject this claim?");

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/claims/${claimId}/reject`,
            {
                method: "PUT"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to reject claim"
            );

        }


        alert("Claim rejected successfully.");

        loadClaims();


    } catch (error) {

        console.error(error);

        alert("Unable to reject claim.");

    }

}


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


loadClaims();