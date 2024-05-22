## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository

   ```sh
   git clone <your-fork-repo-url>
   cd topshelfre
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Run the application

   ```sh
   npm start
   ```

4. Run tests
   ```sh
   npm test
   ```

### Running on VSCode

1. Open the project folder in VSCode.
2. Use the built-in terminal to run the installation and start commands.

### Containerization with Docker

1. **Pull the Docker image from Docker Hub**:

   ```sh
   docker pull ekbostan111/topshelfre-app:latest
   ```

2. **Run the Docker image**:

```sh
   docker run -p 3000:3000 -d ekbostan111/topshelfre-app:latest
```
