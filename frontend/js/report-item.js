const itemForm = document.getElementById("itemForm");

const message = document.getElementById("message");

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");


if (!userId) {
    window.location.href = "index.html";
}


itemForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const itemName =
        document.getElementById("itemName").value.trim();

    const category =
        document.getElementById("category").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const date =
        document.getElementById("date").value;

    const type =
        document.getElementById("type").value;


    try {

        const response = await fetch(
            "http://localhost:8080/api/items",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    itemName: itemName,

                    category: category,

                    description: description,

                    location: location,

                    date: date,

                    type: type,

                    status: "ACTIVE",

                    user: {
                        id: Number(userId)
                    }
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

            message.textContent =
                data.message || text || "Failed to report item.";

            return;
        }


        message.textContent =
            "Item reported successfully!";


        itemForm.reset();


        setTimeout(function () {

            window.location.href = "items.html";

        }, 1500);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to server.";
    }
});


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";
    });