# Note-Taking Application with Audio Recording

## Overview

This project is a full-stack application designed for securely managing daily notes with integrated in-app audio recording functionality. It demonstrates end-to-end development skills, including user authentication, CRUD operations, and media handling. The application was built using **Node.js** for the Backend and **React** with **Tailwind CSS** for the frontend and Storing data in **Mysql** Database.

## Features

### 1. User Authentication & Daily Notes Management

-   **Secure Registration and Login**:
    -   Implements secure JWT-based authentication.
    -   Ensures only authenticated users can access the app's core features.
-   **Daily Notes Management**:
    -   Create, update, view, and delete daily notes.
    -   there are two types of notes : Text note and Audio Note
    -   Each Text Note includes a title and a description.
    -   Voice Notes contains the voice.

### 2. In-App Audio Recording & Storage

-   **Audio Recording**:
    -   Users can record audio directly within the app.
    -   Recordings are saved as a separate notes.
-   **Secure Storage**:
    -   Audio files are stored securely on the server.
    -   Only authenticated users can access their recordings.

### 3. Additional Features

-   **Docker Image**:
    -   The Project is dockorized and you can find the docker image in this link :
-   **Responsive Frontend**:
    -   A clean and intuitive user interface built with React and styled using Tailwind CSS.

## Technologies Used

### Backend

-   **Node.js** with **Express.js**: For building RESTful APIs.
-   **JWT**: For secure user authentication.
-   **Multer**: For handling audio file uploads.
-   **MySQL**: For storing user data and notes.

### Frontend

-   **React.js**: For building the user interface.
-   **Tailwind CSS**: For responsive and modern styling.

### Tools

-   **Postman**: For API testing.
-   **GitHub**: For version control and repository management.
-   **Doker**: For Project Dockorization.

## Installation and Setup

### Prerequisites

-   Node.js (>= 14.x)
-   MySQL Server
-   A modern web browser

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/imadbenmadi/Offline-Task-1.git
    cd Offline-Task-1
    ```
2. **Server Setup**:

    - Navigate to the `Server` directory:
        ```bash
        cd Server
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Configure `.env` file:
        ```
        PORT=3000
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=yourpassword
        DB_NAME=notesapp
        JWT_SECRET=your_jwt_secret
        ```
    - Start the server:
        ```bash
        npm start
        ```

3. **Frontend Setup**:
    - Navigate to the `front-end` directory:
        ```bash
        cd ../front-end
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the development server:
        ```bash
        npm run dev
        ```

## Usage

1. Register a new account or log in with an existing account.
2. Create daily notes by providing a title and description.
3. You can Use the audio recording to record and save an audio note.
4. Manage your notes (edit, delete, or view).

**Thank You!**
