import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "src/app/shared/interfaces";

@Pipe({
    name: 'searchTaskPipe'
})
export class SearchTaskPipe implements PipeTransform{
    transform(tasks: Task[], search = ''): Task[] {
        if (!search.trim()){
            return tasks
        }
        return tasks.filter(task=> {
            return task.name.toLowerCase().includes(search.toLowerCase())
        })
    }

}