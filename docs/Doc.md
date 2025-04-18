# E-Commerce Project Proposal

- **Author:** Yuchen(Olivia) Kuang,Yantong Guo,Siyun Sun
- **Date:** 2025/2/27

---

## Team

- **Team Lead:** Yuchen Kuang
- **Team Members:** Yantong Guo, Siyu Sun

---

## Shop Part

### New Functionality:

(Yuchen):

- Create the whole Structure for the Project.
- NavBar for Homepage
- NavBar for Admin Page
- Figma for the whole design style control for the whole project
- Allow users to search the Product according the description, title(product name) and tag/category.
- Create the Whole Homepage include the Banner,the product card, the Collections and so on.
- Allow users to add things in their wish list without log in.
- Allow users to add things to the wishlist in log in state.
- Allow users to see Products in detail Page from product card.
- Parallax scrolling is implemented on the product details page.
- Create user/product/collections Date schema.
- Create the user Dashboard for User.
- Create the user to edit their default address in the Address book.
- Allow users to find product with category filter(The icon one).
- Integrate Login in and Register Page with Clerk.

(Siyu):

- Allow users to add product to shopping cart
- Allow users to increase and decrease quantity of products in the shopping cart as well as deleting a product in the shopping cart
- Allow users to checkout items in the cart
- Allow users to directly buy one item in the product detail page
- Create a checkout session with stripe(test mode) for users to enter payment information
- Collecting money(test mode) from users using stripe
- Create order database to record all the order information, including user name and product information and total amount and created time, that users have placed

### Lessons Learned:

Part for Me (Yuchen):

- Teamwork: Most of the time, I complete a project by myself. This is my first time as a team lead, and I am glad that my team members are very supportive of me. However, based on this assignment, I think there are still many things I need to improve, such as the design of some Schemas. When designing Products and Collections, I need to consider the usage logic of the Admin side, otherwise it will interfere with other parts. For example, I wrote AddressArray in the User Schema, but this part was not discussed and confirmed with Yantong. Its platform defaults to displaying one Address for one User, so we decided to keep the modification to a minimum and read the default address by default. There are many such things that made me realize that as a team lead, in addition to technical details, you also need strong overall architectural capabilities and be able to foresee some "things that may happen."
- Project Structure & Functionality:
  1.In the V2.0, the entire project was changed from Vite to Next.js. The reasons for the technology selection are: first, I think its routing system is simpler, and there is no need to manually integrate React Router to directly generate page paths according to folder paths. Second, Next.js supports API Routes, which allows you to quickly write interfaces within the project without having to build Express/Koa services separately. I think it is quite applicable in our project. The third is that if you need to deploy it later, it is launched by Vercel and deployed on Vercel with zero configuration.

  2.When implementing Wishlist, I found that my lighting logic could not be maintained. For example, after lighting up and returning to the homepage, the heart on the product card was not lit, but the product could appear in my Wishlist Page and the database also had the item. The main reasons were: the management of the `liked` state in multiple logics was chaotic and multiple pages managed wishlists independently. Solution: Finally, encapsulate the `useWishlist()` Hook, unify the management of obtaining wishlist ID and toggle logic, and pass `initialLiked` to all pages that use `ProductCard` to solve related problems.

Part for Siyu Sun:
Stripe is a new payment tool to learn and there are many documentations to read in order to install and incorporate it. I start v0.3 early to allow more time to read and try out examples in the documentations and figure it out.
After incorporating “checkout sessions” in Stripe, we are able to collect money from users(test mode) using Stripe. However, listening to information from Stripe using webhooks(if money has been received) requires our server to be public(otherwise, Stripe will not be able to send information). As a result, our current code does not verify if money has been received automatically, and we can only check manually by going to the developer dashboard and seeing if the transaction exists.

### Design

Based on the preliminary design of Figma and the tailwind Css to control the style of the whole project. The product card and collection are responsive, but there are still some problems with the responsive design of the overall page (because I didn't do the NavBar part), and I will make further adjustments later.

1.Homapage

### References

https://nextjs.org/blog/building-apis-with-nextjs
https://docs.stripe.com/get-started/development-environment
https://docs.stripe.com/api/checkout/sessions
https://docs.stripe.com/webhooks
https://www.youtube.com/watch?v=SR4dFgdKUyI&t=27984s

https://global.mardimercredi.com/index.html
(All the picture and Description we use for test come form this brand)

---

## Admin Part

### New Functionality

- Using Clerk for user authentication
- Using Next.js framework for development
- Using MongoDB Atlas for database
- Using Cloudinary for image uploads
- Using shadcn-ui for components (like buttons, tables)
- Using Tailwind CSS for style management

### Design

1. Admin account setup: Account credentials are configured directly through Clerk, with no registration available on the frontend, only Login page. (Requires adding NEXT_PUBLIC_ADMIN_ID in environment variables)
2. Main page (/dashboard): Displays key metrics including number of orders, website users, total sales, and total profits. Features charts showing monthly sales and profit trends.
3. Collection management (/dashboard/collections): Interface to view, edit, delete, and add collections. (Collections are groups of related products; admin can create series and add products to them)
4. Product management (/dashboard/products): Interface to view, edit, delete, and add products.
5. Order management (/dashboard/orders): Includes order list view and detailed order pages.
6. Customer management (/dashboard/customers): Displays users.

### References

- Shadcn-ui: _UI Components_. Retrieved from https://ui.shadcn.com/docs
  - Components used: button, input, label, separator, form, select, table, alert-dialog
- Cloudinary: _Image Uploads with Cloudinary_. Retrieved from https://cloudinary.com/documentation
- Clerk: _Admin Authentication_. Retrieved from https://clerk.dev/docs

### Lessons Learned

1. Image upload implementation: When implementing image uploads with shadcn/ui's FormField component to handle image URLs, I encountered an issue where field.value would reset to an empty value during new additions, causing failures. To resolve this, I created a custom onChange handler using form.getValues() and form.setValue() methods to properly maintain the values.

2. Dashboard performance optimization: The dashboard initially loaded slowly because it needed to calculate order sales data, sometimes resulting in unresponsive navigation. To improve this, I refactored the dashboard displays into separate components and implemented lazy loading using Next.js's dynamic imports. This approach allows the dashboard page to load first with placeholders, then progressively render the components as data becomes available. Additionally, I wrapped table components with React.memo to prevent unnecessary re-renders when data remains unchanged, leveraging component caching for better performance. These optimizations significantly improved the user experience by reducing load times and increasing responsiveness.
