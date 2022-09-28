const basePath = "http://127.0.0.1:5000/api/";
const body = document.body;

//#region login Functionality
function btnLoginClick() {
    let loginId = document.getElementById("txtUserName").value;
    let pass = document.getElementById("txtPass").value;

    fetch(basePath + "getUserbyLoginID/" + loginId, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data == undefined || data == null) {
            alert("Please Signup First");
        }
        else if (data[0].PASSWORD == pass) {
            sessionStorage.setItem("USERSID", data[0].USERSID);
            localStorage.setItem(
                "USERSID",
                JSON.stringify(sessionStorage.getItem("USERSID"))
            );
            dashBoardDynamic();
        } else {
            alert("invalid userid / password");
        }
    })
    .catch((err) => alert(err));
}
//#endregion

//#region Create Post Click Button
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
    document.getElementById("text-input").focus();
};

function btnCreateClick() {
    body.innerHTML = createPost();
    let optionsButtons = document.querySelectorAll(".option-button");
    optionsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        });
    });
}
//#endregion

//#region Save/update Post
async function btnSaveClick() {
    if (!confirm("Do you want to delete the post ?")) return;

    let postID = document.getElementById("postID").value;
    let postTitle = document.getElementById("post-title").value;
    let postDescription = document.getElementById("text-input").innerHTML;
    let postDateTime = new Date().toString();
    let userID = JSON.parse(localStorage.getItem("USERSID"));

    if (postID != "") {
        let response = await fetch(basePath + "updatePost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postid: postID,
                posttitle: postTitle,
                description: postDescription,
                creationDate: postDateTime,
                userid: userID,
            }),
        });
    } else {
        let response = await fetch(basePath + "savePost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                posttitle: postTitle,
                description: postDescription,
                creationDate: postDateTime,
                userid: userID,
            }),
        });
    }
    dashBoardDynamic();
}
//#endregion

//#region edit button function
async function btnEditClick(postID) {
    let response = await fetch(basePath + "getPost/" + postID);

    let data = await response.json();

    if (data != undefined || data != null) {
        btnCreateClick();
        document.getElementById("postID").value = postID;
        document.getElementById("post-title").value = data[0].POSTTITLE;
        document.getElementById("text-input").innerHTML = data[0].DESCRIPTION;
    }
}
//#endregion

//#region delete function
async function btnDeleteClick(postID) {
    if (!confirm("Do you want to delete the post ?")) return;

    let response = await fetch(basePath + "deletePost/" + postID, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    dashBoardDynamic();
}
//#endregion

//#region logOut function
function btnLogOutClick() {
    sessionStorage.clear();
    localStorage.clear();
    loginPage();
}
//#endregion

//#region signUp
function btnSignUpClick(){
    body.innerHTML = signUpPage;
}
//#endregion

//#region signUp
async function signUp(){
    let authorName = document.getElementById('authorName').value;
    let loginID = document.getElementById('loginId').value;
    let passOne = document.getElementById('passOne').value;
    let passTwo = document.getElementById('passTwo').value;

    if(passOne != passTwo){
        alert("Password Does not match");
        body.innerHTML = signUpPage;
    }else {
        let response = await fetch(basePath + "saveUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                loginid: loginID,
                authorname: authorName,
                password: passOne,
                type: 1,
            }),
        });

        if(response.status == 201){
            alert('Same Login Id exists. Please try again.');
        }else {
            loginPage();
        }
    }
}
//#endregion

//#region login page
const loginPage = () => {
    if (
        localStorage.getItem("USERSID") != undefined &&
        localStorage.getItem("USERSID") != null
    ) {
        dashBoardDynamic();
    } else {
        var str = `
        <div
            style="
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            "
        >
            <form id="login-form" action="" method="post" style="width: 60%">
                <div
                    style="
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                    "
                >
                    <input id="txtUserName" type="text" placeholder="Username" required style="margin: 1%; min-height: 2.5em; padding: 2%"/>
                    <input id="txtPass" type="password" placeholder="Password" required style="margin: 1%; min-height: 2.5em; padding: 2%"/>
                    <button id="btnLogin" onclick="btnLoginClick()" type="button" style="margin: 1%">Login</button>
                    <button id="btnSignUp" onclick="btnSignUpClick()" type="button" style="margin: 1%">SignUp</button>
                </div>
            </form>
        </div>
        `;

        body.innerHTML = str;
    }
};
//#endregion

