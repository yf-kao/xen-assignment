# Xen Coding Assignment - Leila Kao

---

# Rest API

* For simplicity, I made some assumptions: 
    1. Delete user will not delete pictures under this user. In many system it can have a service to check and clear those pictures.(Garbage Collection)

    2. No forign key between picture and user table.
    3. Picture will upload and store on local folder. In practice it should be upload to distributed storage like s3.
    4. No 2nd index for filter. In practice we should have indexes base on the query patten.
    5. No authentication. No token to check user can upload picture or not.(Non exists user can upload picture)
    6. No unit test.


## Installation

```bash
$ git clone git@github.com:yf-kao/xen-assignment.git
```

## Run project

### Step 1: Prerequisites
Node JS : https://nodejs.org/en/download/

### Step 2: Install
From the root directory of the repo, run:

`npm install`


### Step 3: Run
From the root directory of the repo, run:

`npm start`

You can then view the project in your browser at http://localhost:3000.


---

## API


### Swagger

http://localhost:3000/api


### Users
#### 1. create user
##### POST /users

Create new user.

* Body


| Parameter | Type     | Required |
| --------  | -------- | -------- |
| email     | String   | true     |
| name      | String   | true     |

``` json
{
    "email": "test@test.com",
    "name": "name"
}
```

* response

``` json
{
    "id": 1,
    "email": "test@test.com",
    "name": "name",
    "createdAt": "2020-11-08T14:28:42.937Z",
    "updatedAt": "2020-11-08T14:28:42.937Z"
}
```

#### 2. get users
##### Get /users

Get all users.

* Query String

| Parameter | Type     | Required |  Noted      |
| --------  | -------- | -------- | ----------  |
| email     | String   | false    |             |
| name      | String   | false    |             |
| offset    | Int      | false    | default: 0  |
| limit     | Int      | false    | default: 10 |



1. example uri:
`/users?email=test@test.com&name=name&offset=0&limit=1`

* response

``` json
[
    {
        "id": 1,
        "email": "test@test.com",
        "name": "name",
        "createdAt": "2020-11-08T14:28:42.937Z",
        "updatedAt": "2020-11-08T14:28:42.937Z"
    }
]
```

#### 3. get user by user ID
##### Get /users/{id}

Get a user by userId

* response
``` json
{
    "id": 1,
    "email": "test@test.com",
    "name": "name",
    "createdAt": "2020-11-08T14:28:42.937Z",
    "updatedAt": "2020-11-08T14:28:42.937Z"
}
```

#### 4. Update user by user ID
##### PATCH /users/{id}

Update user info by userId.

* Body


| Parameter | Type     | Required |
| --------  | -------- | -------- |
| email     | String   | true     |
| name      | String   | true     |


``` json
{
	"id": 3000,
	"password": "password"
}
```

* response
``` json
{
    "message": "success"
}
```

#### 5. delete user by user ID
##### DELETE /users/{id}

Delete user by userId.

* response
``` json
{
    "message": "success"
}
```

### Pictures
#### 1. Get all pictures
##### GET /pictures

Get all pictures info on system

* Query String

| Parameter | Type     | Required |  Noted      |
| --------  | -------- | -------- | ----------  |
| offset    | Int      | false    | default: 0  |
| limit     | Int      | false    | default: 10 |


* response

``` json
[
    {
        "id": 1,
        "filename": "16048462149779e68.jpg",
        "userId": 1,
        "createdAt": "2020-11-08T14:36:54.983Z",
        "updatedAt": "2020-11-08T14:36:54.983Z"
    }
]
```

#### 2. get pictures by picture ID
##### GET /pictures/{id}

Get picture info by pictureId.

* response

``` json
{
    "id": 1,
    "filename": "16048462149779e68.jpg",
    "userId": 1,
    "createdAt": "2020-11-08T14:36:54.983Z",
    "updatedAt": "2020-11-08T14:36:54.983Z"
}
```

#### 3. delete picture by picture ID
##### DELETE /pictures/{id}

Delete picture by pictureId.

* response
``` json
{
    "message": "success"
}
```

#### 4. upload picture under user
##### POST /users/{userId}/pictures

Upload picture.

* Body

multipart media type


* response

``` json
{
    "id": 1,
    "email": "test@test.com",
    "name": "name",
    "createdAt": "2020-11-08T14:28:42.937Z",
    "updatedAt": "2020-11-08T14:28:42.937Z"
}
```

#### 5. Get all pictures by user ID
##### GET /users/{userId}/pictures

Get all pictures info by userId

* Query String

| Parameter | Type     | Required |  Noted      |
| --------  | -------- | -------- | ----------  |
| offset    | Int      | false    | default: 0  |
| limit     | Int      | false    | default: 10 |


* response

``` json
[
    {
        "id": 1,
        "filename": "16048462149779e68.jpg",
        "userId": 1,
        "createdAt": "2020-11-08T14:36:54.983Z",
        "updatedAt": "2020-11-08T14:36:54.983Z"
    }
]
```

#### 6. get pictures by user ID and picture ID
##### GET /users/{userId}/pictures/{pictureId}

Get picture info by userId and pictureId.

* response

``` json
{
    "id": 1,
    "filename": "16048462149779e68.jpg",
    "userId": 1,
    "createdAt": "2020-11-08T14:36:54.983Z",
    "updatedAt": "2020-11-08T14:36:54.983Z"
}
```

#### 7. Reupload picture by user ID and picture ID
##### PATCH /users/{userId}/pictures/{pictureId}

Reupload picture

* Body

multipart media type

* response
``` json
{
    "message": "success"
}
```

#### 8. delete picture by user ID and picture ID
##### DELETE /users/{userId}/pictures/{pictureId}

Delete picture by userId and pictureId.

* response
``` json
{
    "message": "success"
}
```