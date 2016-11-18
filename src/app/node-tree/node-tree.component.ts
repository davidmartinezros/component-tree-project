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
    return ((this.node.childs != null) && (this.node.childs.length > 0));
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
      const nodeIndex = parentTree.childs.indexOf(this.node);
      const siblingIndex = nodeIndex -1;
      const siblingNode = parentTree.childs[siblingIndex];

      console.log('nodeIndex:' + nodeIndex);
      console.log('siblingIndex:' + siblingIndex);
      console.log('this.node.ancestors.length:' + this.node.ancestors.length);

      parentTree.childs[siblingIndex] = this.node;
      parentTree.childs[nodeIndex] = siblingNode;

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
      const nodeIndex = parentTree.childs.indexOf(this.node);
      const siblingIndex = nodeIndex +1;
      const siblingNode = parentTree.childs[siblingIndex];

      console.log('nodeIndex:' + nodeIndex);
      console.log('siblingIndex:' + siblingIndex);
      console.log('parentTree.childs.length:' + parentTree.childs.length);

      parentTree.childs[siblingIndex] = this.node;
      parentTree.childs[nodeIndex] = siblingNode;

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

      let ancestorsSecondLevel: Node[] = grandParentTree.childs;
      let childsSecondLevel: Node[] = [];
      for(let ancestor of ancestorsSecondLevel) {
        childsSecondLevel.push(ancestor);
        if(ancestor === parentTree) {
          childsSecondLevel.push(this.node);
        }
      }
      grandParentTree.childs = childsSecondLevel;

      let ancestorsFirstLevel: Node[] = parentTree.childs;
      let childsFirstLevel: Node[] = [];
      for(let ancestor of ancestorsFirstLevel) {
        if(!(ancestor === this.node)) {
          childsFirstLevel.push(ancestor);
        }
      }
      parentTree.childs = childsFirstLevel;

      let ancestors: Node[] = [];
      for(let ancestor of this.node.ancestors) {
        if(!(ancestor === parentTree)) {
          ancestors.push(ancestor);
        }
      }
      this.node.ancestors = ancestors;

      this.reloadFirstAndLastNode(grandParentTree, grandParentTree.firstNode, grandParentTree.lastNode);
    }
  }

  reloadFirstAndLastNode(node: Node, firstNode: boolean, lastNode: boolean) {
      let i = 0;
      node.firstNode = firstNode;
      node.lastNode = lastNode;
      if(node.childs != null && node.childs.length > 0) {
        for(let child of node.childs) {
          this.reloadFirstAndLastNode(child, i === 0, i === node.childs.length-1);
          i++;
        }
      }
  }

}
