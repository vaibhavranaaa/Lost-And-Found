const claimsContainer =
    document.getElementById("claimsContainer");

const message =
    document.getElementById("message");

const emptyState =
    document.getElementById("adminClaimsEmptyState");

const role =
    localStorage.getItem("role");


/* =========================================
   ADMIN AUTHORIZATION
   ========================================= */

if (role !== "ADMIN") {

    window.location.href = "index.html";

}


/* =========================================
   LOAD CLAIMS
   ========================================= */

async function loadClaims() {

    try {

        message.textContent = "";

        const response = await fetch(
            "http://localhost:8080/api/claims"
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load claims"
            );

        }


        const claims = await response.json();

        displayClaims(claims);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load claims.";

    }

}


/* =========================================
   GET ITEM
   ========================================= */

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


/* =========================================
   DISPLAY CLAIMS
   ========================================= */

async function displayClaims(claims) {

    claimsContainer.innerHTML = "";


    if (emptyState) {

        emptyState.style.display = "none";

    }


    if (!claims || claims.length === 0) {

        if (emptyState) {

            emptyState.style.display = "block";

        } else {

            claimsContainer.innerHTML = `
                <p>No claims found.</p>
            `;

        }

        return;

    }


    for (const claim of claims) {

        const item =
            await getItem(claim.itemId);


        const card =
            document.createElement("article");

        card.className =
            "admin-claim-card";


        /* -----------------------------------------
           Claim status
           ----------------------------------------- */

        const status =
            (claim.status || "PENDING").toLowerCase();


        /* -----------------------------------------
           Action buttons
           ----------------------------------------- */

        let buttons = "";


        if (claim.status === "PENDING") {

            buttons = `

                <button
                    type="button"
                    class="admin-claim-approve"
                    onclick="acceptClaim(${claim.id})">

                    ✓ Accept Claim

                </button>


                <button
                    type="button"
                    class="admin-claim-reject"
                    onclick="rejectClaim(${claim.id})">

                    ✕ Reject

                </button>

            `;

        } else {

            buttons = `
                <span class="admin-claim-reviewed">
                    ✓ Reviewed
                </span>
            `;

        }


        /* -----------------------------------------
           Claim card
           ----------------------------------------- */

        card.innerHTML = `

            <div class="admin-claim-card-top">

                <div class="admin-claim-icon">
                    📋
                </div>


                <span class="admin-claim-status ${status}">
                    ${claim.status || "PENDING"}
                </span>

            </div>


            <h3 class="admin-claim-title">

                ${item
                    ? item.itemName
                    : "Unknown Item"}

            </h3>


            <div class="admin-claim-id">

                Claim #${claim.id}

            </div>


            <div class="admin-claim-details">

                <div class="admin-claim-detail">

                    <span class="admin-claim-detail-icon">
                        📦
                    </span>

                    <div class="admin-claim-detail-content">

                        <small>Item ID</small>

                        <strong>
                            #${claim.itemId}
                        </strong>

                    </div>

                </div>


                <div class="admin-claim-detail">

                    <span class="admin-claim-detail-icon">
                        👤
                    </span>

                    <div class="admin-claim-detail-content">

                        <small>User ID</small>

                        <strong>
                            #${claim.userId}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="admin-claim-message">

                <span class="admin-claim-message-label">
                    Claim Message
                </span>

                <p>
                    ${claim.message || "No message provided."}
                </p>

            </div>


            <div class="admin-claim-card-footer">

                ${buttons}

            </div>

        `;


        claimsContainer.appendChild(card);

    }

}


/* =========================================
   ACCEPT CLAIM
   ========================================= */

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


        alert(
            "Claim accepted successfully."
        );


        loadClaims();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to accept claim."
        );

    }

}


/* =========================================
   REJECT CLAIM
   ========================================= */

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


        alert(
            "Claim rejected successfully."
        );


        loadClaims();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to reject claim."
        );

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

loadClaims();