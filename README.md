# 🚀 EchoVault AI

EchoVault AI is an **AI-powered chat application** that allows users to interact with an intelligent assistant while maintaining conversation history.

The system processes user queries, sends them to an AI model, and returns meaningful responses in real-time through a clean and modern interface.

---

# 🌟 Features

* 💬 Real-time **AI chat interaction**
* 🧠 Persistent **chat history (localStorage)**
* ⚡ Fast and responsive **React + Vite UI**
* 🔐 Secure backend using **serverless API**
* 🎨 Clean and modern **chat interface**
* 🔄 Auto-scroll and typing indicator

---

# 🧠 How It Works

1. User types a message in the chat input
2. The message is sent to the backend API (`/api/chat`)
3. The backend securely calls the AI model
4. The AI response is returned and displayed in the UI

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* CSS / Tailwind

### Backend

* Vercel Serverless Functions

### AI Integration

* OpenAI API

### Libraries

* Axios
* React Hooks

---

# 📂 Project Structure

```
ai-chat-app/
│
├── api/
│   └── chat.js
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/Lingu17/ai-chat-app-saved-history.git
```

### 2️⃣ Navigate to the project folder

```
cd ai-chat-app-saved-history
```

### 3️⃣ Install dependencies

```
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_api_key_here
```

---

# ▶️ Run the Application

### Run full-stack locally (recommended)

```
npx vercel dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

### Run frontend only (UI testing)

```
npm run dev
```

Open:

```
http://localhost:5173
```

⚠️ Note: API will not work in this mode.

---

# 📸 Demo

Chat with the AI and receive intelligent responses instantly.

(Add your screenshots here)

---

---

# 🚀 Future Improvements

* 🗂️ Integrate cloud database for persistent chat history
* 🔐 Implement user authentication and session management
* 📤 Add chat export functionality (PDF/JSON formats)
* 🎙️ Enable voice-based interaction
* 🌙 Introduce dark/light theme toggle

---

# 👨‍💻 Author

**Lingraj Malipatil**

GitHub:
https://github.com/Lingu17

---

⭐ If you like this project, consider **starring the repository**!
