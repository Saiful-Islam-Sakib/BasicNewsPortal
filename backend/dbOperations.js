var config = require('./dbconfig');
const sql = require('mssql');

async function getUsers() {
    try {
        let tc = await sql.connect(config);
        let userList = await tc.request().query("SELECT * from users");
        return userList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserbyLoginID(loginid) {
    try {
        let tc = await sql.connect(config);
        let userList = await tc.request()
        .input('loginid', sql.VarChar, loginid)
        .query("SELECT * from users WHERE loginid=@loginid");
        return userList.recordsets[0].length > 0 ? userList.recordsets : null;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPosts(userid) {
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, userid)
            .query("SELECT * from posts where USERSID = @input_parameter");
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPostsWithAuthorName() {
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .query(`SELECT u.AUTHORNAME, p.* FROM POSTS p
            LEFT JOIN USERS u ON p.USERSID = u.USERSID`);
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPost(postid){
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, postid)
            .query(`SELECT u.AUTHORNAME, p.* FROM POSTS p
            LEFT JOIN USERS u ON p.USERSID = u.USERSID
            where p.postid = @input_parameter`);
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deletePost(postid){
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, postid)
            .query("DELETE from posts where postid = @input_parameter");
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function saveUser(users) {
    try {
        let tc = await sql.connect(config);
        let insertUser = await tc.request()
            .input('loginid', sql.VarChar, users.loginid)
            .input('authorname', sql.VarChar, users.authorname)
            .input('password', sql.VarChar, users.password)
            .input('type', sql.Int, users.type)
            .query('INSERT INTO USERS (AUTHORNAME,LOGINID,PASSWORD,TYPE) VALUES(@authorname,@loginid,@password,@type)');
        return insertUser.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function savePost(posts) {
    try {
        let tc = await sql.connect(config);
        let insertPost = await tc.request()
            .input('posttitle', sql.VarChar, posts.posttitle)
            .input('description', sql.NVarChar, posts.description)
            .input('creationDate', sql.DateTime, posts.creationDate)
            .input('userid', sql.Int, posts.userid)
            .query('INSERT INTO POSTS (CREATIONDATE,POSTTITLE,DESCRIPTION,USERSID) VALUES(@creationDate,@posttitle,@description,@userid)');
        return insertPost.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updatePost(posts) {
    try {
        let tc = await sql.connect(config);
        let updatePost = await tc.request()
            .input('postid', sql.Int, posts.postid)
            .input('posttitle', sql.VarChar, posts.posttitle)
            .input('description', sql.NVarChar, posts.description)
            .input('creationDate', sql.DateTime, posts.creationDate)
            .input('usersid', sql.Int, posts.userid)
            .query('update posts set posttitle = @posttitle, description = @description, creationDate = @creationDate, usersid = @usersid WHERE postid=@postid');
        return updatePost.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    saveUser: saveUser,
    getUsers : getUsers,
    getPosts : getPosts,
    getPost : getPost,
    savePost : savePost,
    updatePost : updatePost,
    getUserbyLoginID : getUserbyLoginID,
    deletePost : deletePost,
    getPostsWithAuthorName: getPostsWithAuthorName
}