import { User } from "../../entity/userEntity";

export interface CreateUser extends User {
    confirmPassword: string;
}