import { TaskInterface } from "./task-interface"
import { User } from "./user-interface"

export interface Project {
    id?: string,
    title?: string
    workers?: Array<User>,
    owner?: string,
    todos?: TaskInterface,
    wips?: TaskInterface
    completed?: TaskInterface
}