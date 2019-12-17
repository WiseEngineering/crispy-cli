# crispy-cli

CLI to communicate with `crispy-api`.

## Getting started

### Installation

```
    npm i -g crispy-cli
```

### Configuration

To specify your own configuration you could use `crispy.js` config file.

| field           | type                   | Description                                       |
| --------------- | ---------------------- | ------------------------------------------------- |
| tableName       | string                 | table name where migrations would be stored       |
| migrationsDir   | string                 | directory to store all migrations files           |
| mysqlConnection | MysqlConnection/string | mysql connection based on docs from mysql library |
| CrispyAPI       | CrispyAPI              | Crispy API configuration                          |

Crispy API configuration

| field  | type   | Description                                   |
| ------ | ------ | --------------------------------------------- |
| url    | string | url to your crispy api server                 |
| apiKey | string | api key to your api server to have basic auth |

### Running

`crispy-cli --help` Shows all available commands

```
Usage: crispy-cli [options] [command]

CLI tool to communicate with crispy-api

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  migrations|m   Operate with Crispy migrations
```

### Migrations

`crispy-cli migrations --help` Shows all available migrations commands`

```
Usage: crispy-cli migrations [options] [command]

Options:
  -h, --help               output usage information

Commands:
  migrate <migrationName>       Runs the specified migration
  rollback <migrationName>     Will undo the specified migration
  create <migrationName>   Create new migration
  help [cmd]               display help for [cmd]
```

## Local setup

### Prerequisites

- NodeJS version 12
- NVM - https://github.com/nvm-sh/nvm
- yarn - https://github.com/yarnpkg/yarn
- Typescript 3.7.3 - https://www.typescriptlang.org/

### Project setup

To setup this project you have to run following commands:

- `nvm use` To activate specified NodeJS version
- `yarn` Install dependencies

### Running

- `yarn start` Running nodemon for local development
- `yarn build` Compile Typescript to `./dist` directory
- `yarn clean` Remove & Install dependencies

## CONTRIBUTING

Contributions are always welcome, no matter how large or small
