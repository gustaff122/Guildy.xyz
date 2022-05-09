import { User } from "./user-interface";

export interface TaskInterface {
    id: string,
    title: string,
    description: string,
    workers: Array<User>,
    deadline: string, //date-type?
    //chat in the future
}