-- CREATE TABLE IF NOT EXISTS USERS(
--     id integer autoincrement
-- )
INSERT INTO USERS (EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
VALUES ('user@gmail.com', 'User_First', 'User_Last', '{noop}password'),
       ('admin@javaops.ru', 'Admin_First', 'Admin_Last', '{noop}admin');

INSERT INTO USER_ROLE (ROLE, USER_ID)
VALUES ('JUDGE', 1),
       ('ADMIN', 2),
       ('JUDGE', 2),
       ('MAIN_JUDGE', 2);