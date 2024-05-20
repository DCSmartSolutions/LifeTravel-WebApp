# LifeTravelApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Json Server (Local)

You can use JSON Server locally to simulate a backend server for your application. To do this, follow these steps:

1. Install JSON Server globally if you haven't already:

```sh
npm install -g json-server
```

2. Start JSON Server with your local JSON data file and routes (adjust the paths as needed):

```sh
json-server --watch server/db.json --routes server/routes.json
```

3. JSON Server will be running at `http://localhost:3000/`, and you can access your data using this URL.

## Json Server (Typicode)

Alternatively, you can use a public JSON server like `typicode` for testing and development. This eliminates the need to set up a local server. Replace your `baseUrl` in your Angular service with the following:

```typescript
private baseUrl = 'https://my-json-server.typicode.com/DominikMendoza/data/';
```
