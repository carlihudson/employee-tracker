// dependencies
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consoleTable = require('console.table');

require('dotenv').config()

// connect to the database
const db = mysql2.createConnection(
    {
        host: 'localhost',
        database: 'process.env.DB_NAME',
        password: 'process.env.DB_PASSWORD',
        user: 'process.env.DB_USER',
       
    },

);

if(db) {
   console.log('/$$$$$$$$                         /$$                                        ')
   console.log('| $$_____/                        | $$  ')                                       
   console.log('| $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$')  
   console.log('| $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$') 
   console.log('| $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$') 
   console.log('| $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/') 
   console.log('| $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$') 
   console.log('|________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/') 
   console.log('                         | $$                     /$$  | $$ ')                   
   console.log('                         | $$                    |  $$$$$$/')                    
   console.log('                         |__/                     \______/ ')                    
   console.log('  /$$$$$$$$                           /$$  ')                                    
   console.log(' |__  $$__/                          | $$  ')                                    
   console.log('    | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$     ')        
   console.log('    | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$')            
   console.log('    | $$| $$  \__/ /$$$$$$$| $$      | $$$$$$/ | $$$$$$$$| $$  \__/ ')           
   console.log('    | $$| $$      /$$__  $$| $$      | $$_  $$ | $$_____/| $$')                  
   console.log('    | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \  $$|  $$$$$$$| $$  ')                
   console.log('    |__/|__/      \_______/ \_______/|__/  \__/ \_______/|__/ ')   
} else {
    throw err;
}

// function for user to start inputting responses
const start = () => {
    return inquirer.prompt (
        [
            {
                 type: 'list',
                 name: 'startMenu',
                 message: 'What would you like to do?',
                 choices: ['View all Departments', 
                 'View all Roles', 
                 'View all Employees', 
                 'Add a Department', 
                 'Add a Role', 
                 'Add an Employee', 
                 'Update an Employee Role',
                'No Action']

            }
        ]
    )
    .then(() => {
        switch(answers) {
            case 'View all Departments':
                view(department)
                break;
            case 'View all Roles':
                view(role)
                break;
            case 'View all Employees':
                view(employee)
                break;
            case 'Add a Department':
                addDepartment()
                break;
            case 'Add a Role':
                addRole()
                break;
            case 'Add an Employee':
                // function to add an employee
                break;
            case 'Update an Employee Role':
                // function to update an employee role
                break;
            case 'No Action':
                console.log('Thanks for Visiting!');
                // function to disconnect
        }
    })
    .catch(err => {
        console.log(err);
    });
}

view = (viewVal) => {
    let query;
    if(viewVal === 'department') {
        query = `SELECT * FROM department`;
    } else if(viewVal === 'role') {
        query = ``;
    } else {
        query = ``
    }
}

addDepartment = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'addDept',
            message: 'What is the name of the department?',
            validate: addDept => {
                if(addDept) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
                }
            }
        }
        ]
    )
    .then(deptInput => {
        deptInput.query('INSERT INTO department (name) VALUES (?)', [deptInput.name], (err, res) => {
            if (err) throw err;
            console.log('Department Added!');
            start();
        })
    })
}

addRole = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'addRole',
            message: 'What is the role title?',
            validate: addRole => {
                if(addRole) {
                    return true;
                } else {
                    console.log('Please enter a role name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            type: 'number',
            name: 'salary',
            message: "What is this role's salary?",
            validate: salary => {
                if(salary) {
                    return true;
                } else {
                    console.log('Please enter a salary');
                    return false;
                }
            }
        }
        // is there where I ask what dept the role is in?

        ]
    )
    .then()
    // add to role table
    // console log updated role table
    
}

addEmployee= () => {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
                validate: firstName => {
                if(firstName) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }

            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
                validate: lastName => {
                if(lastName) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }

            },

            // add role?
            // add manager?
        ]
    )
    }

start()

