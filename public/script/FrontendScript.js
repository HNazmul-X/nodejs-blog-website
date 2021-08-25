/* this script for image cropper */
// ===================================

// file reader funtion
const gettingImageDataTofile = (file) => {
    return new Promise((resolve, reject) => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        } else {
            reject(new Error("please Provide a File for getting Data"));
        }
    });
};

try {
    const cropieModal = new bootstrap.Modal(document.getElementById("cropie-modal"), { keyboard: false, backdrop: "static" });
    const cropieSavebutton = document.getElementById("cropie-save");
    const cropieCancelButton = document.getElementById("cropie-cancel");
    const imageUploadInput = document.getElementById("profile-image-input");
    const cropieDemo = document.getElementById("cropie-demo");
    const profileThumb__image = document.querySelector(".profile-thumb__image");
    const profileUploadForm = document.getElementById("profile-upload-form");
    const profileRemoveButton = document.getElementById("profile-remove-pic-button");

    const profileImageCropper = new Croppie(cropieDemo, {
        viewport: { width: 300, height: 300 },
        boundary: { width: 400, height: 450 },
        showZoomer: true,
    });

    imageUploadInput.addEventListener("change", async () => {
        const file = imageUploadInput.files[0];
        gettingImageDataTofile(file).then((imageData) => {
            cropieModal.show();
            profileImageCropper
                .bind({
                    url: imageData,
                })
                .then(() => {
                    const crSlider = document.querySelector(".cr-slider");
                    crSlider.setAttribute("min", 0);
                    crSlider.setAttribute("max", 10);
                });
        });
    });

    cropieSavebutton.onclick = () => {
        profileImageCropper.result("blob").then(async (blob) => {
            let formData = new FormData();
            const file = imageUploadInput.files[0];
            const filename = getFileName(file?.name);

            formData.append("profilePic", blob, filename);

            fetch("/upload/profilePic", {
                method: "POST",
                headers: { accept: "application/JOSN" },
                body: formData,
                mode: "cors",
            })
                .then((res) => res.json())
                .then((data) => {
                    profileRemoveButton.style.cssText = ` display:block !important`;
                    profileThumb__image.src = data.profilePic;
                    profileUploadForm.reset();
                    cropieModal.hide();

                    setTimeout(() => {
                        profileImageCropper.distroy();
                    }, 1000);
                })
                .catch((e) => console.log(e));
        });
    };

    cropieCancelButton.onclick = () => {
        setTimeout(() => {
            profileImageCropper.destroy();
            imageUploadInput.files = "";
        }, 1000);
        profileUploadForm.reset();
    };

    const getFileName = (name) => {
        const types = /(.jpeg|.jpg|.png|.gif|.webp|.svg)/;
        return name.replace(types, ".png");
    };

    profileRemoveButton.onclick = () => {
        fetch("/upload/profilePic", {
            method: "DELETE",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                profileRemoveButton.style.cssText = `display: none !important`;
                profileThumb__image.src = data.profilePic;
                profileUploadForm.reset();
            });
    };
} catch (e) {
    console.error(e);
}

/* Post Thumnail scriptting */
try {
    const postImageThumnailBlock = document.querySelector(".post_image_thumbnail_box");
    const beforeUploadContent = postImageThumnailBlock.querySelector(".before-upload");
    const fileInput = postImageThumnailBlock.querySelector("#post-thumbnail");
    const browserButton = postImageThumnailBlock.querySelector(".browse-button");

    browserButton.onclick = () => {
        fileInput.click();
    };
} catch (e) {
    console.log(e);
}
