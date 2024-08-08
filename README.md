# Solar Equipment Marketplace

This application is a web-based platform that connects buyers and sellers of solar equipment. It allows multiple sellers to create an account and manage their inventory, which is then published on the website with availability information. Buyers can also create an account and browse and search for items, compare them, and contact sellers for more information. This platform simplifies the process of buying and selling solar equipment, making it more convenient and efficient for both buyers and sellers.

# Roles & Users of the System 

**Buyer:** A buyer is a user who purchases products from the suppliers through the system. A buyer can search for products, place orders, view order history, and manage their profile.

**Supplier:** A supplier is a user who sells products to the buyers through the system. A supplier can manage their product inventory, fulfill orders, view order history, and manage their profile.

**Product Admin:** A product admin is a user who is responsible for managing the product catalog in the system. A product admin can add new products, edit existing products, and delete products from the catalog. They can also view product information such as pricing, availability, and descriptions


# Architecture
``` mermaid

graph LR;
Frontend(Frontend) -- HTTP Request --> API_Gateway(API Gateway);
API_Gateway -- HTTP Request --> Auth_Service(Authentication and Authorization Service);
API_Gateway -- HTTP Request --> Product_Service(Product Service);
API_Gateway -- HTTP Request --> Order_Service(Order Service);
API_Gateway -- HTTP Request --> Supplier_Service(Supplier Service);
Auth_Service -- Table --> User_Table(User Table);
Auth_Service -- Table --> Role_Table(Role Table);
Auth_Service -- Redis --> Token_Cache(Token Cache);
Product_Service -- Table --> Product_Table(Product Table);
Order_Service -- Table --> Order_Table(Order Table);
Order_Service -- Table --> Product_Table(Product Table);
Supplier_Service -- Table --> Supplier_Table(Supplier Table);
Supplier_Service -- Table --> Product_Table(Product Table);
Supplier_Service -- Redis --> Inventory_Cache(Inventory Cache);
Supplier_Service -- Event Grid --> Order_Queue(Order Queue);

```````


    The frontend of the application communicates with the API Gateway through HTTP/HTTPS protocol.

    The API Gateway acts as a single entry point for all incoming requests and routes them to the appropriate microservice.

    The User Management Microservice is responsible for user registration, login, and managing user roles and permissions.

    The Inventory Management Microservice is responsible for managing the inventory of solar equipment.
    The Communication Microservice is responsible for managing communication between buyers and sellers about a product.

    The Notification Microservice is responsible for sending notifications to buyers and sellers about inventory updates.

    The microservices communicate with the MySQL database for storing and retrieving data.

    The application uses OAuth2.0 for authentication and authorization, and it has its own server.

    The application also uses Redis for caching and other performance-related operations.


``` mermaid
erDiagram
User ||--o{ Role : has
Supplier ||--o{ Product_Supplier_Map : has
Product_Supplier_Map ||--||   Product  : contains
Product_Supplier_Map ||--|| Supplier : has

  User {
  int userID PK
  varchar username 
  varchar password 
  }
  
  Role {
    int roleID
    varchar roleName
    varchar description
  }
  
  Supplier {
    int supplierID PK
    varchar name
    varchar contact
  }
  
  Product {
    int productID PK
    varchar name
    text desc
    varchar category
    varchar manufacturer
    decimal price
    varchar image
    datetime created_at
    datetime updated_at
  }
  
  Product_Supplier_Map {
    int mapID PK
    int productID FK
    int supplierID FK 
    tinyint avail
  }


```
#  APi's

    Authentication and Authorization Service:

    POST /auth/login
    POST /auth/logout

    Product Service:

    GET /products
    GET /products/{id}
    POST /products
    PUT /products/{id}
    DELETE /products/{id}

    Order Service:

    GET /orders
    GET /orders/{id}
    POST /orders
    PUT /orders/{id}
    DELETE /orders/{id}

    Supplier Service:

    GET /suppliers
    GET /suppliers/{id}
    POST /suppliers
    PUT /suppliers/{id}
    DELETE /suppliers/{id}


# Installation
1 Clone the repository
```bash
git clone git@github.com:gridchef/sim-api.git
```
2 Install dependencies
```bash
npm install
```
3 Create a .env file in the root directory and add the necessary environment variables.
  
4  Create a MySQL database and run the provided SQL scripts to create the necessary tables.
 
5 Start the application
```bash
npm start
```
# Testing
1 Create a .env.test file in the root directory and add the necessary environment variables.
```bash
npm test
```
# Deployment    

# Authors
- [Mazher Mehboob](@mmehboob) 
