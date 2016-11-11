export class Node {
    id: number;
    name: string;

    childs: Node[];

    expand: boolean = false;

    lastNode: boolean;

    ancestors: Node[];

}
