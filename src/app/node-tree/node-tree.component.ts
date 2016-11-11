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

  loadNode() {
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

}
