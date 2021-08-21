const fs = require("fs");
const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");

exports.uploadProfilePics = async (req, res, next) => {
    if (req.file) {
        const profilePic = `/upload/${req.file.filename}`;

        try {
            const isProfile = await ProfileModel.findOne({ user: req.user._id });
            if (isProfile) {
                await ProfileModel.findOneAndUpdate({ user: req.user._id }, { $set: { profilePic } });
            }
            await UserModel.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $set: {
                        profilePic,
                    },
                },
            );
            res.status(200).json({ profilePic });
        } catch (e) {
            res.status(500).json({
                profilePic: req.user.profilePic,
            });
        }
    } else {
        res.status(500).json({
            profilePic: req.user.profilePic,
        });
    }
};

exports.removeProfilePic = (req, res, next) => {
    const defautlImage = `/upload/default-avatar.png`;
    const currentImage = req.user.profilePic;
    
    console.log("public"+currentImage)

    fs.unlink(`public${currentImage}`, async () => {
        try {
            const profile = await ProfileModel.findOne({ user: req.user._id });
            if (profile) {
                await ProfileModel.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $set: {
                            profilePic: defautlImage,
                        },
                    },
                );
            }

            await UserModel.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $set: {
                        profilePic: defautlImage,
                    },
                },
            );

        } catch (e) {
            console.log(e);
            res.status(500).json({
                massage: "internel server error",
            });
        }
    });

    res.status(200).json({
        profilePic:defautlImage
    })
};
