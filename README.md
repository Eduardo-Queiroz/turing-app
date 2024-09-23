# Turing App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
  - [Videos](#videos)
  - [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Turing App is a cutting-edge chat application inspired by Omegle, offering users the unique experience of conversing either with a human or an advanced Large Language Model (LLM). With a seamless Firebase backend, Turing App ensures real-time communication and scalability. The app features both dark and light themes, a modern structure utilizing hooks, re-style components, and comprehensive unit testing to guarantee reliability and performance.

(LLM cloud function is disabled for trashlabs test interview)

## Features

- **Anonymous Chatting:** Connect with random users or AI-powered bots.
- **Human or LLM Detection:** Toggle a mode to interact without knowing if you're chatting with a human or an LLM.
- **Theming:** Switch between dark and light themes to suit your preference.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Real-time Messaging:** Powered by Firebase for instant communication.
- **Modern Architecture:** Built with React hooks and re-style for maintainable and scalable code.
- **Unit Testing:** Ensures the application runs smoothly and bugs are minimized.
- **Media Support:** Easily share and view videos and screenshots within the chat.

## Demo

### Videos

https://github.com/user-attachments/assets/e584f065-9db9-4ebf-b414-b265f8578150


## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli) (run cloud functions locally)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Eduardo-Queiroz/turing-app.git
   cd turing-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn 
   ```

3. **Install pods (iOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the Application
### For Android:
1. Open an Android emulator or connect a physical device.
2. Run the command:
   ```bash
   yarn android
   ```

### For iOS:
1. Open the file `ios/YourProject.xcworkspace` in Xcode.
2. Select the desired device or simulator.
3. Click the run (play) button in Xcode.

Alternatively, you can run the command:
```bash
yarn ios
```

## Support
For additional help, contact [eduqueiroz21@gmail.com] or open an issue in the project repository.
