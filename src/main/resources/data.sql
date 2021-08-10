
INSERT INTO roles (name)
VALUES ('JUDGE'),
       ('ADMIN'),
       ('PM'),
       ('MAIN_JUDGE');

INSERT INTO RIDER (surname,name,patronymic)
VALUES ('Ярыгин','Владимир','Олегович'),
       ('Ярыгин','Михаил','Олегович');

INSERT INTO USERS (email, surname, name, patronymic, PASSWORD)
VALUES ('user@gmail.com', 'User_Last', 'User_First','User_middle', '{noop}password'),
       ('admin','Admin_Last', 'Admin_First', 'admin_middle', '{noop}admin');
