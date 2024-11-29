
# TwinFit: Your Personalized Health Companion

**TwinFit** is a full-stack web application that combines user management with an AI-powered health advisor. It helps users track their daily metrics and offers personalized health advice based on inputs like age, weight, exercise habits, and more.

---

## Features

- **User Management**: 
  - Register, log in, log out, and manage profiles securely.
  - Delete accounts with ease.
- **AI-Powered Health Advisor**:
  - Receive actionable, personalized health tips using Generative AI.
- **Session-Based Authentication**:
  - Securely manage user sessions with Django and React/Redux.
- **Scalable Database**:
  - Uses PostgreSQL for robust and efficient data storage.


## Technologies Used

- **Backend**: Django REST Framework, PostgreSQL
- **Frontend**: React, Redux, Bootstrap
- **Generative AI**: Powered by Google's Gemini API

---

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:
- Python 3.8+ (for the backend)
- Node.js and npm (for the frontend)
- PostgreSQL (for database)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/twinfit.git
cd twinfit
```

---

### Step 2: Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure PostgreSQL:
   - Create a database named `twinfit`.
   - Update the `DATABASES` setting in `backend/.env` with your PostgreSQL credentials.

5. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

---

### Step 3: Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

---

### Step 4: Generative AI Configuration

1. Obtain an API key for Google's Gemini API.
2. Add the API key to the `.env` file in the backend:
   ```bash
   GEMINI_API_KEY=your_api_key
   ```

---

## Usage

1. Navigate to `http://localhost:3000` in your browser.
2. Register an account and log in.
3. Update your profile with daily metrics like weight, sleep hours, and water intake.
4. Click "Health Advice" to receive personalized tips powered by AI.

---

## Testing

- Test the backend endpoints using Postman or Django's built-in tools.
- Verify frontend functionality using the Redux DevTools browser extension.
- Confirm that health advice is generated accurately based on user inputs.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
