INSERT INTO department (name)
VALUES ("Management"),
       ("HR"),
       ("Sales"),
       ("Reception");

INSERT INTO role (title, salary, department_id)
VALUES  ("Regional Manager", 100000.50, 1),
        ("Head of HR", 100000.50, 2),
        ("Asst to Regional Manager", 75000.75, 3),
        ("Receptionist", 65000.60, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Scott", 1, 1),
        ("Toby", "Flenderson", 2, 2),
        ("Dwight", "Schrute", 3, 1),
        ("Pam", "Beesly", 4, 1);
    
       
