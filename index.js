// dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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

// opening art for when user enters application
if (db) {
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
    return inquirer.prompt(
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
    // switch statement to call functions depending on user choice
        .then((answer) => {
            switch (answer.startMenu) {
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
                    updateRole()
                    break;
                case 'No Action':
                    console.log('Thanks for Visiting!');
                    db.end()
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// function to view tables
view = (viewVal) => {
    let query
    if (viewVal === 'department') {
        console.log('DEPARTMENTS \n')
        query = `SELECT department.id AS ID, 
        department.name AS Name
        FROM department`;
    } else if (viewVal === 'role') {
        console.log('ROLES \n')
        query = `SELECT role.id AS Role_ID,
        role.title AS Name,
        role.salary AS Salary,
        department.name AS Department,
        department.id AS Dept_ID
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;
    } else {
        //employee table
        console.log('EMPLOYEES \n')
        query = `SELECT employee.id AS ID, 
        employee.first_name AS First_Name,
        employee.last_name AS Last_Name,
        role.title AS Role,
        role.id AS Role_ID,
        role.salary AS Salary,
        department.name AS Department,
        department.id AS Dept_ID,
        CONCAT (manager.first_name, " ", manager.last_name) AS Manager,
        employee.manager_id AS Manager_ID
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`
        ;
       

    }
    db.promise().query(query)
        .then((results) => {
            console.table(results[0])
            start()
        }
        )
}

// functions to add information
addDepartment = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'addDept',
            message: 'What is the name of the department?',
            validate: addDept => {
                if (addDept) {
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
            db.query('INSERT INTO department (name) VALUES (?)', [deptInput.addDept], (err, res) => {
                if (err) throw err;
                console.log('Department Added!');
                start();
            })
        })
}

addRole = () => {
    const deptData = `SELECT * FROM department`;
    db.promise()
        .query(deptData)
        .then(([rows]) => {
            const deptChoicesArray = rows.map(({ name, id }) => ({
                name: name,
                value: id,
            }));

            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: 'What is the role title?',
                        validate: (roleTitle) => {
                            if (roleTitle) {
                                return true;
                            } else {
                                console.log('Please enter a role name');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'input',
                        type: 'number',
                        name: 'salary',
                        message: "What is this role's salary?",
                        validate: (salary) => {
                            if (salary) {
                                return true;
                            } else {
                                console.log('Please enter a salary');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'list',
                        name: 'roleDept',
                        message: 'What department is this role in',
                        choices: deptChoicesArray,
                    },
                ])
                .then((response) => {
                    db.query(
                        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                        [response.roleTitle, response.salary, response.roleDept],
                        (err, res) => {
                            if (err) throw err;
                            console.log('Role Added!');
                            start();
                        }
                    );
                });
        })

        .catch((err) => {
            console.log(err);
        });
};

addEmployee = () => {
    const roleData = `SELECT * FROM role`;
    db.promise()
        .query(roleData)
        .then(([rows]) => {
            const roleArray = rows.map(({ title, department_id }) => ({
                name: title, 
                value: department_id,
            }))
    
    const employeeData = `SELECT * FROM employee`;
    db.promise()
        .query(employeeData)
        .then(([rows]) => {
            const managerArray = rows.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
            }))

            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "What is the employee's first name?",
                        validate: firstName => {
                            if (firstName) {
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
                            if (lastName) {
                                return true;
                            } else {
                                console.log('Please enter a name');
                                return false;
                            }
                        }
        
                    },
                        {
                            type: 'list',
                            name: 'employeeRole',
                            message: "What is the employee's role?",
                            choices: roleArray
                        },
                        {
                            type: 'list',
                            name: 'employeeManager',
                            message: "Who is the employee's manager?",
                            choices: managerArray
        
                        }
                    ])
                    .then(response => {
                        const employeeParameters = [response.firstName, response.lastName, response.employeeRole, response.employeeManager]
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`, [employeeParameters], (err, res) => {
                            if (err) throw err;
                            console.log('Employee Added!');
                                    start();
                        })
                    })
                
                })
            })
            .catch((err) => {
                console.log(err);
            });
        };

// function to update employee's role
updateRole = () => {
    const roleList = `SELECT * FROM role`;
    db.promise()
        .query(roleList)
        .then(([rows]) => {
            const roleListArray = rows.map(({ title, department_id }) => ({
                name: title, 
                value: department_id,
            }))
    
    const employeeList = `SELECT * FROM employee`;
    db.promise()
        .query(employeeList)
        .then(([rows]) => {
            const employeeListArray = rows.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
            }))

            inquirer.prompt(
                [
                    {
                        type: 'list',
                        name: 'employeeToUpdate',
                        message: "What employee would you like to update?",
                        choices: employeeListArray
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: "What is the employee's new role?",
                        choices: roleListArray
        
                    }
                    ])
                    .then(response => {
                        const updatedRole = response.newRole;
                        const employeeID = response.employeeToUpdate
                        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [updatedRole, employeeID], (err, res) => {
                            if (err) throw err;
                            console.log('Employee Role Updated!');
                                    start();
                        })
                    })
                
                })
            })
            .catch((err) => {
                console.log(err);
            });
        };

    

start()

