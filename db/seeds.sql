INSERT INTO department (name)
VALUES
    ('Finance'),
    ('Engineering'),
    ('Sales'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lawyer' 200000.00, 4),
    ('Web Developer', 50.00, 2),
    ('Salesman' 60000.00, 3),
    ('Finacial Advisor', 500000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Lane', 'Byers', 1, 2),
    ('Kanye', 'West', 11, 3),
    ('Archy', 'Marshall', 2, NULL),
    