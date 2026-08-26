const role = localStorage.getItem("role");

if (role !== "ADMIN") {

    window.location.href = "index.html";

}


async function loadDashboard() {

    try {

        const usersResponse =
            await fetch("http://localhost:8080/api/users");

        const itemsResponse =
            await fetch("http://localhost:8080/api/items");

        const claimsResponse =
            await fetch("http://localhost:8080/api/claims");


        const users =
            await usersResponse.json();

        const items =
            await itemsResponse.json();

        const claims =
            await claimsResponse.json();


        document.getElementById("totalUsers")
            .textContent = users.length;


        document.getElementById("totalItems")
            .textContent = items.length;


        const activeItems =
            items.filter(
                item => item.status === "ACTIVE"
            ).length;


        const resolvedItems =
            items.filter(
                item => item.status === "RESOLVED"
            ).length;


        const pendingClaims =
            claims.filter(
                claim => claim.status === "PENDING"
            ).length;


        document.getElementById("activeItems")
            .textContent = activeItems;


        document.getElementById("resolvedItems")
            .textContent = resolvedItems;


        document.getElementById("pendingClaims")
            .textContent = pendingClaims;


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        window.location.href = "index.html";

    });


loadDashboard();