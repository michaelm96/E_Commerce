# ecommerce
customer site

* RESTful endpoint for E-commerce CRUD operation
* JSON formatted response

## URL
https://e-commerce-m96.web.app/

## RESTful endpoints
### POST /register

> user Register

_Request Header_
```
not needed

```

_Request Body_
```
{
  name : <posted-name>,
  email : <posted-email>,
  password : <posted-password>,
  role : <'admin' by default>
}
```

_Response (201)_
```
[
    {
        "access_token": "<When you register you automatically login and get access_token>"
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'VALIDATION_ERROR'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /login

> user Login

_Request Header_
```
not needed

```

_Request Body_
```
{
  email : <posted-email>,
  password : <posted-password>
}
```

_Response (200)_
```
[
    {
    "access_token": <This access token generated automatically when you Log-in>
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'INVALID_EMAIL_OR_PASSWORD'
  "message": "<returned error message>"
}
```

_Response (403 - Forbidden Access)_
```
{
  "errorCode" = 'FORBIDDEN_ACCESS'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /product

> Get all Product

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "Quiet" <Just an example>,
        "image_url": "http://QuietBySusanCain.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
    {
        "id": 17 <automatically created by database>,
        "name": "Sophie's World" <Just an example>,
        "image_url": "http://sophiesworld.jpg" <Fake image Url>,
        "price": 2356 <posted price of Product>,
        "stock": 1425451 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T13:14:23.442Z",
        "updatedAt": "2020-05-15T16:19:22.981Z"
    },
    {
        "id": 18 <automatically created by database>,
        "name": "The Psychology Book: Big Ideas Simply Explained" <Just an example>,
        "image_url": "http://ThePsychologyBookBigIdeasSimplyExplained.jpg" <Fake image Url>,
        "price": 35346 <posted price of Product>,
        "stock": 75675 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T14:59:14.634Z",
        "updatedAt": "2020-05-15T16:19:35.676Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /product/:id

> Find Product by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "Quiet" <Just an example>,
        "image_url": "http://QuietBySusanCain.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
]

```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
### POST /product

> Post new product

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>"
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>"
  "category": "<posted category of Product>"
}
```

__Request userData__
```
{
    "role" : <role after access_token decoded by authentication>,
}
```

_Response (201 - Created)_
```
{
    "id": 21 <automatically created by database>,
    "name": "The Highly Sensitive Person: How to Thrive When the World Overwhelms You" <Just an example>,
    "image_url": "http://HspByElaineNAron.jpg" <Fake image Url>,
    "price": 50000 <posted price of Product>,
    "stock": 4 <posted stock of Product>,
    "category": "Psikologi" <posted category of Product>,
    "updatedAt": "2020-05-16T02:02:02.946Z",
    "createdAt": "2020-05-16T02:02:02.946Z"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /product/:id

> Update product by Id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>"
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>"
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    "name": "Product Succesfully Updated"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### DELETE /product/:id

> Delete product by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
```


_Response (200 - Ok)_
```
{
    "message": "Product successfully deleted"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /customer/register

> user Register

_Request Header_
```
not needed

```

_Request Body_
```
{
  name : <posted-name>,
  email : <posted-email>,
  password : <posted-password>,
  role : <'customer' by default>
}
```

_Response (201)_
```
[
    {
        "access_token": "<When you register you automatically login and get access_token>"
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'VALIDATION_ERROR'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /customer/login

> user Login

_Request Header_
```
not needed

```

_Request Body_
```
{
  email : <posted-email>,
  password : <posted-password>
}
```

_Response (200)_
```
[
    {
    "access_token": <This access token generated automatically when you Log-in>
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'INVALID_EMAIL_OR_PASSWORD'
  "message": "<returned error message>"
}
```

_Response (403 - Forbidden Access)_
```
{
  "errorCode" = 'FORBIDDEN_ACCESS'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /productCustomer

> Get all Product for User/Customer

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "Quiet" <Just an example>,
        "image_url": "http://QuietBySusanCain.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
    {
        "id": 17 <automatically created by database>,
        "name": "Sophie's World" <Just an example>,
        "image_url": "http://sophiesworld.jpg" <Fake image Url>,
        "price": 2356 <posted price of Product>,
        "stock": 1425451 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T13:14:23.442Z",
        "updatedAt": "2020-05-15T16:19:22.981Z"
    },
    {
        "id": 18 <automatically created by database>,
        "name": "The Psychology Book: Big Ideas Simply Explained" <Just an example>,
        "image_url": "http://ThePsychologyBookBigIdeasSimplyExplained.jpg" <Fake image Url>,
        "price": 35346 <posted price of Product>,
        "stock": 75675 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T14:59:14.634Z",
        "updatedAt": "2020-05-15T16:19:35.676Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /productCustomer/search/:name

> Get all Product for User/Customer

_Request Body_
```
not needed
```

_Request Params_
```
{ name: ':name' }
// assuming :name = "a" so it will return any product that have "a" in their title
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "a" <Just an example>,
        "image_url": "http://a.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
    {
        "id": 17 <automatically created by database>,
        "name": "bac" <Just an example>,
        "image_url": "http://bac.jpg" <Fake image Url>,
        "price": 2356 <posted price of Product>,
        "stock": 1425451 <posted stock of Product>,
        "category": "Hukum" <posted category of Product>,
        "createdAt": "2020-05-15T13:14:23.442Z",
        "updatedAt": "2020-05-15T16:19:22.981Z"
    },
    {
        "id": 18 <automatically created by database>,
        "name": "fga" <Just an example>,
        "image_url": "http://fga.jpg" <Fake image Url>,
        "price": 35346 <posted price of Product>,
        "stock": 75675 <posted stock of Product>,
        "category": "Kuliner" <posted category of Product>,
        "createdAt": "2020-05-15T14:59:14.634Z",
        "updatedAt": "2020-05-15T16:19:35.676Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /productCustomer/category/:category

> Get all Product for User/Customer

_Request Body_
```
not needed
```

_Request Params_
```
{ category: ':category' }
// assuming :category = "Psikologi" so it will return any product with category "Psikologi"
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "a" <Just an example>,
        "image_url": "http://a.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
    {
        "id": 17 <automatically created by database>,
        "name": "bac" <Just an example>,
        "image_url": "http://bac.jpg" <Fake image Url>,
        "price": 2356 <posted price of Product>,
        "stock": 1425451 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T13:14:23.442Z",
        "updatedAt": "2020-05-15T16:19:22.981Z"
    },
    {
        "id": 18 <automatically created by database>,
        "name": "fga" <Just an example>,
        "image_url": "http://fga.jpg" <Fake image Url>,
        "price": 35346 <posted price of Product>,
        "stock": 75675 <posted stock of Product>,
        "category": "Psikologi" <posted category of Product>,
        "createdAt": "2020-05-15T14:59:14.634Z",
        "updatedAt": "2020-05-15T16:19:35.676Z"
    }
]

```

_Response (404 - Product_Not_Found)_
```
{
  "errorCode" = 'DATA_NOT_FOUND'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /banner

> Get all Banner data

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "buku" <Just an example>,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" <Just an example>,
        "createdAt": "2020-05-25T15:39:36.773Z",
        "updatedAt": "2020-05-25T15:39:36.773Z"
    },
    {
        "id": 2 <automatically created by database>,
        "name": "buku2" <Just an example>,
        "image_url": "https://images.unsplash.com/photo-1542086260-ddb62f405c8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2050&q=100" <Just an example>,
        "createdAt": "2020-05-25T15:57:27.103Z",
        "updatedAt": "2020-06-03T17:56:01.799Z"
    },
    {
        "id": 4 <automatically created by database>,
        "name": "buku3" <Just an example>,
        "image_url": "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1191&q=100" <Just an example>,
        "createdAt": "2020-05-25T16:35:33.488Z",
        "updatedAt": "2020-05-25T16:48:46.794Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /banner

> Post new banner

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
{
  "name": "<posted name of Banner>",
  "image_url": "<posted image of Banner>"
}
```

__Request userData__
```
{
    "role" : <role after access_token decoded by authentication>,
}
```

_Response (201 - Created)_
```
{
    "id": 6 <automatically created by database>,
    "name": "buku3" <posted name of Banner>,
    "image_url": "https://images.unsplash.com/photo-1546700908-f2001b40cf76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3075&q=100" <posted image of Banner>,
    "updatedAt": "2020-06-03T18:14:30.380Z",
    "createdAt": "2020-06-03T18:14:30.380Z"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /banner/:id

> Find Banner by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
// assuming :id = 6
```

_Response (200 - Ok)_
```
[
    "id": 6 <automatically created by database>,
    "name": "buku3" <posted name of Banner>,
    "image_url": "https://images.unsplash.com/photo-1546700908-f2001b40cf76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3075&q=100" <posted image of Banner>,
    "updatedAt": "2020-06-03T18:14:30.380Z",
    "createdAt": "2020-06-03T18:14:30.380Z"
]

```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /banner/:id

> Update Banner by Id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
{
  "name": "<posted name of Banner>",
  "image_url": "<posted image of Banner>"
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    "name": "Banner Succesfully Updated"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### DELETE /banner/:id

> Delete banner by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
```


_Response (200 - Ok)_
```
{
    "name": "Banner successfully deleted"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Banner not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /cart

> Get all Cart data

_Request Body_
```
not needed
```

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Response (200)_
```
[
    {
        "id": 6 <automatically created by database>,
        "name": "yza" <got from database>,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=100" <got from database>,
        "price": 123 <got from database>,
        "stock": 88 <got from database>,
        "category": "Kamus" <got from database>,
        "UserId": 19 <got from database>,
        "createdAt": "2020-06-02T18:19:04.721Z",
        "updatedAt": "2020-06-03T18:43:17.850Z"
    },
    {
        "id": 8 <automatically created by database>,
        "name": "bcd" <got from database>,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=100" <got from database>,
        "price": 456 <got from database>,
        "stock": 402 <got from database>,
        "category": "Agama" <got from database>,
        "UserId": 19 <got from database>,
        "createdAt": "2020-06-03T04:01:37.064Z",
        "updatedAt": "2020-06-03T10:28:40.829Z"
    },
    {
        "id": 13 <automatically created by database>,
        "name": "def" <got from database>,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=100" <got from database>,
        "price": 456 <got from database>,
        "stock": 320 <got from database>,
        "category": "Romance" <got from database>,
        "UserId": 19 <got from database>,
        "createdAt": "2020-06-03T07:47:23.529Z",
        "updatedAt": "2020-06-03T10:30:01.282Z"
    },
    {
        "id": 10 <automatically created by database>,
        "name": "stu" <got from database>,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=100" <got from database>,
        "price": 123 <got from database>,
        "stock": 12 <got from database>,
        "category": "Anak-Anak" <got from database>,
        "UserId": 19 <got from database>,
        "createdAt": "2020-06-03T07:03:05.890Z",
        "updatedAt": "2020-06-03T11:15:04.720Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /cart

> Post new product to Cart

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>",
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>",
  "category": "<posted category of Product>",
  "buy": "<amount that want to added to cart>",
}
```

__Request userData__
```
{
    "id" : <id after access_token decoded by authentication>,
}
```

// If in Cart posted product not exist yet
_Response (201 - Created)_
```
{
    "id": 21 <automatically created by database>,
    "name": "The Highly Sensitive Person: How to Thrive When the World Overwhelms You" <Just an example>,
    "image_url": "http://HspByElaineNAron.jpg" <Fake image Url>,
    "price": 50000 <posted price of Product>,
    "stock": 4 <posted stock of Product>,
    "category": "Psikologi" <posted category of Product>,
    "updatedAt": "2020-05-16T02:02:02.946Z",
    "createdAt": "2020-05-16T02:02:02.946Z"
}
```

// If in Cart posted product exist
_Response (200 - Updated)_
```
{ name: 'Cart succesfully updated' }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /cart/:id

> Update product in cart by Id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>"
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>"
  "buy": "<amount that want to added to cart>",
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    name: 'Cart succesfully updated'
}
```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
     "name": 'Product not found'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /cart/decrease/:id

> Update decrease product(s) in cart by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
{
  "buy": "<amount to decrease stock in cart>",
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    name: <name of updated product in cart>
}
```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
     "name": 'Product not found'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
