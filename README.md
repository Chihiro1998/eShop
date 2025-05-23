# 🛒 E-Shop: Ecommerce Web Application with Admin Dashboard (Built with Next.js)

**Introduction:** A full-featured e-commerce web application with Admin Dashboard built using **Next.js App Router**.  
It supports product browsing, wishlist management, user account pages, and an admin dashboard to manage the shop.

HomePage ScreenShoot:
![Demo Screenshot](https://github.com/user-attachments/assets/17542b05-2cdd-400c-b2ab-a9fcbc022a30)

---

This project is the Final Project of CS5610 Web Dev.  
Our team members are as follows:  
- **Team Lead:** Yuchen Kuang  
- **Team Members:** Yantong Guo, Siyu Sun

## 👥 Team Roles & Contributions

This project was developed collaboratively as the final project for the CS5610 Web Development course.  
Each team member contributed to distinct areas of the application as outlined below:

- **Yuchen Kuang (Team Lead)**  
  ▸ Designed the overall **project architecture and file structure**  
  ▸ Responsible for **MongoDB data modeling** and schema design in shop  
  ▸ Led the **UI/UX and visual design**, including page layout and component styling  
  ▸ Integrated key application routes and coordinated module development such as User Dashboard, Product Card, WishList, Product Detail Page, Home Page and so on

- **Siyu Sun**  
  ▸ Built the **shopping cart** functionality with add/remove logic  
  ▸ Integrated **Stripe Checkout** for secure payments   

- **Yantong Guo**  
  ▸ Developed the **Admin Dashboard** for managing products, collections, and orders  
  ▸ Implemented backend **CRUD API endpoints** with access control  
  ▸ Designed and connected admin UI components with backend logic 

---

## ✨ Shop Features

- ✅ Product listing and detail pages
- ❤️ Wishlist with heart icon (supports local and backend sync)
- 👤 Account center with optional catch-all routing (`[[...rest]]`)
- 🛒 Cart functionality with add-to-cart logic
- 🔒 Authentication-aware UI interactions
- 💳 Safe payment support (for logged-in accounts)
- 📜 Order history viewing
- 🚧 To be continued... (many features are still being optimized)

---

## ✨ Admin Features

- 👥 Authentication using **Clerk**
- ⚙️ Built with **Next.js (App Router)**
- ☁️ Image storage via **Cloudinary**
- 🧾 Data stored in **MongoDB Atlas**
- 🧩 Components powered by **shadcn-ui**
- 🎨 Styled with **Tailwind CSS**

---

## 🧱 Tech Stack

| Layer        | Tech                      |
|--------------|---------------------------|
| Framework    | [Next.js 13+ (App Router)](https://nextjs.org/) |
| UI Framework | React + Tailwind CSS      |
| State Mgmt   | useState / useEffect + Custom Hooks |
| Routing      | App Router (`page.tsx`, `layout.tsx`, `[productId]`, `[[...rest]]`) |
| Storage      | localStorage for guests, API + DB for logged-in users |
| Backend API  | Next.js API Routes        |
| Authentication | Clerk                   |

---

## 🚀 Getting Started

To run this project locally:

```bash
# 1. Clone the repo
git clone https://github.com/nuwebdev/project-spring25-Chihiro1998.git
cd project-spring25-Chihiro1998
# If you want to run the shop:
cd shop
# If you want to run the Admin:
cd admin
# OR run the admin dashboard:
cd admin
# 2. Install dependencies
npm install
# 3. Run the app locally
npm run dev
# 4. Open in browser
http://localhost:3000
```
---
## ✨ Project Structure

This project consists of two parts- Shop & Admin Dashboard. The source code of the mall is in the Shop directory, and the admin dashboard for merchants to list and remove goods and ship them is in the Admin directory. The following is the project structure of the shop part:

```
shop
├── README.md
├── app
│   ├── (auth)                                     # Authentication pages (sign-in, sign-up)
│   │   ├── layout.tsx
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.tsx
│   │   └── sign-up
│   │       └── [[...sign-up]]
│   │           └── page.tsx
│   ├── (root)                                      # Root layout
│   │   ├── account                                 # User dashboard sections (profile, orders, wishlist, address)
│   │   │   ├── AddressBookSection.tsx
│   │   │   ├── MyProfileSection.tsx
│   │   │   ├── OrdersSection.tsx
│   │   │   ├── WishlistSection.tsx
│   │   │   └── page.tsx
│   │   ├── cart                                   # Shopping cart page
│   │   │   └── page.tsx
│   │   ├── collections                            # Collection display pages
│   │   │   └── [collectionId]
│   │   │       ├── CollectionClient.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx                            
│   │   ├── page.tsx
│   │   ├── payment_success
│   │   │   └── page.tsx
│   │   ├── product                                # Product detail page
│   │   │   └── [productId]
│   │   │       └── page.tsx
│   │   ├── search     
│   │   │   └── page.tsx
│   │   ├── user
│   │   │   └── [[...rest]]
│   │   │       └── page.tsx
│   │   └── wishlist
│   │       └── page.tsx
│   ├── api
│   │   ├── addresses
│   │   │   └── route.ts
│   │   ├── checkout
│   │   │   └── route.ts
│   │   ├── collections
│   │   │   ├── [id]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── orders
│   │   │   └── route.ts
│   │   ├── products
│   │   │   ├── [productId]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── search
│   │   │   └── route.ts
│   │   └── wishlist
│   │       ├── [productId]
│   │       │   └── route.ts
│   │       ├── guest
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── favicon.ico
│   └── globals.css
├── components
│   ├── collection
│   │   └── CollectionList.tsx
│   ├── layout
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── product
│       ├── CategoryProductList.tsx
│       ├── CategorySelector.tsx
│       └── ProductCard.tsx
├── eslint.config.mjs
├── lib
│   ├── hooks
│   │   ├── useCart.tsx
│   │   └── useWishlist.ts
│   ├── models
│   │   ├── Collection.ts
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   └── mongoDB.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── Banner.png
│   ├── Logo.png
│   ├── category-icons  
│   └── images
│       ├── Banner.png
│       ├── auth-bg.png
│       ├── collections
│       │   
│       └── products
│      
├── tailwind.config.ts
└── tsconfig.json
```



