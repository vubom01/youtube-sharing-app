# YouTube Video Sharing App FE

## 1. Introduction

YouTube Video Sharing App FE is a frontend application built using ReactJS and TypeScript.
The purpose of this application is to allow users to log in and share YouTube videos. Key features include:

- User Authentication: Users can log in to the system.
- Video Sharing: Users can share YouTube videos by submitting a URL.
- Real-time Notifications: Logged-in users receive real-time notifications when another user shares a video.
  Non-logged-in users will not receive notifications.

## 2. Prerequisites

- Node.js: v23.5.0
- yarn: v1.22.22

## 3. Installation & Configuration

Clone the repository

```
$ git clone git@github.com:vubom01/youtube-sharing-app.git
$ cd fe
```

Install dependencies

```
$ yarn install
```

## 4. Running the Application

Run the application

```
$ yarn start
```

Open your browser and navigate to: localhost:3000

To run test

```
$ yarn test
$ yarn coverage
```

## 5. Usage

### Login/ Register:

- Enter your email and password
- Click the Login/ Register button
- If the email is not registered, a new account will be created
- If the email already exists, the system will authenticate the login

### Share Video:

- After login, click the Sharing a Video button
- Enter a valid YouTube video link in the input field
- Click OK to share the video
- Other logged-in users will receive a real-time notification of the new shared video

### View Videos:

- Users can browse and watch videos shared by anyone

## 6. Troubleshooting

Configure environment variables in /public/env.js file and updating the necessary configuration