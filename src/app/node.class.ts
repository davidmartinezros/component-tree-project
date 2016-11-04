export class Node {
    id: number;
    name: string;
    idParent: number;
    sheet: boolean;

    childs: Node[];

    expand: boolean = false;

    lastNode: boolean;

    lastParentNode: boolean;
}
