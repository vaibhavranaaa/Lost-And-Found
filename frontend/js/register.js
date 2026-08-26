const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Backend response:", text);

        if (!response.ok) {
            message.textContent = text;
            return;
        }

        message.textContent = "Registration successful!";

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);

    } catch (error) {

        console.error("Registration error:", error);

        message.textContent =
            "Unable to connect to server";
    }
});