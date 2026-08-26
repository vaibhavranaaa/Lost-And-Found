const usersContainer =
    document.getElementById("usersContainer");

const message =
    document.getElementById("message");

const role =
    localStorage.getItem("role");


if (role !== "ADMIN") {

    window.location.href = "index.html";

}


async function loadUsers() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/users"
        );

        if (!response.ok) {

            throw new Error("Failed to load users");

        }

        const users = await response.json();

        displayUsers(users);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load users.";

    }

}


function displayUsers(users) {

    usersContainer.innerHTML = "";


    if (users.length === 0) {

        usersContainer.innerHTML =
            "<p>No users found.</p>";

        return;

    }


    users.forEach(function (user) {

        const card =
            document.createElement("div");

        card.className = "admin-user-card";


        card.innerHTML = `

            <h3>${user.name}</h3>

            <p>
                <strong>ID:</strong>
                ${user.id}
            </p>

            <p>
                <strong>Email:</strong>
                ${user.email}
            </p>

            <p>
                <strong>Role:</strong>
                ${user.role}
            </p>

            <div class="user-actions">

                ${
                    user.role !== "ADMIN"
                    ?
                    `
                    <button
                        onclick="deleteUser(${user.id})">
                        Delete User
                    </button>
                    `
                    :
                    `
                    <span>Admin Account</span>
                    `
                }

            </div>

        `;


        usersContainer.appendChild(card);

    });

}


async function deleteUser(userId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this user?"
        );

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/users/${userId}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to delete user"
            );

        }


        alert("User deleted successfully.");

        loadUsers();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete user. " +
            "The user may have associated items or claims."
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


loadUsers();