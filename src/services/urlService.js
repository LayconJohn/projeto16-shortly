import urlRepository from "../repositories/urlRepository.js";

import { nanoid } from 'nanoid';

async function shortenUrl(userId, url) {
    const shortUrl = nanoid(10);
    await urlRepository.shortenUrl(url, shortUrl, userId);
    return shortUrl;
}

async function getUrlById(url, id) {
    if (!id) {
        throw new Error("NOT_FOUND")
    }
    return {
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
    };
}

async function redirectUrl(url) {
    return await urlRepository.redirectUrl(url);
}

const urlService = {
    shortenUrl,
    getUrlById,
    redirectUrl,
};

export default urlService;