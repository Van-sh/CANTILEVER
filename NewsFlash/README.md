# NewsFlash 🚀

NewsFlash is a modern news aggregator web application built with Next.js in Firebase Studio. It allows users to browse articles from various sources, filter them by category, search for specific topics, and even get AI-powered summaries of articles.

## ✨ Features

* **Article Browsing**: View a list of news articles from various sources.
* **Search & Filter**: Easily search for articles by keywords or filter by category.
* **AI-Powered Summaries**: Uses Genkit and Google's Gemini model to generate concise summaries for long articles.
* **User Authentication**: Secure sign-up and sign-in with email/password and Google OAuth.
* **Responsive Design**: A clean and modern UI that works beautifully on all screen sizes.
* **Theming**: Light and dark mode support, built with Tailwind CSS and CSS variables.

## 🛠️ Tech Stack

Refer to [TECH_STACK.md](./TECH_STACK.md) for a detailed list of technologies used.

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
    cd CANTILEVER/NewsFlash
    ```

3. **Install dependencies**:

    ```bash
    pnpm install
    ```

4. **Set up environment variables**:
   Copy the example environment file to create your own local configuration:

    ```bash
    cp .env.dist .env
    ```

   Now, open the newly created `.env` file and fill in the required values. You will need API keys for Google (for both OAuth and Gemini), Turso, and GNews.

5. **Apply database migrations**:
   Run the following command to set up your database schema:

    ```bash
    pnpm db:migrate
    ```

## 🖥️ Running the Development Server

1. **Start the Next.js application**:

    ```bash
    pnpm dev
    ```

    This will start the Next.js development server, typically on port 3000. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. **(Optional) Start the Genkit Developer UI**:
    To debug your AI flows, you can run the Genkit server in a separate terminal. This provides a UI to inspect traces, logs, and test your flows.

    ```bash
    pnpm genkit:dev
    ```

    This will start the Genkit development UI, typically on port 4000.

## 📜 Available Scripts

In the project directory, you can run the following scripts with `pnpm <script-name>`:

* `dev`: Runs the Next.js app in development mode with Turbopack.
* `build`: Builds the app for production.
* `start`: Starts a Next.js production server.
* `lint`: Runs ESLint to find and fix problems in your code.
* `format`: Formats all project files with Prettier.
* `typecheck`: Runs the TypeScript compiler to check for type errors.

---

* `db:generate`: Generates Drizzle ORM migration files based on schema changes.
* `db:migrate`: Applies pending database migrations.
* `db:push`: Pushes schema changes directly to the database (useful for prototyping).
* `db:studio`: Opens the Drizzle Studio UI to browse your database.

---

* `genkit:dev`: Starts the Genkit development server and UI.
* `genkit:watch`: Starts the Genkit server in watch mode.

---

* `auth:generate`: A utility script for generating auth-related schema code.
