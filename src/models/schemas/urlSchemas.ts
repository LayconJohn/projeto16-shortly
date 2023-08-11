import joi from "joi";
import { CreateUrl } from "../dto/url/createUrlDto";
import { UrlDto } from "../dto/url/urlDto";

//const regex = "((https?:\/\/)|(ftp:\/\/)|(^))([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+([a-zA-Z]{2,9})(:\d{1,4})?([-\w\/#~:.?+=&%@~]*)";
const urlSchema: joi.ObjectSchema<UrlDto> = joi.object({
    url: joi.string().uri().required()
})
//url: joi.string().pattern(new RegExp(regex)).required()

export {urlSchema};