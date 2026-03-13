# Game of Thrones Characters Explorer

This is an Angular application that allows users to explore the characters from the world of Game of Thrones. Users can register, log in to their accounts, and if authenticated, they can manage their favorite characters.

## Tech stack

**Frontend:** Angular (v19)  
**Styles:** SCSS  
**State Management:** NgRx  
**Backend:** Express

## Project Structure

```
GOT/
├── public/
│   ├── assets/
│   │   ├── backgrounds/
│   │   ├── border/
│   │   ├── heroes/
│   │   └── images/
│   ├── fonts/
│   └── favicon.ico
│
├── server/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── enums/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   ├── pipes/
│   │   ├── services/
│   │   └── store/
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── definitions.scss
│
├── angular.json
└── package.json
```

## 🚀 How to start the project

### Clone the project

```bash
git clone https://github.com/lakrizz1987/GOT.git
```

### Install dependencies

```bash
cd GOT
npm install
```

### Start the Server

```bash
cd server
node server.ts
```

or

```bash
npm run start-server
```

When the server starts, you will see these messages:

```
Test user 'ivan' is loaded
Server is running on port - 5000
```

## 🔑 Test User

Use these credentials to log in:

```
Username: ivan
Password: 1234
```

## Start the Frontend

Open a new terminal, go to the main project folder and run:

```bash
ng serve
```

Once the application is running, open your browser and go to:

```
http://localhost:4200
```