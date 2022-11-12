import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "src/app/shared/interfaces";

@Pipe({
    name: 'statusPipe'
})
export class StatusPipe implements PipeTransform{
    transform(tasks: Task[], search: string = 'done'): Task[] {
        if (!search.trim()){
            return tasks
        }
        return tasks.filter(task => {
            return task.status.includes(search)
            // return task.name.toLowerCase().includes(search.toLowerCase())
        })
    }

}