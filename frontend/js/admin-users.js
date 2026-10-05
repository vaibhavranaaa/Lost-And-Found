const usersContainer =
    document.getElementById("usersContainer");

const message =
    document.getElementById("message");

const emptyState =
    document.getElementById("adminUsersEmptyState");

const role =
    localStorage.getItem("role");


/* =========================================
   ADMIN AUTHORIZATION
   ========================================= */

if (role !== "ADMIN") {

    window.location.href = "index.html";

}


/* =========================================
   LOAD USERS
   ========================================= */

async function loadUsers() {

    try {

        message.textContent = "";

        const response = await fetch(
            "http://localhost:8080/api/users"
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load users"
            );

        }


        const users = await response.json();

        displayUsers(users);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to load users.";

    }

}


/* =========================================
   DISPLAY USERS
   ========================================= */

function displayUsers(users) {

    usersContainer.innerHTML = "";


    if (emptyState) {

        emptyState.style.display = "none";

    }


    if (!users || users.length === 0) {

        if (emptyState) {

            emptyState.style.display = "block";

        } else {

            usersContainer.innerHTML = `
                <p>No users found.</p>
            `;

        }

        return;

    }


    users.forEach(function (user) {

        const card =
            document.createElement("article");

        card.className = "admin-user-card";


        /* -----------------------------------------
           Role
           ----------------------------------------- */

        const userRole =
            user.role || "USER";

        const roleClass =
            userRole.toLowerCase();


        /* -----------------------------------------
           Actions
           ----------------------------------------- */

        let actions = "";


        if (userRole !== "ADMIN") {

            actions = `

                <button
                    type="button"
                    class="admin-user-delete"
                    onclick="deleteUser(${user.id})">

                    Delete User

                </button>

            `;

        } else {

            actions = `

                <span class="admin-admin-account">
                    🛡️ Admin Account
                </span>

            `;

        }


        /* -----------------------------------------
           Card
           ----------------------------------------- */

        card.innerHTML = `

            <div class="admin-user-card-top">

                <div class="admin-user-avatar">
                    👤
                </div>

                <span class="admin-user-role ${roleClass}">
                    ${userRole}
                </span>

            </div>


            <h3 class="admin-user-name">
                ${user.name || "Unnamed User"}
            </h3>


            <div class="admin-user-details">

                <div class="admin-user-detail">

                    <div class="admin-user-detail-icon">
                        🆔
                    </div>

                    <div class="admin-user-detail-content">

                        <small>User ID</small>

                        <strong>
                            #${user.id}
                        </strong>

                    </div>

                </div>


                <div class="admin-user-detail">

                    <div class="admin-user-detail-icon">
                        ✉️
                    </div>

                    <div class="admin-user-detail-content">

                        <small>Email Address</small>

                        <strong>
                            ${user.email || "Not available"}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="admin-user-card-footer">

                <span class="admin-user-status">
                    Active Account
                </span>


                <div class="admin-user-actions">

                    ${actions}

                </div>

            </div>

        `;


        usersContainer.appendChild(card);

    });

}


/* =========================================
   DELETE USER
   ========================================= */

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


        alert(
            "User deleted successfully."
        );

        loadUsers();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete user. " +
            "The user may have associated items or claims."
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

loadUsers();