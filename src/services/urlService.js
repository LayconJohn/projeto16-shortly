import urlRepository from "../repositories/urlRepository.js";

import { nanoid } from 'nanoid';

async function shortenUrl(userId, url) {
    
    const shortUrl = nanoid(10);
    await urlRepository.shortenUrl(url, shortUrl, userId);
    return shortUrl;
}

const urlService = {
    shortenUrl,
};

export default urlService;