export class Node {
    id: number;
    name: string;
    description: string;

    childs: Node[];

    expand: boolean = false;

    firstNode: boolean;
    lastNode: boolean;

    ancestors: Node[];

}
