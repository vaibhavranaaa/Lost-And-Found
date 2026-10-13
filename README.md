# 🔍 Lost & Found Management System

A web-based Lost & Found Management System designed to help users report lost items, post found items, search for belongings, and submit claims to recover their possessions.

The project aims to simplify the process of connecting people who have lost their belongings with those who have found them through a centralized platform.

## 📌 Project Overview

Losing personal belongings can be stressful, and finding the rightful owner of a lost item can be challenging. This project provides a centralized system where users can report lost and found items and manage claims.

The application includes separate user and administrator roles to support item management, claim processing, and administrative control.

## ✨ Features

### 👤 User Management
- User registration and login.
- Role-based access for users and administrators.
- Secure password hashing using BCrypt.
- User identification through unique IDs.

### 📦 Item Management
- Report lost and found items.
- View all reported items.
- View item details.
- Update item information.
- Delete items.
- Mark items as resolved.
- Search items by name.
- Filter items by type, category, and location.

### 📝 Claim Management
- Submit claims for reported items.
- Associate claims with users and items.
- View all claims.
- Retrieve claims by item or user.
- Accept or reject claims.
- Update an item's status to resolved when an administrator accepts a claim.

### 🛡️ Administrator Features
- Manage reported items.
- Review submitted claims.
- Accept or reject claims.
- Resolve items after successful claim approval.
- Support administrative management of the platform.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Java | Backend programming language |
| Spring Boot | Backend application framework |
| Spring Data JPA | Database operations |
| Hibernate | Object-relational mapping |
| MySQL | Relational database |
| REST APIs | Communication between frontend and backend |
| HTML | Frontend page structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |
| Maven | Dependency and build management |
| Git & GitHub | Version control and project hosting |

*The frontend technologies are listed as part of the planned web application; frontend completion and integration are ongoing.*

## 🏗️ Project Architecture

The application follows a layered backend architecture.

```text
Lost & Found Management System
│
├── Frontend
│   ├── HTML Pages
│   ├── CSS Styling
│   └── JavaScript
│
└── Backend
    ├── Controller Layer
    │   ├── AuthController
    │   ├── ItemController
    │   └── ClaimController
    │
    ├── Service Layer
    │   ├── AuthService
    │   ├── ItemService
    │   └── ClaimService
    │
    ├── Repository Layer
    │   ├── UserRepository
    │   ├── ItemRepository
    │   └── ClaimRepository
    │
    ├── Model Layer
    │   ├── User
    │   ├── Item
    │   └── Claim
    │
    └── DTO Layer
        ├── ItemDTO
        └── ClaimDTO
```

## ⚙️ Backend Functionality

The backend exposes REST endpoints for authentication, item management, searching, filtering, and claims.

### Authentication
- Register new users.
- Authenticate existing users.
- Return user details and role information after successful login.

### Item Operations
- Create, read, update, and delete items.
- Search by item name.
- Filter items by type, category, and location.
- Update item status to resolved.

### Claim Operations
- Create claims for specific items.
- Retrieve claims by ID, item ID, or user ID.
- Accept and reject claims.
- Resolve the associated item when a claim is accepted by an administrator.

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Java JDK
- Maven
- MySQL Server
- Git
- An IDE such as IntelliJ IDEA, Eclipse, or VS Code

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Replace the URL with your actual GitHub repository URL.

### 2. Open the Project

Navigate to the project directory:

```bash
cd YOUR-REPOSITORY
```

Open the backend project in your preferred Java IDE.

### 3. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE lostfound_db;
```

Update your `application.properties` file with your local database configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lostfound_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Ensure that your project includes the required MySQL driver and Spring Data JPA dependencies.

**Note:** Use your own local database credentials. Never commit real passwords or secrets to GitHub.

### 4. Run the Backend

Using Maven:

```bash
mvn spring-boot:run
```

Alternatively, run the main Spring Boot application class from your IDE.

The backend will typically be available at:

```text
http://localhost:8080
```

### 5. Run the Frontend

Once the frontend pages are ready, open the frontend project directory and serve the HTML files using VS Code Live Server or another local web server.

Ensure the frontend API URLs match the backend address and that CORS is configured appropriately.

## 🔗 API Overview

The following endpoints represent the current API structure.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/items` | Retrieve items |
| GET | `/api/items/{id}` | Retrieve an item |
| POST | `/api/items` | Create an item |
| PUT | `/api/items/{id}` | Update an item |
| DELETE | `/api/items/{id}` | Delete an item |
| GET | `/api/items/search?keyword={keyword}` | Search items |
| POST | `/api/claims` | Submit a claim |
| GET | `/api/claims` | Retrieve claims |

*Endpoint paths may vary depending on the controller mappings in your implementation. Check your controllers for the exact routes before using this table as API documentation.*

## 🔐 Security Considerations

- Passwords are hashed using BCrypt rather than stored as plain text.
- User and administrator roles are represented separately.
- Sensitive database credentials should be stored outside version control.
- Production deployment should include proper authorization checks for administrative operations and protected resources.

## 🧪 Testing

The application can be tested using Postman or another REST API client.

Suggested test cases:

- Register a new user.
- Log in with valid and invalid credentials.
- Create and retrieve an item.
- Search and filter items.
- Submit a claim for an item.
- Accept or reject a claim.
- Verify that accepting a claim resolves the associated item.
- Test update and delete operations.

## 🗺️ Future Enhancements

- Complete frontend development and backend integration.
- Improve the user and administrator dashboards.
- Add item image uploads.
- Implement advanced search and filtering.
- Add notifications for claim status changes.
- Strengthen role-based authorization.
- Add automated unit and integration tests.
- Deploy the application to a cloud platform.

## 🎯 Project Objective

The primary objective of this project is to develop a centralized and user-friendly platform that improves the reporting, discovery, and recovery of lost belongings while providing an organized process for handling ownership claims.



⭐ If you find this project useful, consider giving the repository a star.
