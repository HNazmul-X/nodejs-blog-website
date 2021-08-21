class Flash {
    constructor(req) {
        this.req = req;
        this.success = this.extractFlashMassage("success");
        this.fail = this.extractFlashMassage("fail");
    }

    extractFlashMassage(name) {
        const massage = this.req.flash(name);
        return massage.length > 0 ? massage[0] : false;
    }

    hasMassage() {
        return !this.fail && !this.success ? false : true;
    }

    static getMassage(req) {
        const flash = new Flash(req);
        return {
            success: flash.success,
            fail: flash.fail,
            hasMassage: flash.hasMassage(),
        };
    }
}

module.exports = Flash