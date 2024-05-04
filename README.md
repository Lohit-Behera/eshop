# Ecomore Project

This is a simple e-commerce website project called "Eshop".

## Features

- Light/dark mode toggle
- User authentication: Users can sign up and log in to their accounts with email verification.
- Product Browsing: Users can browse through available products.
- Product Search: Users can search for specific products.
- Product details: Users can view detailed information about each product.
- Add to cart: Users can add products to their shopping cart.
- Cart management: Users can view and manage items in their shopping cart.
- Checkout: Users can proceed to checkout and place orders.
- Payment gateway integration: Razorpay payment gateway integration for secure online payments.
- User management: Admin can view all user details, promote users to admin status, and delete users.
- Product management: Admin can create, update, and delete products.
- Order management: Admin can view all orders placed by users.

## Tech Stack

**Client:** Vite React JS, ReduxToolkit, TailwindCSS, Shadcn UI

**Server:** Django REST framework

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in Backend

`SECRET_KEY`

`EMAIL_HOST_USER`
`EMAIL_HOST_PASSWORD`

`RAZORPAY_API_KEY`
`RAZORPAY_API_SECRET`

`USER`
`PASSWORD`
`HOST`
`PORT`

In Frontend

`VITE_RAZORPAY_KEY`

## Installation

Clone the repository:

```bash
  git clone https://github.com/Lohit-Zeno/eshop.git

```

Navigate to the project directory:

```bash
  cd eshop
```

Create Python virtual environment using [virtualenv](https://virtualenv.pypa.io/en/latest/):

```bash
  pip install virtualenv
```

```bash
  python -m venv myenv
```

```bash
  myenv\Scripts\activate
```

install python libraries

```bash
  cd backend
```

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python manage.py runserver
```

In another terminal for React js

```bash
  cd eshop
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Screenshots

![App Screenshot](https://drive.usercontent.google.com/download?id=1v1hx1evRXK18JDd6OJrjIvFjvJo6F3m6)
