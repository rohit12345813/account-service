Account Service

Follow steps to start the server -
- npm install
- npm start

**API exposed to User Side**

# POST http://localhost:4000/api/account (default PORT 4000)

Create Account of User

# Location

**Method** | **Path**
---------- | -----------------
POST        | /api/account

# Inputs

**Name**     | **Location** | **Type** | **Description**      | **Required**
------------ | ------------ | -------- | -------------------- | ----------------
Content-Type | header       | String   | application/json     | true
email        | body         | String   | email of user        | true

```javascript
POST /api/account
{
  "email": "rohit@gmail.com"
}
```

# Outputs

## Success

### HTTP Head

**Field**  | **Value**
---------- | ---------
status     | 200

### HTTP Body

**Name**      | **Type**                  | **Description**
------------- | ------------------------- | --------------------------------------
error         | Boolean                   | True, If there is any error otherwise false
message       | String                    | Success or failure message basis on the error 
data          | Object                    | User account details with number 

```javascript
{
    "data": {
        "email": "rohit@gmail.com",
        "accountNumber": "1000032123"
    },
    "error": false,
    "message": "Request successfully performed!!"
}
```
___

**API exposed to Transfer Service Side**

# POST http://localhost:4000/api/account/deposit (default PORT 4000)

Deposit Amount to Account Number

# Location

**Method** | **Path**
---------- | -----------------
POST        | /api/account/deposit

# Inputs

**Name**     | **Location** | **Type** | **Description**      | **Required**
------------ | ------------ | -------- | -------------------- | ----------------
Content-Type | header       | String   | application/json     | true
authorization| header       | String   | Basic Token          | true
amount       | body         | Number   | Amount to deposit    | true
destinationAccountNumber       | body         | String   | Account Number   | true


```javascript
POST /api/account/deposit
{
  "amount":  100000,
  "destinationAccountNumber": "1000032123"
}
```

# Outputs

## Success

### HTTP Head

**Field**  | **Value**
---------- | ---------
status     | 200

### HTTP Body

**Name**      | **Type**                  | **Description**
------------- | ------------------------- | --------------------------------------
error         | Boolean                   | True, If there is any error otherwise false
message       | String                    | Success or failure message basis on the error 
data          | Object                    | User account details with number 

```javascript
{
    "data": {
        "accountNumber": "1000032123",
        "balance": "1000200000.000",
        "email": "rohit@gmail.com"
    },
    "error": false,
    "message": "Request successfully performed!!"
}
```

# POST http://localhost:4000/api/account/withdraw (default PORT 4000)

Withdraw amount from account number

# Location

**Method** | **Path**
---------- | -----------------
POST       | /api/account/withdraw

# Inputs

**Name**     | **Location** | **Type** | **Description**      | **Required**
------------ | ------------ | -------- | -------------------- | ----------------
Content-Type | header       | String   | application/json     | true
authorization| header       | String   | Basic Token          | true
amount       | body         | Number   | Amount to withdraw   | true
email        | body         | string   | email address        | true
sourceAccountNumber       | body         | String   | Account Number   | true       

```javascript
POST /api/account/withdraw
{
  "amount": 100000, 
  "sourceAccountNumber": "1000032123", 
  "email": "rohit@gmail.com"
}
```

# Outputs

## Success

### HTTP Head

**Field**  | **Value**
---------- | ---------
status     | 200

### HTTP Body

**Name**      | **Type**                  | **Description**
------------- | ------------------------- | --------------------------------------
error         | Boolean                   | True, If there is any error otherwise false
message       | String                    | Success or failure message basis on the error 
data          | Object                    | User account details with number 

```javascript
{
    "data": {
        "accountNumber": "1000037302",
        "balance": "999900000.000",
        "email": "rohit@gmail.com"
    },
    "error": false,
    "message": "Request successfully performed!!"
}
```
___

Note - APIs mentioned in the transfer service not called from user side.