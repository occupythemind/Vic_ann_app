/***************
 ADMIN CREDENTIALS
****************/
const ADMIN_USERNAME = "Victory";
const ADMIN_PASSWORD = "victory123";

/***************
 USER LOGIN
****************/
function userLogin() {
    let name = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (!name || !pass) {
        alert("All fields required");
        return;
    }

    localStorage.setItem("role", "user");
    localStorage.setItem("name", name);
    window.location.href = "user.html";
}

/***************
 ADMIN LOGIN
****************/
function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;

    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        localStorage.setItem("role", "admin");
        localStorage.setItem("name", user);
        window.location.href = "admin.html";
    } else {
        alert("Invalid admin credentials");
    }
}

/***************
 PAGE PROTECTION
****************/
function protectAdminPage() {
    let role = localStorage.getItem("role");

    if (document.body.id === "admin-page" && role !== "admin") {
        window.location.href = "admin-login.html";
    }
}

function protectUserPage() {
    let role = localStorage.getItem("role");

    if (document.body.id === "user-page" && !role) {
        window.location.href = "login.html";
    }
}

/***************
 ANNOUNCEMENTS
****************/
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function isAdmin() {
    return localStorage.getItem("role") === "admin";
}

function addPost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let author = localStorage.getItem("name");

    if (!title || !content) return alert("All fields required");

    posts.push({ author, title, content, comments: [] });
    savePosts();
    displayPosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function displayPosts() {
    let container = document.getElementById("posts");
    if (!container) return;

    container.innerHTML = "";

    posts.forEach((post, index) => {
        let div = document.createElement("div");
        div.className = "post";

        let adminBtns = isAdmin()
            ? `<button onclick="editPost(${index})">Edit</button>
               <button onclick="deletePost(${index})" style="background:red">Delete</button>`
            : "";

        div.innerHTML = `
            <h4>${post.title}</h4>
            <small>Posted by <b>${post.author}</b></small>
            <p>${post.content}</p>
            ${adminBtns}
            <div class="comment-box">
                <input type="text" id="comment${index}" placeholder="Write comment">
                <button onclick="addComment(${index})">Comment</button>
            </div>
        `;

        post.comments.forEach(c => {
            div.innerHTML += `<div class="comment"><b>${c.name}:</b> ${c.text}</div>`;
        });

        container.appendChild(div);
    });
}

function addComment(index) {
    let input = document.getElementById("comment" + index);
    let text = input.value;
    let name = localStorage.getItem("name");

    if (!text) return alert("Write a comment");

    posts[index].comments.push({ name, text });
    savePosts();
    input.value = "";
    displayPosts();
}

function editPost(index) {
    let t = prompt("Edit title", posts[index].title);
    let c = prompt("Edit content", posts[index].content);
    if (t && c) {
        posts[index].title = t;
        posts[index].content = c;
        savePosts();
        displayPosts();
    }
}

function deletePost(index) {
    if (confirm("Delete this announcement?")) {
        posts.splice(index, 1);
        savePosts();
        displayPosts();
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    protectAdminPage();
    protectUserPage();
    displayPosts();
});