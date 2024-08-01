# Quizify AI

Quizify AI is an intelligent quiz generation platform where users can take quizzes on any topic, with any level of difficulty, and select the number of questions. The quizzes are generated using AI. Users who sign up for an account can have their quiz history stored and reviewed on the history page.

## Features

- Generate quizzes on any topic
- Choose difficulty level and number of questions
- AI-generated quizzes
- Sign up for an account to save and review quiz history

## Installation

This project was created using Create React App, Tailwind CSS, Flask, and MongoDB. To get started with the installation, follow these steps:

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/quizify-ai.git
    cd quizify-ai
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    VITE_API_KEY=your_openai_api_key
    MONGO_URL=your_mongo_database_url
    VITE_APP_URL=your_backend_url
    ```


### Backend

1. Navigate to the backend directory:
    ```bash
    cd src
    cd Backend
    ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    ```bash
    # On Windows
    venv\Scripts\activate

    # On macOS/Linux
    source venv/bin/activate
    ```

4. Install the dependencies from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```


## Usage

To use Quizify AI, follow these steps:

1. Create a `.env` file in both the root directory and the backend directory, and add the following environment variables:
    ```env
    VITE_API_KEY=your_openai_api_key
    MONGO_URL=your_mongo_database_url
    VITE_APP_URL=your_backend_url
    ```

2. Run the frontend development server:
    ```bash
    npm start run
    ```

3. Run the Flask backend server:
    ```bash
    python3 app.py
    ```

## Contribution

To contribute to Quizify AI, please push your changes to the `dev` branch:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b your-feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of your changes"
    ```
4. Push your changes to the `dev` branch:
    ```bash
    git push origin your-feature-branch
    ```
5. Create a pull request against the `dev` branch.

