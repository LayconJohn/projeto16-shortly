function validateUrl(url) {
    try {
        let link = new URL(link);
        console.log(link)
        return true;
    } catch (error) {
        return false;
    }
}

export {validateUrl};