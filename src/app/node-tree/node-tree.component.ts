import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../node.class';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.css']
})
export class NodeTreeComponent implements OnInit {

  @Input() node: Node;

  @Input() parent: Node;

  @Input() firstNode;

  @Input() lastNode;

  constructor() { }

  ngOnInit() {
    this.loadNode();
  }

  clickExpandCollapse() {
    this.node.expand = !this.node.expand;
  }

  hasLeaf(): boolean {
    return ((this.node.children != null) && (this.node.children.length > 0));
  }

  hasParent(): boolean {
    return ((this.node.ancestors != null) && (this.node.ancestors.length > 1));
  }

  getParentId(): number {
    if(this.node.ancestors != null && this.node.ancestors.length > 0) {
      return this.node.ancestors[this.node.ancestors.length-1].id;
    } else {
      return -1;
    }
  }

  getParentName(): string {
    if(this.node.ancestors != null && this.node.ancestors.length > 0) {
      return this.node.ancestors[this.node.ancestors.length-1].name;
    } else {
      return "rootParent";
    }
  }

  loadNode() {
    this.node.firstNode = this.firstNode;
    this.node.lastNode = this.lastNode;
    console.log("el node " + this.node.name + " te lastNode " + this.node.lastNode);
    if(this.node.children == null) {
      this.node.children = [];
    }
    if(this.node.ancestors == null) {
      this.node.ancestors = [];
    }
    if(this.parent != null) {
      for(let p of this.parent.ancestors) {
        if(!this.node.ancestors.filter(x => x.id === p.id)[0]) {
          this.node.ancestors.push(p);
        }
      }
      if(!this.node.ancestors.filter(x => x.id === this.parent.id)[0]) {
        this.node.ancestors.push(this.parent);
      }
      console.log("afegim parent " + this.parent.name + " amnb lastNode " + this.parent.lastNode);
    }
    console.log('el node ' + this.node.name + " te " + this.node.ancestors.length + " parents.");
  }

  upNode() {
    console.log('upNode');

    let parentTree: Node;

    if(this.node.ancestors != null && this.node.ancestors.length > 0) {
      parentTree = this.node.ancestors[this.node.ancestors.length-1];
    }

    if(parentTree != null) {
      const nodeIndex = parentTree.children.indexOf(this.node);
      const siblingIndex = nodeIndex -1;
      const siblingNode = parentTree.children[siblingIndex];

      console.log('nodeIndex:' + nodeIndex);
      console.log('siblingIndex:' + siblingIndex);
      console.log('this.node.ancestors.length:' + this.node.ancestors.length);

      parentTree.children[siblingIndex] = this.node;
      parentTree.children[nodeIndex] = siblingNode;

      this.reloadFirstAndLastNode(parentTree, parentTree.firstNode, parentTree.lastNode);
    }
  }

  downNode() {
    console.log('downNode');
    
    let parentTree: Node;

    if(this.node.ancestors != null && this.node.ancestors.length > 0) {
      parentTree = this.node.ancestors[this.node.ancestors.length-1];
    }

    if(parentTree != null) {
      const nodeIndex = parentTree.children.indexOf(this.node);
      const siblingIndex = nodeIndex +1;
      const siblingNode = parentTree.children[siblingIndex];

      console.log('nodeIndex:' + nodeIndex);
      console.log('siblingIndex:' + siblingIndex);
      console.log('parentTree.children.length:' + parentTree.children.length);

      parentTree.children[siblingIndex] = this.node;
      parentTree.children[nodeIndex] = siblingNode;

      this.reloadFirstAndLastNode(parentTree, parentTree.firstNode, parentTree.lastNode);
    }
  }

  moveToParent() {
    console.log('nodeToParent');
    
    let grandParentTree: Node;
    let parentTree: Node;

    if(this.node.ancestors != null && this.node.ancestors.length > 0) {
      parentTree = this.node.ancestors[this.node.ancestors.length-1];
    }

    if(this.node.ancestors != null && this.node.ancestors.length > 1) {
      grandParentTree = this.node.ancestors[this.node.ancestors.length-2];
    }

    if(parentTree != null && grandParentTree != null) {

      let ancestorsSecondLevel: Node[] = grandParentTree.children;
      let childrenSecondLevel: Node[] = [];
      for(let ancestor of ancestorsSecondLevel) {
        childrenSecondLevel.push(ancestor);
        if(ancestor === parentTree) {
          childrenSecondLevel.push(this.node);
        }
      }
      grandParentTree.children = childrenSecondLevel;

      let ancestorsFirstLevel: Node[] = parentTree.children;
      let childrenFirstLevel: Node[] = [];
      for(let ancestor of ancestorsFirstLevel) {
        if(!(ancestor === this.node)) {
          childrenFirstLevel.push(ancestor);
        }
      }
      parentTree.children = childrenFirstLevel;

      let ancestors: Node[] = [];
      for(let ancestor of this.node.ancestors) {
        if(!(ancestor === parentTree)) {
          ancestors.push(ancestor);
        }
      }
      this.node.ancestors = ancestors;

      this.removeParentMovedInChildren(this.node, parentTree);

      this.reloadFirstAndLastNode(grandParentTree, grandParentTree.firstNode, grandParentTree.lastNode);
    }
  }

  reloadFirstAndLastNode(node: Node, firstNode: boolean, lastNode: boolean) {
      let i = 0;
      node.firstNode = firstNode;
      node.lastNode = lastNode;
      if(node.children != null && node.children.length > 0) {
        for(let child of node.children) {
          this.reloadFirstAndLastNode(child, i === 0, i === node.children.length-1);
          i++;
        }
      }
  }

  removeParentMovedInChildren(node: Node, parent: Node) {
      for(let child of node.children) {
        let ancestors: Node[] = [];
        for(let ancestorChild of child.ancestors) {
          if(!(ancestorChild === parent)) {
            ancestors.push(ancestorChild);
          }
        }
        child.ancestors = ancestors;
        if(child.children.length > 0) {
          this.removeParentMovedInChildren(child, parent);
        }
      }      
  }
  
}
