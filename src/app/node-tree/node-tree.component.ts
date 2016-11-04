import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../node.class';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.css']
})
export class NodeTreeComponent implements OnInit {

  @Input() node: Node;

  @Input() parents: Node[];

  @Input() lastNode;

  @Input() lastParentNode;

  constructor() { }

  ngOnInit() {
    this.loadNode();
  }

  clickExpandCollapse() {
    this.node.expand = !this.node.expand;
  }

  loadNode() {
    this.node.lastNode = this.lastNode;
    this.node.lastParentNode = this.lastParentNode;
    console.log('el node ' + this.node.name + " te " + this.parents.length + " parents.");
  }

}
