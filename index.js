// dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

require('dotenv').config()

deptArray = []

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        database: 'employees_db',
        password: '',
        user: 'root',
       
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
    .then((answer) => {
        console.log(answer)
        switch(answer.startMenu) {
            case 'View all Departments':
                view('department')
                break;
            case 'View all Roles':
                view('role')
                break;
            case 'View all Employees':
                view('employee')
                break;
            case 'Add a Department':
                addDepartment()
                break;
            case 'Add a Role':
                addRole()
                break;
            case 'Add an Employee':
                addEmployee()
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
    let query
    if(viewVal === 'department') {
        query= `SELECT * FROM department`;
    } else if(viewVal === 'role') {
        query = `SELECT * FROM role`;
    } else {
        query = `SELECT * FROM employee`
    }
    db.promise().query(query) 
    .then((results) => {
        console.table(results[0]) 
        start()
        } 
    )
} 
  
addDepartment = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'addDept',
            message: 'What is the name of the department?',
            validate: addDept => {
                if(addDept) {
                    deptArray.push(addDept)
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
        db.query('INSERT INTO department (dept_name) VALUES (?)', [deptInput.addDept], (err, res) => {
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
        },
        {
         type: 'input',
         name: 'roleDept',
         message: 'What department is this role in?',
         validate: roleDept = () => {
             if(roleDept) {
                 return true;
             } else {
                 return false;
             }
         }
       } 
       //need to push value 
       // go through array and go through ids and names

        ]
    )
    // add to role table
    .then(roleInput => {
        deptInput.query('INSERT INTO role (title, salary) VALUES (?, ?)', [roleInput.name], (err, res) => {
            if (err) throw err;
            console.log('Department Added!');
            start();
        })
    })

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

