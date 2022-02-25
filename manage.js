const inquirer = require('inquirer');
const { Table } = require('console.table');
const db = require('./db/connect');
//const { start } = require('repl');//

db.connect(err => {
    if (err) throw err;
    start();
});
// START MENU //
const start = function () {
    inquirer
        .prompt({
            type: 'list',
            name: 'Menu',
            message: 'From the list, choose what to do!',
            choices: ['View Roles', 'View Departments', 'View Employees', 'Add Employee', 'Add Role', 'Add Department']
        })
        .then(response => {
            if (response.Menu === 'View Roles') {
                viewRoles();
            } else if (response.Menu === 'View Departments') {
                viewDepartments();
            } else if (response.Menu === 'View Employees') {
                viewEmployees();
            } else if (response.Menu === 'Add Employee') {
                addEmployee();
            } else if (response.Menu === 'Add Role') {
                addRole();
            } else if (response.Menu === 'Add Department') {
                addDep();
            } 
        });
};
// VIEW EMPLOYEE ROLES //
const viewRoles = function () {
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            
        }
        Table(rows);
        Menu();
    });
};
// VIEW THE DEPARTMENTS//
const viewDepartments = function () {
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            
        }
        Table(rows);
        Menu();
    });
};
//VIEW EMPLOYEES //
const viewEmployees = function () {
    const sql = `SELECT * FROM employees`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
          
        }
        Table(rows);
        Menu();
    });
};
// ADDING EMPLOYEES //
const addEmployee = function () {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            throw err;
            Menu();
        }
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query(`SELECT * FROM employee`, (err, rows) => {
            if (err) {
                throw err;
                
            }
            const employees = rows.map(employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
            // ADD QUESTIONS  FOR ADDING EMPLOYEE //
            inquirer
                .prompt([{
                    type: 'text',
                    name: 'firstName',
                    message: "Please give a first name for the employee!"
                },
                {
                    type: 'text',
                    name: 'lastName',
                    message: "Please give a last name for the employee!"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the role?",
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Employee's manager?",
                    choices: employees

                }])
                .then(response => {
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const par = [response.firstName, response.lastName, response.role, response.manager];
                    db.query(sql, par, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`Added employee success!`)
                        viewEmployees();
                    });
                });
                
        });
    });
};
// ADD ROLE FUNCTION //
const addRole = function () {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) {
            throw err;
        }
        const departments = rows.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer
            .prompt([{
                type: 'text',
                name: 'title',
                message: 'Title of role?'
            },
            {
                type: 'text',
                name: 'salary',
                message: 'Salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'what department is this role under?',
                choices: departments
            }])
            .then(response => {
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [response.title, response.salary, response.department];
                db.query(sql, params, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                })
                viewRoles();
            })
    })
}
// ADD DEPARTMENTS //
const addDep = function () {
    inquirer
        .prompt({
            type: 'text',
            name: 'depName',
            message: 'what is the new department?'
        })
        .then(response => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = response.depName;
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err;
                    
                }
                viewDepartments();
            })
        })
}
