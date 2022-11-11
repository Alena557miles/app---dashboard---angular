import { Pipe, PipeTransform } from "@angular/core";
import { Board } from "src/app/shared/interfaces";

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform{
    transform(boards: Board[], search = ''): Board[] {
        if (!search.trim()){
            return boards
        }
        return boards.filter(board => {
            return board.name.toLowerCase().includes(search.toLowerCase())
        })
    }

}