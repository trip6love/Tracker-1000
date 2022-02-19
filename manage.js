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
}