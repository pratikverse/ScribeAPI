
# 📝 Collaborative Blogging Platform API

A **robust, scalable, and secure RESTful API** for a multi-user blogging platform, built with **Node.js**, **Express**, and **PostgreSQL**. This backend service supports user authentication, content management, tagging, and interactive features like commenting — all backed by a well-structured, production-ready architecture.

---

## 🚀 Features

- **🔐 Secure User Authentication**  
  JWT-based authentication system for registration and login. Passwords are securely hashed using `bcrypt.js`.

- **📝 Full CRUD for Posts**  
  Authenticated users can create, read, update, and delete their blog posts.

- **💬 Commenting System**  
  Logged-in users can add comments to any post.

- **🏷️ Dynamic Tagging**  
  Posts can be tagged with multiple labels. Users can filter posts by tag.

- **🧩 Relational Data Integrity**  
  Built on **PostgreSQL** using **Sequelize ORM** for strong model relationships and data consistency.

- **🔒 Production-Ready Security**  
  Includes centralized error handling, HTTP headers via `helmet`, and API rate limiting using `express-rate-limit`.

---

## 🛠️ Technology Stack

| Layer         | Tools/Packages                         |
|---------------|----------------------------------------|
| **Backend**   | Node.js, Express.js                    |
| **Database**  | PostgreSQL                             |
| **ORM**       | Sequelize                              |
| **Auth**      | JSON Web Tokens (JWT), bcrypt.js       |
| **Security**  | Helmet, Express Rate Limit             |
| **Dev Tools** | nodemon                                |

---

## ⚙️ Getting Started

### 📌 Prerequisites

- **Node.js** (v14 or newer)
- **PostgreSQL** installed and running

### 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pratikverse/ScribeAPI.git
   cd ScribeAPI
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=3000

   # PostgreSQL Credentials
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_DATABASE=blog_api
   DB_HOST=localhost
   DB_PORT=5432

   # JWT Secret
   JWT_SECRET=generate-a-strong-random-secret-key
   ```

4. **Create the PostgreSQL Database**
   ```sql
   CREATE DATABASE ScribeAPI;
   ```

5. **Synchronize Sequelize Models**
   ```bash
   npm run db:sync
   ```

6. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The API will be available at:  
   👉 `http://localhost:3000`

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint    | Description           | Body                                |
|--------|-------------|-----------------------|-------------------------------------|
| POST   | `/register` | Register a new user   | `{ username, email, password }`     |
| POST   | `/login`    | Log in a user         | `{ email, password }`               |

---

### 📝 Posts (`/api/posts`)

| Method | Endpoint        | Description                | Auth Required |
|--------|------------------|----------------------------|---------------|
| GET    | `/`              | Get all posts              | ❌ No          |
| GET    | `/:id`           | Get post by ID             | ❌ No          |
| POST   | `/`              | Create a new post          | ✅ Yes         |
| PUT    | `/:id`           | Update existing post       | ✅ Yes         |
| DELETE | `/:id`           | Delete a post              | ✅ Yes         |

---

### 💬 Comments (`/api/posts/:postId/comments`)

| Method | Endpoint | Description               | Auth Required |
|--------|----------|---------------------------|---------------|
| POST   | `/`      | Add a comment to a post   | ✅ Yes         |

---

### 🏷️ Tags (`/api/tags`)

| Method | Endpoint             | Description                      | Auth Required |
|--------|----------------------|----------------------------------|---------------|
| GET    | `/`                  | Get all available tags           | ❌ No          |
| GET    | `/:name/posts`       | Get posts by tag name            | ❌ No          |

---

## 📂 Folder Structure

```
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── utils/
├── .env
├── server.js
├── package.json
```

---

## 🔐 Security Measures

- **bcrypt.js** – Password hashing
- **JWT** – Token-based authentication
- **helmet** – Secure HTTP headers
- **express-rate-limit** – Rate limiting to prevent API abuse
- **Centralized Error Handling** – Clean and consistent error responses

