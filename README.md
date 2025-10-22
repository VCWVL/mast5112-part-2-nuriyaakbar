[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZfGMkbmi)
 Christoffel's Kitchen - Private Chef App

This is a front-end prototype for "Christoffel's Kitchen," a web application connecting users with a private chef. The application is built as a single-file React component using TypeScript and styled with Tailwind CSS. It demonstrates responsive UI/UX for both customers and the chef, with distinct views and functionalities for each role.

 ✨ Features

### Customer View
- **Authentication**: Simple login/signup form.
- **Menu Browsing**: View menu items, filterable by categories (Starters, Mains, Desserts).
- **Search**: Search for specific dishes within the menu.
- **Item Details**: Click on an item to see a detailed view in a modal.
- **Shopping Cart**: Add items to the cart, view the cart, and see the total price.
- **Responsive Navigation**: A bottom tab bar for mobile and a persistent sidebar for desktop.
- **Placeholder Screens**: Includes placeholders for Profile, Bookmarks, and Checkout pages to illustrate the complete user flow.

 Chef View
- **Menu Management**: A dedicated dashboard to view all menu items, grouped by category.
- **CRUD Operations**:
    - **Add** new items to the menu.
    - **Edit** existing item details (name, description, price, etc.).
    - **Delete** items from the menu.
- **Modal-driven Interface**: All CRUD operations are handled through clean, intuitive modals.

 🚀 Getting Started

This project is set up to run in a web environment, likely using a framework like Create React App or Vite.

Prerequisites
- Node.js and npm (or yarn)

Installation & Running
1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    This will typically open the application in your web browser at `http://localhost:3000`.

 🛠️ Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type safety and improved developer experience.
- **Tailwind CSS**: For utility-first styling.
- **React Native SVG**: Used for scalable vector icons.
- **State Management**: All state is managed locally within the `App` component using React Hooks (`useState`, `useEffect`).

 🧑‍🍳 How to Use

The application has mock authentication logic to demonstrate the two different user roles:

-   **To log in as a Chef**: Enter an email address that contains the word `chef` (e.g., `chef@kitchen.com`).
-   **To log in as a User/Customer**: Enter any other email address.

All data is mocked and stored in the application's state, so any changes (like adding items to the cart or editing the menu) will be reset upon refreshing the page.
