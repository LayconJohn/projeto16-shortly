import userRepository from "../repositories/userRepository.js";

async function getUrlsByUser(user) {
    const urls = await userRepository.getUrlsByUser(user);
    let visitCount = 0;
    urls.map( url => visitCount += url.visitCount);
    return {
        id: user.id,
        name: user.name,
        visitCount: visitCount,
        shortenUrls: urls
    }
}

const userService = {
    getUrlsByUser,
};

export default userService;