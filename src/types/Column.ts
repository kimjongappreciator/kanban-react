import type { Task } from "./Task";

type Column = {
    id: string;
    title: string;
    tasks: Task[]
}; export type { Column };