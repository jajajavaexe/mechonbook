const usernameInput = document.getElementById('username');
const confirmButton = document.getElementById('confirm-username');
const postButton = document.getElementById('post-button');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');

let username = '';
let posts = [];

confirmButton.addEventListener('click', () => {
    if (usernameInput.value.trim() !== '') {
        username = usernameInput.value.trim();
        usernameInput.disabled = true;
        confirmButton.disabled = true;
    }
});

postButton.addEventListener('click', () => {
    if (postContent.value.trim() !== '' && username) {
        const newPost = {
            content: postContent.value,
            author: username,
            timestamp: new Date().toLocaleString(),
            likes: 0
        };
        posts.push(newPost);
        renderPosts();
        postContent.value = '';
    }
});

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div>
                <strong>${post.author}</strong>
                <small>${post.timestamp}</small>
                <p>${post.content}</p>
            </div>
            <div>
                <span class="like-count">${post.likes} Likes</span>
                <button class="like-button" onclick="toggleLike(${index})">${post.likes > 0 ? 'Quitar Like' : 'Like'}</button>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function toggleLike(index) {
    if (posts[index].likes === 0) {
        posts[index].likes += 1;
    } else {
        posts[index].likes -= 1;
    }
    renderPosts();
}