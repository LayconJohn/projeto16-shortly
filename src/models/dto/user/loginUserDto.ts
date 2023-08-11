import { User } from "../../entity/userEntity";

export interface LoginUserDto extends Omit<User, "name"> {}
