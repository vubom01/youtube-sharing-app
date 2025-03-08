# YouTube Video Sharing App BE

## 1. Introduction

This is the backend service for the YouTube Video Sharing App, built using Golang.
It provides authentication, video sharing, and real-time notification functionalities to support the frontend application.
Key features include:

- User Authentication: Handles user login and registration based on email.
- Video Sharing: Allows authenticated users to share YouTube videos.
- Real-time Notifications: Uses WebSockets to notify logged-in users when a new video is shared.
- Access Control: Ensures only authenticated users can share and receive notifications.

## 2. Prerequisites

- Golang: v1.24

## 3. Installation & Configuration

Clone the repository

```
$ git clone git@github.com:vubom01/youtube-sharing-app.git
$ cd be
```

Install dependencies

```
$ go mod tidy
$ make install-tools
$ make go-gen
```

Set up the environment variables in a .env file

```
$ cp .env.example .env
```

## 4. Database Setup
```
$ docker-compose up -d
$ make migrate-up
```

## 5. Running the Application

Run the application

```
$ make run
```

To run test: Config DB test in .env file

```
$ make test
```

## 6. Docker Deployment

## 7. Usage

### Authentication
- Login/Register: POST /api/v1/login
```
{
  "email": "user@example.com",
  "password": "password123"
}
```
- Me: GET /api/v1/me
```
Requires Authorization header with Bearer Token
```

### Posts
- Share Post: POST /api/v1/posts
```
{
  "youtubeURL": "https://www.youtube.com/watch?v=abc123qwe456",
  "title": "title test",
  "description": "description test"
}
```
- Get Posts: GET /api/v1/posts?page={page}&pageSize={pageSize}

### YouTube
- Get YouTube detail: GET /api/youtube?youtubeId={youtubeId}
```
Config YOUTUBE_API_KEY in .env file
```

### Websocket
- Connect to WebSocket: ws://localhost:8000/ws
- Receives event when a new video is shared

## 8. Troubleshooting

- Ensure all environment variables are set correctly
- Check if the database is running and accessible