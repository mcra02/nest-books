<p align="center">
    <img src="https://miro.medium.com/max/400/1*nP2C50GK4_-ly_R_mq3juQ.png" width="120" alt="GraphQl" />
    <img src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png" width="120" alt="NestJs" />
    <img src="https://darwindigital.com/wp-content/uploads/2018/02/RESTful-API-Development-Switzerland.png" width="120" alt="NestJs" />
    </p>

<h1 align="center">
  API REST AND GRAPHQL BOOKS
</h1>

## Description

<p ALIGN="justify">
Simple example implementing a rest api with Websockets and a Graphql service.
</p>

This project has using the following features:

- **NodeJs** 12.x+
- **Nest** 7.0
- **GraphQl**
- **JWT**
- **SOCKET IO**

## Installation

### Development

1. Clone Repository

   ```bash
   $ git clone https://github.com/mcra02/nest-books.git
   ```

2. Check the .env file and change variables if necessary:

- HTTP_PORT=[4000]
- WS_PORT=[4001]
- JWT_KEY=[STRING_KEY]

  2.1. Optionals

  - WS_CHANNEL_BOOK=BOOK
  - WS_CHANNEL_AUTHOR=AUTHOR
  - WS_CHANNEL_USER=USER

  - WS_CREATED=CREATED
  - WS_UPDATE=UPDATED
  - WS_DELETED=DELETED

3. Check the ormconfig.json file and change the credentials of the connection url to mysql if necessary:

   - [HOST_DATABASE]
   - [PORT_DATABASE]
   - [USER_DATABASE]
   - [PASS_DATABASE]
   - [NAME_DATABASE]

   You should create a database named **BOOKS**.

4. Install dependencies

   ```bash
   $ yarn install
   ```

5. Run development

   ```bash
   $ yarn start:dev
   ```

6. Open GRAPHQL http://localhost:[PORT]/graphql

7. Open REST API http://localhost:[PORT]/api/swagger

### Production

1. Clone Repository

   ```bash
   $ git clone clone https://github.com/mcra02/nest-books.git
   ```

2. Check the .env file and change variables if necessary:

- HTTP_PORT=[4000]
- WS_PORT=[4001]
- JWT_KEY=[STRING_KEY]

  2.1. Optionals

  - WS_CHANNEL_BOOK=BOOK
  - WS_CHANNEL_AUTHOR=AUTHOR
  - WS_CHANNEL_USER=USER

  - WS_CREATED=CREATED
  - WS_UPDATE=UPDATED
  - WS_DELETED=DELETED

3. Check the ormconfig.json file and change the credentials of the connection url to mysql if necessary:

   - [HOST_DATABASE]
   - [PORT_DATABASE]
   - [USER_DATABASE]
   - [PASS_DATABASE]
   - [NAME_DATABASE]

   You should create a database named **BOOKS**.

4. Build Dockerfile

   ```bash
   $ docker build -t "backend-books" .
   ```

5. Start project

   ```bash
   $ docker run -itd --name backend-osffni -p 80:[PORT] backend-books
   ```

# Authors

#### [Michael C Rodrigo Apaza ](https://www.facebook.com/MaicolCRodrigo)
