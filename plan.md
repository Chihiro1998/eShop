# E-Commerce Project Implementation Plan

- **Author:** Yuchen(Olivia) Kuang,Yantong Guo,Siyun Sun
- **Date:** 2025/2/27
  
## Requirements

### Prioritized Project Objectives

#### v0.1: Basic UI and Navigation (HTML, CSS, React Setup)
- Implement static web pages with basic UI design.
- Set up project repository with proper folder structure.
- Implement navigation between key pages (Home, Product Listing, Product Details, Cart, Checkout, Admin Dashboard).

#### v0.2: Functional Prototype with Basic Features
- Develop a user authentication and authorization system:
  - **Sign-up/Login:** Enable users to create accounts and log in securely using JWT authentication.
  - **User Profiles:** Allow users to update their personal information.
- Set up the backend API using Express.js and MongoDB to handle:
  - **User Management:** Store and retrieve user information.
  - **Product Management:** Retrieve product details and availability.
  - **Order Processing:** Store order details and payment status.
- Implement shopping cart functionality:
  - **Add to Cart:** Allow users to add products to their cart.
  - **Remove/Update Quantity:** Enable users to modify their cart before purchase.
  - **Persist Cart Data:** Store cart information for logged-in users.

#### v0.3: Full E-Commerce System
- Integrate a payment gateway (Stripe or PayPal) for secure online transactions.
  - **Payment Processing:** Ensure secure and reliable transactions.
  - **Order Confirmation:** Provide real-time order confirmation and receipts.
- Implement order processing and order history tracking for users:
  - **Order Status:** Allow users to track their orders (pending, shipped, delivered).
  - **Order History:** Enable users to review past purchases.
- Develop an admin dashboard with full management functionalities:
  - **Product Management:** Add, update, and delete products.
  - **Order Management:** View and manage customer orders.
  - **User Management:** Manage user accounts and access levels.

## Key Tasks & Roles/Responsibilities

### v0.1
- **Design UI wireframes & create page structure** - *Yuchen Kuang*
- **Implement React components & page routing** - *Yantong Guo*
- **Style pages using CSS (Tailwind/Bootstrap)** - *Siyun Sun*

### v0.2
- **Develop authentication system (JWT-based login/sign-up)** - *Yuchen Kuang*
- **Set up Express.js backend with MongoDB for user & product data** - *Yantong Guo*
- **Implement shopping cart functionality** - *Siyun Sun*

### v0.3
- **Integrate payment gateway (Stripe or PayPal)** - *Yuchen Kuang*
- **Implement order processing & history tracking** - *Yantong Guo*
- **Develop admin dashboard for managing products, orders & users** - *Siyun Sun*

## Schedule
### Schedule -- Spring 2025

| Week | Date   | Module      | Description | Assignment |
| ---  | ---    | ---         | ---         | --- |
| 1    | 27 Feb | **Team Online Meeting 01** | Discuss Team Leader and project goals | Wirtting Proposal and Plan |
| 2    | 28 Feb | **Project Proposal Submission** | Submit initial project proposal and plan | Proposal due |
| 3    |  7 Mar | **Team Online Meeting 02**| Check out the progress of V1 and the discussion on adjustments needed | V0.1 Key Tasks|
| 4    | 14 Mar | **v0.1 Review** | In-class v0.1 review & instructor-team discussions |  v0.1 due |
| 5    | 21 Mar | **Team Online Meeting 03** | Check out the progress of V2 and the discussion on adjustments needed | V0.2 Key Tasks|
| 6    | 28 Mar | **v0.2 Review**  | In-class v0.2 review & instructor-team discussions | v0.2 due |
| 7    |  4 Apr | **Team Online Meeting 04** | Check out the progress of V3 and the discussion on adjustments needed | V0.3 Key Tasks|
| 8    | 11 Apr | **v0.3 Presentations**  | In-class project demos | v0.3 & Docs due |
| 9    | 18 Apr | **v0.3 Presentations (Day 2)**  | | --- |
| ---  | Finals Week | No Class  | --- | --- |
