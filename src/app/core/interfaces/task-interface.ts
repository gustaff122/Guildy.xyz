import { User } from "./user-interface";

export interface TaskInterface {
    projectworkers: Array<User>;
    id: string,
    title: string,
    description: string,
    workers: Array<User>,
    deadline: string,
    category: string,
    position: number
}