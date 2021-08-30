tinymce.init({
    selector: "#tiny-mce-post-body",
    plugins: ["a11ychecker advcode advlist lists link checklist autolink autosave code", "preview", "searchreplace", "wordcount", "media table emoticons image imagetools"],
    toolbar:
        " fontsizeselect lineheight | forecolor backcolor | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media |  emoticons | code preview",
    toolbar_mode: "floating",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    relative_urls: false,
    fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 50pt 56pt 72pt",
    lineheight_formats: '0 0.2 0.5 0.8 1 1.1 1.2 1.3 1.4 1.5 2 2.2 2.5 2.8 3',
    height: 560,
    automatic_uploads: true,
    images_upload_url: "/upload/postImage",
    images_upload_handler: function (blobInfo, success, failure) {
        const formData = new FormData();
        formData.append("post-image", blobInfo.blob(), blobInfo.filename());
        console.log(formData);
        const headers = new Headers();
        headers.append("Accept", "Application/JSON");

        const req = new Request("/upload/postImage", {
            method: "POST",
            headers,
            body: formData,
            mode: "cors",
        });
        fetch(req)
            .then((res) => res.json())
            .then((data) => success(data.imageURL))
            .catch(() => failure("Server Error"));
    },
});
