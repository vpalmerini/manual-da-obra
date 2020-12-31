# Manual da Obra

## Description
Manual da Obra (Construction's Manual in pt-br) is an web application to host explanatory videos and projects of a given construction. Big constructions have a lot of different systems (some very complex to operate), thus whoever will be responsible for the operation of the construction can access the application via QR Codes and learn more about how to operate each system.

## Project
The project has the following folder structure:

- `backend` - this is the folder with `Express.js` related folders and files
- `frontend` - this is the folder with `React` related folders and files
- `.env` - folder with environment variables to be defined (more on that later)
- `.vscode` - folder that contains `settings.json` (useful only if you use VS Code)
- `docker-compose.yml` - file that defines our docker services and allows us to start and stop these services in a very convenient way

## Stack

### UI
[React](https://reactjs.org/)

[Sass](https://sass-lang.com/)

[Ant Design](https://ant.design/docs/react/introduce)

### Backend
[Express](https://expressjs.com/)

### Storage
[MongoDB](https://www.mongodb.com/)

[AWS S3](https://aws.amazon.com/s3/)

### Infra
[Docker](https://docs.docker.com/)

[Grafana](https://grafana.com/)

## Running Locally
1. Have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed in your machine

2. Clone the repository

3. Create a `.env` folder in the root level

4. Inside the `.env` folder, create a `dev` folder and then add the following files with their respective content:

- `db.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={password}

- `db-admin.env`

  - ME_CONFIG_MONGODB_ADMINUSERNAME={admin_username}
  - ME_CONFIG_MONGODB_ADMINPASSWORD={admin_username}
  - MONGO_INITDB_DATABASE={db_name}

- `app.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={username}

  - MONGO_DATABASE={database_name}
  - MONGO_HOSTNAME=db

  - TOKEN_SECRET={token-secret}
  - REFRESH_TOKEN_SECRET={refresh-token-secret}

  - INIT_USER=admin
  - INIT_PASSWORD=admin

  - PORT={port}
  - UI_URL={ui_url}
  - DOMAIN={domain}

  - AWS_ACCESS_KEY_ID={aws_access_key}
  - AWS_SECRET_ACCESS_KEY={aws_secret_key}
  - BUCKET_NAME={bucket_name}

  > One way to generate TOKEN_SECRET and REFRESH_TOKEN_SECRET is by running `require('crypto').randomBytes(64).toString('hex')` in Node.js

  > AWS credentials can be accessed in Your Security Credentials section of your AWS account page.

- `ui.env`

  - REACT_APP_API_URL=http://localhost:8000/api

5. Build services images by running `docker-compose build`

6. Start services by running `docker-compose up`

> Add `-d` flag to run it in background

7. If everything works as expected, all services should be running for now. Open your browser in `localhost:3000` to see the `UI`. The `API` service should be running on port `8000` and Mongo Admin Panel on port `8081`.


## Deploy

It is a similar process but some additional steps are required:
  1. First, you will use now `docker-compose.prod.yml` file, which defines production environment for each service

  2. Create a `secrets/` folder in the root level

  3. Add all secrets as `.secret` files inside `secrets/` folder

  > For instance: `secrets/db_password.secret` will hold the password of the database and so on. All secrets are specified in docker-compose.prod.yml file

  > Secrets are similar to environment variables but are not shared across all swarm nodes. If your cluster has only 1 node, then it won't make much difference

  4. Create a `prod` folder inside `.env` and the following files: `app.env` and `ui.env`

  5. `.env/prod/app.env` will hold all variables of `.env/dev/app.env` except the ones that are secrets now

  6. `.env/prod/ui.env` will hold: `API_HOST=stack_manual_da_obra_backend` and `API_PORT=8000`

  > I named my stack as stack_manual_da_obra, so my backend service will have that DNS

  7. Make sure that all services _volumes_ specified in `docker-compose.prod.yml` exist. If not, then create it.

  8. `docker-compose -f docker-compose.prod.yml build`

  9. `docker stack deploy -c docker-compose.prod.yml {your-stack-name}`


## Logging

The API uses [morgan](https://github.com/expressjs/morgan) as logger middleware. In `dev` environment it just logs in console and in `production` environment it persists in `access.log` file (inside `log/` folder).

Also in `production`, the swarm has an instance of each [Grafana](https://grafana.com/) and [Loki](https://grafana.com/oss/loki/) running to get the logs, which makes it easy to visualize them.

## Docs

The API's documentation is made with [Swagger](https://swagger.io/) and can be accessed in `dev` environment at `http://localhost:8000/api/docs`.

There is also a [Postman](https://www.postman.com/) [collection](https://www.getpostman.com/collections/11f66e57095a1714f2b5) which serve as a documentation as well.

## Improvements to be made

- Pipeline of unit and integration tests
