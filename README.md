# Login & Authorization

This React application provides functionality for user login and signup. Upon successfully logging into the system, users are presented with a diagram displaying data retrieved from the server. Access to this page is restricted to users with a valid token. If the token is invalid, the application automatically redirects the user to the login page.

Also, Custom error messages are added to all inputs. If an input is empty, it displays 'This field is required.' Additionally, the following validations are applied: the email must be valid, phone numbers must follow the correct format, names and surnames must have a minimum of 3 characters, and passwords must be at least 6 characters long

## Usage Technelogies

@Material-Ui
@axios
@react-hook-form
@react-router-dom
@tanstack/react-query
@react-toastify
@recharts

### Features

Secure Authentication: Token-based login and signup flow.
Real-Time Data Updates: Fetches and updates data periodically without reloading the page.
Error Handling: Displays error messages for invalid or missing inputs.
Dynamic Diagrams: Visual representation of server data using Recharts.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Getting Started

Prerequisites

Node.js: Ensure you have Node.js installed on your system.
NPM or Yarn: A package manager is required to install dependencies.

### Installation

Clone the repository:
git clone https://github.com/Ferhad-Karimli/Registration-Login
Navigate to the project directory:
cd project
Install dependencies:
npm install
