# To-Do List Application

This is a simple to-do list application built with Next.js and Firebase. It allows users to create, manage, and track their to-do items. The application uses Firebase for authentication and database services.

## Features

*   User authentication with Google
*   Create, read, update, and delete to-do items
*   Real-time data synchronization with Firestore
*   Responsive design for use on different devices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)
*   A Google account for Firebase authentication

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

### Configuration

1.  Create a Firebase project in the [Firebase console](https://console.firebase.google.com/).
2.  Enable Google as a sign-in provider in the Authentication section of your Firebase project.
3.  Create a Firestore database in your Firebase project.
4.  Create a `.env.local` file in the root of the project and add your Firebase project configuration:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

5.  Add the following Firestore rules to the "Rules" tab in the Firestore Database section of the Firebase console:

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId}/{documents=**} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

### Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## Built With

*   [Next.js](https://nextjs.org/) - The React framework for production
*   [Firebase](https://firebase.google.com/) - The platform for building web and mobile applications
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
