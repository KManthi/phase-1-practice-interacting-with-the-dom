let playing = true;
let interval = timer();
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let heart = document.getElementById('heart');
let commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener('click', decreaseCounter);
plus.addEventListener('click', increaseCounter);
heart.addEventListener('click', like);
pause.addEventListener('click', pauseCounter);
commentForm.addEventListener('submit', addComment);

function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (let b = 0, c = Array(a.length); b < a.length; b++) {
            c[b] = a[b];
        }
        return c;
    }
    return Array.from(a);
};


function timer() {
    return setInterval(() => {
        const counter = document.getElementById('counter');
        const currentCount = parseInt(counter.textContent);
        counter.innerText = currentCount + 1;
    }, 1000);
};

function addComment(e) {
    e.preventDefault();
    const commentInput = this.children[0];
    const commentText = commentInput.value;
    commentInput.value = '';
    const commentsList = document.getElementById('list');
    const newComment = document.createElement('p');
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
};

function increaseCounter() {
    const counter = document.getElementById('counter');
    const currentCount = parseInt(counter.textContent);
    counter.textContent = currentCount + 1;
};

function decreaseCounter() {
    const counter = document.getElementById('counter');
    const currentCount = parseInt(counter.textContent);
    counter.textContent = currentCount - 1;
};

function pauseCounter() {
    const pauseButton = document.getElementById('pause')

    if(playing) {
        playing = false;
        clearInterval(interval);
        pauseButton.textContent = 'resume';
    } else {
        playing = true;
        interval = timer();
        pauseButton.textContent = 'pause';
    }

    const buttons = document.querySelectorAll('button:not(#pause)')
    buttons.forEach((button) => {
        button.disabled = playing;
    });
};

function like() {
    const counter = document.getElementById("counter");
    const currentCount = parseInt(counter.innerText);
    const likesList = document.querySelector(".likes");
    const existingLike = [].concat(_toConsumableArray(likesList.children)).find(function(like) {
        return parseInt(like.dataset.num) === currentCount;
    });

    if (existingLike) {
        const likeCount = parseInt(existingLike.children[0].innerText);
        existingLike.innerHTML = currentCount + " has been liked <span>" + (likeCount + 1) + "</span> times";
    } else {
        const newLike = document.createElement("li");
        newLike.setAttribute("data-num", currentCount);
        newLike.innerHTML = currentCount + " has been liked <span>1</span> time";
        likesList.appendChild(newLike);
    }
};
