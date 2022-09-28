let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
const basePath = "http://127.0.0.1:5000/api/";
const postContainer = document.getElementById('post-container');

async function postList() {
    let response = await fetch(basePath + "getPostsWithAuthorName");
    let postList = await response.json();

    let postListWithBrief = postList?.map((item) => (
      `<div class="post">
          <div class="date">
              <i class="far fa-clock"></i>
              <span id="PostDate-${item.POSTID}">${new Date(item.CREATIONDATE).toDateString()}</span>
          </div>
          <div class="links">
              <a href="#" class="user" onClick="showSinglePost(${item.POSTID})">
                <h3 id="postTitle" class="title">${item.POSTTITLE}</h3>
              </a>
          </div>
          <p id="postContent-${item.POSTID}" class="text">${item.DESCRIPTION.replace(/(<([^>]+)>)/gi, " ").slice(0, 100)}</p>
          <div class="links">
              <a href="" class="user">
                  <i class="far fa-user"></i>
                  <span id="AuthorName-${item.POSTID}">${item.AUTHORNAME}</span>
              </a>
          </div>
      </div>`
    )).join("");

    postContainer.innerHTML = postListWithBrief;
}

async function showSinglePost(postid){
    let response = await fetch(basePath + "getPost/" + postid);
    let postList = await response.json();

    let postListWithBrief = postList?.map((item) => (
        `<div class="post">
            <div class="date">
                <i class="far fa-clock"></i>
                <span id="PostDate-${item.POSTID}">${new Date(item.CREATIONDATE).toDateString()}</span>
            </div>
            <h3 id="postTitle" class="title">${item.POSTTITLE}</h3>
            <p id="postContent-${item.POSTID}">${item.DESCRIPTION}</p>
            <div class="links">
                <a href="#" class="user">
                    <i class="far fa-user"></i>
                    <span id="AuthorName-${item.POSTID}">${item.AUTHORNAME}</span>
                </a>
            </div>
        </div>`
      )).join("");

    document.getElementById('banner').style.display = 'none';
    postContainer.style.marginTop = '10%';
    postContainer.innerHTML = postListWithBrief;
}

postList();