//#region sign up
const signUpPage = `
<div
    style="
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    "
>
    <form id="signup-form" action="" method="post" style="width: 60%">
        <div
            style="
                display: flex;
                flex-flow: column;
                justify-content: center;
            "
        >
            <input id='authorName' type="text" placeholder="Username" required  style="margin: 1%; min-height: 2.5em; padding: 2%"/>
            <input id='loginId' type="text" placeholder="User id" required  style="margin: 1%; min-height: 2.5em; padding: 2%"/>
            <input id='passOne' type="password" placeholder="Password" required  style="margin: 1%; min-height: 2.5em; padding: 2%"/>
            <input id="passTwo" type="password" placeholder="Confirm Password" required  style="margin: 1%; min-height: 2.5em; padding: 2%"/>
            <button type="button" onClick="signUp()" style="margin: 1%">Sign Up</button>
        </div>
    </form>
</div>
`;
//#endregion

//#region Dashboard Content
var dashBoardDynamic = async () => {
    let userid = JSON.parse(localStorage.getItem("USERSID"));
    let response = await fetch(basePath + "getPosts/" + userid);
    let data = await response.json();

    let str = `
        <div>
            <div style="display: flex; align-items: center; justify-content: flex-end; background-color: rgb(35, 41, 41); height: 5%; padding: 2%;">
                <div>
                    <a href="#" style="color: whitesmoke;" onClick="btnLogOutClick()"> Log Out </a>
                </div>
            </div>
            <div style="padding: 2%; background-color: #ededed;">
                <div style="display: flex; justify-content: flex-end; margin: 2%">
                    <button type="submit" onClick="btnCreateClick()"><i class="fa fa-solid fa-plus"></i> Create</button>
                </div>
                <hr>
                <ul style="margin:0; padding:0">
                    ${data
                        ?.map(
                            (item) =>
                                `<ls id="postID_${item.POSTID}">
                                <div style="display: flex; align-items: center; border: 1px solid white; padding: 2%; margin:2%">
                                    <div style="flex-grow: 1;">
                                        <p>${item.POSTTITLE}</p>
                                        <p>(${new Date(
                                            item.CREATIONDATE
                                        ).toDateString()})</p>
                                    </div>
                                    <div>
                                        <button id="btn_${
                                            item.POSTID
                                        }" type="submit" onClick="btnEditClick(${
                                    item.POSTID
                                })"><i class="fa fa-lg fa-edit"></i></button>
                                        <button id="btn_${
                                            item.POSTID
                                        }" type="submit" onClick="btnDeleteClick(${
                                    item.POSTID
                                })"><i class="fa fa-lg fa-trash"></i></button>
                                    </div>
                                </div>
                            </ls>
                            `
                        )
                        .join("")}
                </ul>
            </div>
        </div>`;

    body.innerHTML = str;
};
//#endregion

//#region create post page
const createPost = () => {
    return `<div
        style="
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            padding: 2%;
        "
    >
        <div class="container">
            <input id="postID" type="text" style="display: none;"/>
            <input
                id="post-title"
                type="text"
                placeholder="Title"
                required
                style="
                    width: 100%;
                    border-radius: 5px;
                    border: 1px solid #dddddd;
                    min-height: 50px;
                    padding: 2%;
                    margin-top: 2%;
                    margin-bottom: 2%;
                "
            />
            <div class="options">
                <button id="bold" class="option-button format">Bold</button>
                <button id="italic" class="option-button format">Italic</button>
            </div>
            <div id="text-input" contenteditable="true"></div>
            <form id="post-form" action="" method="post" style="width: 100%">
                <div
                    style="
                        margin-top: 2%;
                        display: flex;
                        justify-content: flex-end;
                    "
                >
                    <button type="submit" onClick="btnSaveClick()">Save</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
//#endregion

loginPage();
