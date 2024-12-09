# Contact List App

## Overview

A React-based single-page app to manage contacts. Users can create, modify, delete, and view detailed contact information. The app uses a mocked API powered by JSON Server and is deployed on [Vercel](https://contact-list-app-indol.vercel.app/).

### Deployed App

[Contact List App](https://contact-list-app-indol.vercel.app/)

## Features

- Create, edit, and delete contacts.
- View contact details including name, job title, phone numbers, email, address, and an optional picture.
- Responsive UI using Material UI.

## Tech Stack

- **Frontend**: React
- **API**: JSON Server (mocked API)
- **UI**: Material UI
- **Deployment**: Vercel

## How to Run Locally

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/contact-list-app.git
   cd contact-list-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the app:

   ```
   npm run dev
   ```

4. Start the mocked API:
   ```
   npm run start:json-server
   ```

App will be available on http://localhost:5173 and API on http://localhost:3000.

## Running Tests

To run the unit tests:

```
npm test
```
