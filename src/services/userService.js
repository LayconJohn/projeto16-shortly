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

async function getRanking() {
    return await userRepository.getRanking();
}

const userService = {
    getUrlsByUser,
    getRanking,
};

export default userService;