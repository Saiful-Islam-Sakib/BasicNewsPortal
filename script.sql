-- CREATE TABLE USERS
-- (
-- 	USERSID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--  AUTHORNAME VARCHAR(50) NOT NULL,
-- 	LOGINID VARCHAR(50) NOT NULL,
-- 	PASSWORD VARCHAR(50) NOT NULL,
-- 	TYPE INT NOT NULL
-- )

-- CREATE TABLE POSTS
-- (
-- 	POSTID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--  CREATIONDATE DATETIME not NULL,
-- 	POSTTITLE VARCHAR(500) NOT NULL,
-- 	DESCRIPTION VARCHAR(1000) NOT NULL,
--  USERSID int null FOREIGN KEY REFERENCES USERS(USERSID)
-- )
