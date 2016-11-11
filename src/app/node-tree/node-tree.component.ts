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
      return "root";
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

      let firstNode = false;
      let lastNode = false;
      if(nodeIndex === 0) {
        firstNode = true;
      }
      if(nodeIndex === parentTree.childs.length-1) {
        lastNode = true;
      }

      let firstNodeSibling = false;
      let lastNodeSibling = false;
      if(siblingIndex === 0) {
        firstNodeSibling = true;
      }
      if(siblingIndex === parentTree.childs.length-1) {
        lastNodeSibling = true;
      }
      
      this.node.lastNode = lastNodeSibling;
      this.node.firstNode = firstNodeSibling;
      siblingNode.lastNode = lastNode;
      siblingNode.firstNode = firstNode;

      parentTree.childs[siblingIndex] = this.node;
      parentTree.childs[nodeIndex] = siblingNode;

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

      let firstNode = false;
      let lastNode = false;
      if(nodeIndex === 0) {
        firstNode = true;
      }
      if(nodeIndex === parentTree.childs.length-1) {
        lastNode = true;
      }

      let firstNodeSibling = false;
      let lastNodeSibling = false;
      if(siblingIndex === 0) {
        firstNodeSibling = true;
      }
      if(siblingIndex === parentTree.childs.length-1) {
        lastNodeSibling = true;
      }
      
      this.node.lastNode = lastNodeSibling;
      this.node.firstNode = firstNodeSibling;
      siblingNode.lastNode = lastNode;
      siblingNode.firstNode = firstNode;

      parentTree.childs[siblingIndex] = this.node;
      parentTree.childs[nodeIndex] = siblingNode;

    }
  }

}
