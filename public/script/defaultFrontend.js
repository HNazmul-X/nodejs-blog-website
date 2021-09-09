try {
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
} catch (error) {
    console.log(error);
}


try {

    const sitebarIocn = document.querySelector(".sitebar-icon");
    const sitebar = document.querySelector("#sitebar");
    sitebarIocn.addEventListener("click", e => {
        sitebar.classList.toggle("sitebar-show")
        sitebarIocn.classList.toggle("clicked")
    })


} catch (e) {
    
}