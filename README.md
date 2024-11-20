# MyTube API

MyTube is a video-sharing API built with Node.js, Express, and MongoDB. It allows users to upload, update, and delete videos, as well as comment, like, and fetch video data. The API includes user authentication and uses middleware for file uploads and secure routes.

---

## Features

- **User Login and Registration**:
  - JWT-based secure access to endpoints.
  - Update user/channel profile.
  - Subscribe user channel.
- **Video Management**:
  - Upload, update, and delete videos with associated thumbnails.
  - Fetch videos with support for pagination, filtering, and sorting.
- **Likes and Comments**:
  - Like/unlike videos.
  - Add comments to videos.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/mytube-api.git
   cd mytube-api
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables: Create a .env file in the root directory with the following variables**:
   ```bash
   env
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. **Run the Server**:

   ```bash
   npm start
   The server will run on localhost:5000.
   ```
## API Endpoints

**Base URL**

  ```bash
  http://localhost:5000/api/v1
  ```

**Authentication**

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | users/auth/register | Register a new user      |
| POST   | users/auth/login    | Login and get a JWT token |

**Subscription**

| Method | Endpoint               | Description                                       |
|--------|------------------------|---------------------------------------------------|
| POST   | /channel/:channelId    | Subscribe or unsubscribe from a channel          |
| GET    | /channel/:channelId    | Get the list of users subscribed to a channel    |
| GET    | /channel               | Get the list of channels the user is subscribed to |

**Videos**

| Method | Endpoint	| Description |
|--------|----------|-------------|
|POST	| /upload-video	| Upload a video (requires title, description, and files) |
|GET	| /videos	| Fetch all videos with pagination and filtering |
|GET	| /videos/:videoId	| Fetch details of a single video (with like count) |
|PATCH	| /videos/:videoId	| Update a video (requires authentication) |
|DELETE	| /videos/:videoId	| Delete a video (requires authentication) |

**Likes**
| Method | Endpoint	| Description |
|--------|----------|-------------|
|POST	| /videos/:videoId/like |	Like or unlike a video |

**Comments**
| Method | Endpoint	| Description |
|--------|----------|-------------|
|POST	| /videos/:videoId/comment	|Add a comment to a video |

## Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- File Upload: Multer and Cloudinary
- Testing: Postman (suggested for API testing)

## Project Structure
  ```plaintext
  mytube-api/
  ├── src/
  │   ├── controllers/     # Business logic for handling requests
  │   ├── models/          # Mongoose schemas
  │   ├── middlewares/     # Custom middleware (e.g., auth, file uploads)
  │   ├── routes/          # Route definitions
  │   ├── utils/           # Helper functions (e.g., error handling)
  │   └── app.js           # Entry point
  ├── public/              # Temp storage for uploads
  ├── .env                 # Environment variables
  ├── package.json         # Node.js dependencies and scripts
  └── README.md            # Documentation
  ```
## Development

### Run the Project in Development Mode locally
  ```bash
  npm run dev
  ```
The server will reload automatically on code changes.

## Future Enhancements

- Add playlists and categories for videos.
- Add search functionality for videos and comments.
- Implement video streaming.

- Fork the repository.
- Create a new branch (feature/your-feature-name).
- Commit your changes.
- Push to the branch.
- Open a Pull Request.
