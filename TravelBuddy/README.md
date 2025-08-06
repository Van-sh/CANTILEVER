# TravelBuddy ✈️🤝

TravelBuddy is a modern web application designed to connect users who are traveling to the same location. It helps you find travel companions, split costs, or simply meet new people to explore with, making your next adventure more enjoyable and collaborative.

## ✨ Features

* **Destination-Based Matching**: Easily find other travelers heading to the exact same destination as you.
* **Date Filtering**: Refine your search to connect with people traveling during your specific dates.
* **Detailed User Profiles**: Create rich profiles to showcase your travel style, interests, and what you're looking for in a travel buddy.
* **Direct Messaging**: Securely communicate and plan with potential travel companions through an integrated messaging system.
* **Interest-Based Matching (Planned)**: Future enhancements will include matching based on shared hobbies and activities.
* **Safety Features**: Robust reporting and blocking mechanisms to ensure a safe and trustworthy community.

## 🛠️ Tech Stack

Refer to [TECH\_STACK.md](./TECH_STACK.md) for a detailed list of technologies used.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or later) and [pnpm](https://pnpm.io/installation) installed on your machine.

### Installation & Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Van-sh/CANTILEVER.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd CANTILEVER/TravelBuddy
    ```

3. **Backend Setup**:

    1. **Navigate to the backend directory**:

        ```bash
        cd backend
        ```

    2. **Install backend dependencies**:

        ```bash
        pnpm install
        ```

    3. **Set up backend environment variables**:
        Copy the example environment file to create your own local configuration:

        ```bash
        cp .env.dist .env
        ```

        Now, open the newly created `.env` file and fill in the required values. You will need API keys for a Cloudinary storage.

4. **Frontend Setup**:

    1. **Navigate to the frontend directory**:

        ```bash
        cd frontend
        ```

    2. **Install frontend dependencies**:

        ```bash
        pnpm install
        ```

    3. **Set up frontend environment variables**:
        Copy the example environment file to create your own local configuration:

        ```bash
        cp .env.dist .env
        ```

        Now, open the newly created `.env` file and fill in the required values. You will need API keys for Google Maps.

## 🖥️ Running the Development Server

1. **Start the TravelBuddy application**:

    ```bash
    pnpm dev
    ```

    This will start the development server, typically on port 3000. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run the following scripts with `pnpm <script-name>`:

* `dev`: Runs the application in development mode.
* `build`: Builds the app for production.
* `start`: Starts a production server.
* `lint`: Runs ESLint to find and fix problems in your code.
* `format`: Formats all project files with Prettier.

---

Feel free to explore the `package.json` file for a full list of available scripts.
