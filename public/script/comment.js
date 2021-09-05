try {
    const commentInputField = document.getElementById("comment-input");
    const commentSubmitBtn = document.getElementById("comment-submit-btn");
    const commentHolder = document.getElementById("comment-holder");
    const noCommentText = document.querySelector(".no-comment");

    commentInputField.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            commentSubmitBtn.click();
        }
    });

    commentSubmitBtn.onclick = () => {
        if (commentInputField.value) {
            generateCommentFromServer();
            noCommentText && noCommentText.remove();
            commentInputField.value = "";
        } else {
            alert("Please Enter a valid Comments");
        }
    };

    // generating cooment from server.. calling api and create data with api
    const generateCommentFromServer = () => {
        const { postId } = commentHolder.dataset;
        const body = {
            body: commentInputField.value,
        };
        fetch(`/api/comment/${postId}`, {
            method: "POST",
            headers: {
                accept: "Application/JSON",
                "content-type": "Application/JSON",
            },
            body: JSON.stringify(body),
            mode: "cors",
        })
            .then((res) => res.json())
            .then((comment) => {
                comment;
                if (comment) {
                    const div = document.createElement("div");
                    div.className = "border comment-card";
                    div.dataset.commentId = comment._id;
                    div.innerHTML = `
                     <div class="d-flex">
                    <div class="flex-shrink-0">
                      <img class="comment-image" src="${comment.user.profilePic}" alt="${comment.user.username}'s Comments' ">
                    </div>
                    <div class="flex-grow-1 ms-3 comment-body">
                      <h5>${comment.user.username} </h5>
                      <p class="text-muted my-1"> ${comment.body} </p>
                      <p class="text-muted small mb-1">
                        <a class="" data-bs-toggle="collapse" href="#collapse${comment._id}" role="button">Leave a Reply </a>
                        
                      </p>
                    </div>
                  </div>
                  <div data-comment-id="${comment._id}"  id="reply-holder" class=" ps-2 ps-md-5">
                    <div class="collapse" id="collapse${comment._id}">
                        <input type="text" placeholder="prese enter to reply" class="form-control form-controll-sm">
                    </div>
                  </div>
                `;

                    commentHolder.appendChild(div);
                }
            })
            .catch((e) => {
                e ? alert(e) : "";
            });
    };
} catch (e) {
    console.log(e);
}

/* Comment Reply Funtion */

try {
    const allReplyHolder = document.querySelectorAll("#reply-holder");

    [...allReplyHolder].forEach((replyHolder) => {
        const replyInputFeild = replyHolder.querySelector("#reply-input");
        const commentId = replyHolder.dataset.commentId;
        replyInputFeild.addEventListener("keypress", (e) => {
            if ((e.key === "Enter")) {
                if (replyInputFeild.value) {

                    fetch(`/api/comment/reply/${commentId}`, {
                        method:"POST",
                        body:JSON.stringify({body:replyInputFeild.value}),
                        headers:{
                            "accept":"Application/JSON",
                            "content-type":"Application/JSON"
                        },
                        mode:"cors"
                    }).then(res => res.json())
                    .then(reply => {
                        if(reply){

                            console.log(reply)

                            const div = document.createElement("div")
                            div.className = "reply-card";
                            div.innerHTML = `
                            <div class="d-flex">
								<div class="flex-shrink-0">
									<img class="reply-image" src="${reply.profilePic}" alt="${reply.username}s Comments' ">
								</div>
								<div class="flex-grow-1 ms-3 comment-body">
									<h5>${reply.username} </h5>
									<p class="text-muted my-1"> ${reply.body}</p>
								</div>
							</div>
                            `;
                        
                        replyInputFeild.parentNode.parentNode.appendChild(div)
                        replyInputFeild.value = ""
                            






                        }
                    }).catch(e => alert(e.massage))


                } else {
                    alert("Please Enter a valid Reply");
                }
            }
        });
    });
} catch (e) {
    console.log(e);
}
