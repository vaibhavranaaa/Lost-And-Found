const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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

        const data = JSON.parse(text);

        console.log("Login data:", data);

        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role);

        if (data.role === "ADMIN") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "user-dashboard.html";
        }

    } catch (error) {

        console.error("Login error:", error);
        message.textContent = "Unable to connect to server";
    }
});