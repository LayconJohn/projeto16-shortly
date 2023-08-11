import { Url } from "../../entity/urlEntity";

export interface CreateUrl extends Omit<Url, "id" | "shortUrl" | "visitCount" | "userId"> {}