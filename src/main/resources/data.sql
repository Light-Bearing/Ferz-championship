-- CREATE TABLE IF NOT EXISTS USERS(
--     id integer autoincrement
-- )
INSERT INTO USERS (EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
VALUES ('user@gmail.com', 'User_First', 'User_Last', '{noop}password'),
       ('admin@javaops.ru', 'Admin_First', 'Admin_Last', '{noop}admin');

INSERT INTO USER_ROLE (ROLE, USER_ID)
VALUES ('ROLE_JUDGE', 1),
       ('ROLE_ADMIN', 2),
       ('ROLE_JUDGE', 2);
       ('ROLE_MAIN_JUDGE', 2);