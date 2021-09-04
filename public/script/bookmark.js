window.onload = function () {
    const bookmarkAllParents = document.querySelectorAll("#bookmark-parent");
    [...bookmarkAllParents].forEach((bookmarkParent) => {
        const { postId } = bookmarkParent.dataset;
        console.log(postId);

        bookmarkParent.addEventListener("click", () => {
            fetch(`/api/bookmarks/${postId}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.bookmarked) {
                        bookmarkParent.innerHTML = ` 
                    <span class="iconify-inline" data-icon="clarity:bookmark-solid"></span>
                    <h6 class="add-bookmark-text">added</h6> 
                    `;
                    } else {
                        bookmarkParent.innerHTML = `
                    <span class="iconify-inline" data-icon="bytesize:bookmark"></span>
                     <h6 class="add-bookmark-text">Add to bookmark</h6>

                    `;
                    }
                });
        });
    });
};
