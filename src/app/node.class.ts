export class Node {
    id: number;
    name: string;
    description: string;

    childs: Node[];

    expand: boolean = false;

    firstNode: boolean;
    lastNode: boolean;

    ancestors: Node[];

    /*removeParentInChilds(parent: Node) {
        let ans: Node[] = [];
        for(let a of this.ancestors) {
            if(!(a === parent)) {
                ans.push(a);
            }
        }
        this.ancestors = ans;
        for(let child of this.childs) {
            child.removeParentInChilds(parent);
        }
    }*/

}
