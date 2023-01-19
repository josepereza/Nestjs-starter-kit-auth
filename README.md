## Basic NestJs Starter Rest API Kit

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Starter kit Features

One of our main principals has been to keep the starter kit as lightweight as possible. With that in mind, here are some of the features that we have added in this starter kit.

| Feature                  | Info               | Progress |
|--------------------------|--------------------|----------|
| Configuration            | Environment        | Done     |
| Hashing                  | bcrypt             | Done     |
| Authentication           | JWT                | Done     |
| Authorization            | RBAC (Role based)  | Pending  |
| ORM Integration          | TypeORM            | Done     |
| DB Migrations            | TypeORM            | Pending  |
| Logging                  | winston            | Pending  |
| Request Validation       | class-validator    | Done     |
| Pagination               | SQL offset & limit | Pending  |


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
