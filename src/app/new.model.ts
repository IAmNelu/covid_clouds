import { User } from "./user.model";

export interface New {
    creator: User;
    img_link: string;
    title: string;
    content: string;
    date: Date;
    target: string;
    img_pos: string;
}