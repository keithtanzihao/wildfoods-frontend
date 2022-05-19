# WildFoods 

### Disclaimer

The current project is a duplicate of the [WildSouls](https://www.wildsouls.gr/en/) e-commerce website and this project is solely for education purposes should not be mistaken for the actual site. Majority of the information found in this replicate from product information, images, to the brand icon is from Wildsouls.

Customer Frontend link: [here](https://app.netlify.com/sites/lovely-gaufre-01d524/overview)
Backend Admin link: [here](https://wildfoodsbackend.herokuapp.com/admin/login)

# Project Summary

### Organisational Goals

Sugar, palm oil, preservatives and a lot of other unnecessary substances are commonly found in many products sold by local supermarkets today, adulterating the magical flavours of natural raw foods. Here at WildFoods, we have always been a proponent of highlighting the value of natural ingredients and the incredible taste of simplicity. Thus we have set out to provide customers with a plethora of products which not only abides by this mantra but also tastes great.

### Customer’s Goals

In a generation that places high emphasis on overall well-being, fuelling one’s body with nutritious food is the first step to achieving that goal. However, the delicious foods found in our local supermarkets often composed of multiple preservatives and often stripped off their original nutrients and fibres. Thus there has been a growing desire for shops which sells food products, free of these undesirable ingredients but still delicious and affordable.

# UI/UX

### Strategy

_Organisation:_
  * **Objective:** 
      * Centralised e-commerce website that focus on selling nuts, jams, related food products sourced from the wild. (Greece)
      * Users are able to view common recipes made out from the various products sold by WildFoods (Will implement in the future)

_User:_
  * **Objective:** 
      * To be able to add products to cart, checkout products within cart, view/track orders
      * Account which saves customer information (only cart/order completed, will implement more in the future)

  * **Needs:**
      * Search for nuts, jams, desired food products.
      * Search up recipes which uses nuts, jams, food products sold by WildFoods (Will implement in the future)

  * **Demographics:**
      * Customers of all ages
      * Enthusiastic about healthy eating

  * **Pain Point:** 
      * Need to categorise/search products quickly
      * Need to checkout products and track orders

### User Stories / Acceptance Criteria

| User Stories               | Acceptance Criteria(s).    | 
| -------------------------- |----------------------------| 
| As a customer, I am look for Tahini related food products| Food products need to be searchable by category
| As a customer, I am looking for the food product based on various filters| User must be able to search products based on name, order them by price, search by nutritioin/classification and lastly by availability
| As a customer, I must be able to add a product to my cart and checkout my cart| Users must be able to add products to cart, edit/remove items from cart and submit them as an order to be processed by a payment gateway. This information must then be available to users to track status of order
| As a customer, I must be able to create/access my account| Users must be able to register for a new account, only allow user with correct credentials from accessing information in this account. Prevents unauthorised access to user's cart/order information

### Scope

_Functional Specifications:_
  * Login page which allows users to create a new account or register for one
  * Display products and showcase greater detail if product is selected
  * Filter products based on name, nutrition, classification, availability and sort based on cost
  * Save selected products to cart, process cart using Stripe payment gateway and showcase orders page with purchased products if payment is successful

_Content Requirements:_
  * Show all products found in WildFoods store
  * Show/retain cart information of user
  * Show all orders made by user.

 _Non-functional Requirements:_
  * Mobile Responsiveness
      * Using media queries and flex-box

### Structure

Due to the lack of time, I was unable to completely implement features for all the extra tables ive created such as Recipie tables, etc. Thus i have left them out of the displayed SQLDBM image. (Will implement those tables in the future)

![alt text](https://github.com/keithtanzihao/wildfoods-frontend/blob/main/src/styles/vendors/images/Screen%20Shot%202022-05-19%20at%207.44.57%20PM.png)

The database design is developed on sqlDBM and shows the different relationships between the mysql tables. 

An ExpressJS backend server will thus be required to allow communication between our frontend reactJS client webpage and the WildFoods database. The admin page will however be build within the ExpressJS backend using handlebarsJS and will solely manage the creation/edit/delete of products/recipes and allow the administrator to manage the status of our products.

### Surface

_Colors:_

![alt text](https://github.com/keithtanzihao/wildfoods-frontend/blob/main/src/styles/vendors/images/Screen%20Shot%202022-04-22%20at%203.33.22%20PM.png)

* Palette colours that reminds customers of autumn were used for the base layout of the website’s pages.
* Additional colours used in the different product pages are taken from WildSoul’s website. Each product has a different color theme and these colours are brighter compared to the base colour scheme to give emphasis to the product’s characteristic or what is being sold.


Font Scheme

* Both Apercu and Canela fonts were used in this project. These fonts are currently utilised by the actual Wildsouls website and they provides an old school feel to the website and goes hand in hand with the colour scheme which aims to create a homely retro vibe which ties closely with the mantra of the company.


# Technologies Used

### Frontend
* html
* dart-scss / sass
* axios
* jwt-decode
* reactjs
* framer-motion
* react-multi-carousel
* simple-notify

### Backend
* body-parser
* bookshelf
* cloudinary
* connect-flash
* crypto
* cors
* csurf
* db-migrate
* dotenv
* express
* express-session
* forms
* hbs
* jsonwebtoken
* knext
* stripe
* wax-on

### Others
* Github
* Netlify

# Credits

* Website's idea, UI, UX, product information
    * [WildSouls](https://www.wildsouls.gr/en/)
* Deployment steps
    * Extracted and edited based on TGC's deployment guide









