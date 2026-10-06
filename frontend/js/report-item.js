const itemForm = document.getElementById("itemForm");

const message = document.getElementById("message");

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");

const itemImage = document.getElementById("itemImage");
const imageFileName = document.getElementById("imageFileName");
const imagePreview = document.getElementById("imagePreview");


if (!userId) {
    window.location.href = "index.html";
}


itemImage.addEventListener("change", function () {

    const file = itemImage.files[0];

    imagePreview.innerHTML = "";

    if (!file) {
        imageFileName.textContent = "No photo selected";
        return;
    }

    if (!file.type.startsWith("image/")) {
        imageFileName.textContent = "Please select an image file.";
        itemImage.value = "";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        imageFileName.textContent = "Image must be smaller than 5MB.";
        itemImage.value = "";
        return;
    }

    imageFileName.textContent = file.name;

    const image = document.createElement("img");

    image.src = URL.createObjectURL(file);

    image.alt = "Selected item photo";

    imagePreview.appendChild(image);
});


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


    const imageFile = itemImage.files[0];


    if (imageFile && imageFile.size > 5 * 1024 * 1024) {

        message.textContent =
            "Image must be smaller than 5MB.";

        return;
    }


    try {

        const formData = new FormData();

        formData.append("itemName", itemName);

        formData.append("category", category);

        formData.append("description", description);

        formData.append("location", location);

        formData.append("date", date);

        formData.append("type", type);

        formData.append("userId", Number(userId));


        if (imageFile) {
            formData.append("image", imageFile);
        }


        const response = await fetch(
            "http://localhost:8080/api/items/with-image",
            {
                method: "POST",
                body: formData
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

        imageFileName.textContent =
            "No photo selected";

        imagePreview.innerHTML = "";


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