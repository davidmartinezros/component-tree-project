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

  loadNode() {
    this.node.lastNode = this.lastNode;
    console.log("el node " + this.node.name + " te lastNode " + this.node.lastNode);
    if(this.node.parents == null) {
      this.node.parents = [];
    }
    if(this.parent != null) {
      for(let p of this.parent.parents) {
        if(!this.node.parents.filter(x => x.id === p.id)[0]) {
          this.node.parents.push(p);
        }
      }
      if(!this.node.parents.filter(x => x.id === this.parent.id)[0]) {
        this.node.parents.push(this.parent);
      }
      console.log("afegim parent " + this.parent.name + " amnb lastNode " + this.parent.lastNode);
    }
    console.log('el node ' + this.node.name + " te " + this.node.parents.length + " parents.");
  }

}
