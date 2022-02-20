const inquirer = require('inquirer');
const { Table } = require('console.table');
const db = require('./db/connect');
const { start } = require('repl');

db.connect(err => {
    if (err) throw err;
    start();
});

const start = function () {
    inquirer
        .prompt({
            type: 'list',
            name: 'Menu',
            message: 'From the list, choose what to do!',
            choices: ['View Roles', 'View Departments', 'View Employees', 'Add Employee', ' Update an Employee', 'Add Role', 'Add Department']
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
                addDepartment();
            } else if (response.Menu === 'Update Employee') {
                updateEmployee();
            }
        });
};