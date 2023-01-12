const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consoleTable = require('console.table');
const dotenv = require('dotenv');

const db = mysql2.createConnection(
    {
        host: 'localhost',
        database: 'process.env.DATABASE',
        user: 'process.env.USERNAME',
        password: 'process.env.PASSWORD'
    },

);

db.connect((err) => {
    if (err) throw err;
})

const start = () => {
    return inquirer.prompt (
        [
            {
                 type: 'list',
                 name: 'startMenu',
                 message: 'What would you like to do?',
                 choices: ['view all departments', 
                 'view all roles', 
                 'view all employees', 
                 'add a department', 
                 'add a role', 
                 'add an employee', 
                 'update an employee role']

            }
        ]
    )
}