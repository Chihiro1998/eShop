## Shop Part

## New Functionality:

- Allow users to add product to shopping cart
- Allow users to increase and decrease quantity of products in the shopping cart as well as deleting a product in the shopping cart
- Allow users to checkout items in the cart
- Allow users to directly buy one item in the product detail page
- Create a checkout session with stripe(test mode) for users to enter payment information
- Collecting money(test mode) from users using stripe
- Create order database to record all the order information, including user name and product information and total amount and created time, that users have placed

## Lessons Learned:

Part for Siyu Sun:
Stripe is a new payment tool to learn and there are many documentations to read in order to install and incorporate it. I start v0.3 early to allow more time to read and try out examples in the documentations and figure it out.
After incorporating “checkout sessions” in Stripe, we are able to collect money from users(test mode) using Stripe. However, listening to information from Stripe using webhooks(if money has been received) requires our server to be public(otherwise, Stripe will not be able to send information). As a result, our current code does not verify if money has been received automatically, and we can only check manually by going to the developer dashboard and seeing if the transaction exists.

## References

https://nextjs.org/blog/building-apis-with-nextjs
https://docs.stripe.com/get-started/development-environment
https://docs.stripe.com/api/checkout/sessions
https://docs.stripe.com/webhooks
https://www.youtube.com/watch?v=SR4dFgdKUyI&t=27984s

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
