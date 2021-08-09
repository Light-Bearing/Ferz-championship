-- CREATE TABLE IF NOT EXISTS USERS(
--     id integer autoincrement
-- )
INSERT INTO USERS (email, surname, name, patronymic, PASSWORD)
VALUES ('user@gmail.com', 'User_Last', 'User_First','User_middle', '{noop}password'),
       ('admin','Admin_Last', 'Admin_First', 'admin_middle', '{noop}admin');

INSERT INTO USER_ROLE (ROLE, USER_ID)
VALUES ('JUDGE', 1),
       ('ADMIN', 2),
       ('JUDGE', 2),
       ('MAIN_JUDGE', 2);

INSERT INTO RIDER (surname,name,patronymic)
VALUES ('Ярыгин','Владимир','Олегович'),
       ('Ярыгин','Михаил','Олегович');