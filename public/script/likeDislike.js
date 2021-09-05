try {
    const likeBtn = document.querySelector("#like-dislike-button-group .likebtn");
    const dislikeBtn = document.querySelector("#like-dislike-button-group .dislikebtn");
    console.log(likeBtn, dislikeBtn);

    const { postId } = likeBtn.dataset || dislikeBtn.dataset;

    likeBtn.onclick = () => {
        likeDislikeRequest("like", postId)
            .then((res) => res.json())
            .then((data) => {
                likeBtn.innerHTML = data.liked ? `Liked ( ${data.totalLikes})` : `Like ( ${data.totalLikes})`;
                dislikeBtn.innerHTML = `Dislike ( ${data.totalDislikes} )`;
            });
    };

    dislikeBtn.onclick = () => {
        likeDislikeRequest("dislike", postId)
            .then((res) => res.json())
            .then((data) => {
                dislikeBtn.innerHTML = data.disliked ? `Disliked ( ${data.totalDislikes})` : `Dislike ( ${data.totalDislikes})`;
                likeBtn.innerHTML = `Like ( ${data.totalLikes} )`;
            });
    };

    const likeDislikeRequest = (type, postId) => {
        return fetch(`/api/${type}/${postId}`, {
            method: "POST",
            headers: {
                Accept: "Application/JSON",
                "Content-Type": "Application/JSON",
            },
            mode: "cors",
        });
    };
} catch (e) {
    alert(e.massage);
    console.log(e);
}
