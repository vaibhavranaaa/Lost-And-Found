const itemDetails = document.getElementById("itemDetails");
const message = document.getElementById("message");
const claimSection = document.getElementById("claimSection");

const claimBtn = document.getElementById("claimBtn");
const claimMessage = document.getElementById("claimMessage");
const claimMessageResult =
    document.getElementById("claimMessageResult");

const params = new URLSearchParams(window.location.search);

const itemId = params.get("id");

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");


if (!userId) {
    window.location.href = "index.html";
}


async function loadItem() {

    if (!itemId) {

        message.textContent = "Item ID is missing.";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8080/api/items/${itemId}`
        );

        if (!response.ok) {
            throw new Error("Item not found");
        }

        const item = await response.json();

        displayItem(item);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load item.";
    }
}


function displayItem(item) {

    itemDetails.innerHTML = `
        <h2>${item.itemName}</h2>

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
            <strong>Status:</strong>
            ${item.status}
        </p>
    `;

    if (
        item.status !== "ACTIVE" ||
        role === "ADMIN"
    ) {
        claimSection.style.display = "none";
    }
}


claimBtn.addEventListener(
    "click",
    submitClaim
);


async function submitClaim() {

    const messageText =
        claimMessage.value.trim();

    if (!messageText) {

        claimMessageResult.textContent =
            "Please enter a message.";

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


        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            data = {
                message: text
            };
        }


        if (!response.ok) {

            claimMessageResult.textContent =
                data.message || text || "Claim failed.";

            return;
        }


        claimMessageResult.textContent =
            "Claim submitted successfully.";

        claimMessage.value = "";

        claimBtn.disabled = true;

    } catch (error) {

        console.error(error);

        claimMessageResult.textContent =
            "Unable to connect to server.";
    }
}


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";
    });


loadItem();