import { TaskInterface } from "./task-interface"
import { User } from "./user-interface"

export interface Project {
    project?: string,
    title?: string
    workers?: Array<User>,
    projectworkers?: Array<User>,
    owner?: string,
    todos?: TaskInterface,
    wips?: TaskInterface
    completed?: TaskInterface

    
}