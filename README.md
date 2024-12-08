<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>

# NestJS Office Management Project

## Overview

This is a **NestJS** project designed to manage office-related data. It uses **TypeORM** to handle data persistence and offers an efficient way to manage information about employees, their tasks, meetings, and contact details. The project is built using the **NestJS framework**, offering a modular architecture and scalable solutions for managing office data.

## Key Features

- **Employee Management**: Allows CRUD operations for employee data, including personal information, department, position, and more.
- **Task Assignment**: Employees can be assigned tasks, and the progress of those tasks can be tracked.
- **Meeting Scheduling**: Enables scheduling meetings, including setting the time, participants, and agenda.
- **Contact Information Management**: Stores and manages employees' contact details.
- **TypeORM for Data Persistence**: Efficiently manages database interactions with TypeORM, ensuring data integrity and performance.
- **Database Agnostic**: The app is designed to be database-agnostic. By modifying the Datasource object in the DatabaseModule, you can easily switch between PostgreSQL, MySQL, or other supported SQL databases.
- **Pagination and Filtering**: Supports pagination for employee listings and filtering by department, position, and name.

## Technical Details

- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5). It simplifies the interaction with SQL databases and supports entities, relationships, migrations, and more.
- **PostgreSQL (or other SQL databases)**: Used as the relational database to store employee, task, meeting, and contact data.
- **Database Agnosticism**: The only file that needs modification when switching databases is the Datasource object inside the DatabaseModule. This ensures minimal configuration changes when opting for PostgreSQL, MySQL, or other SQL databases.

## Running the Application using Docker

- For a MySQL instance, simply run:

`docker-compose up`

- For a PostgreSQL instance, use the following command:

`docker run --name type-orm-postgres -e POSTGRES_PASSWORD=randompassword -p 5431:5432 -d postgres`

These commands will set up the respective database instances automatically.

## Testing the Application using Postman

Use the provided postman collection to test the API endpoint. 
