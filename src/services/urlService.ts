import urlRepository from "../repositories/urlRepository.js";
import { nanoid } from 'nanoid';
import { UrlDto } from "../models/dto/url/urlDto.js";
import { Session } from "../models/entity/sessionEntity.js";

async function shortenUrl(userId: number, url: string) {
    const shortUrl = nanoid(10);
    await urlRepository.shortenUrl(url, shortUrl, userId);
    return shortUrl;
}

async function getUrlById(url: UrlDto, id: number) {
    if (!id) {
        throw new Error("NOT_FOUND")
    }
    return {
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
    };
}

async function redirectUrl(url: UrlDto) {
    return await urlRepository.redirectUrl(url);
}

async function deleteUrl(url: UrlDto, session: Session, id: number) {
    if (url.userId !== session.userId) {
        throw new Error("UNAUTHORIZED")
    }
    return await urlRepository.deleteUrl(id);
}

const urlService = {
    shortenUrl,
    getUrlById,
    redirectUrl,
    deleteUrl,
};

export default urlService;