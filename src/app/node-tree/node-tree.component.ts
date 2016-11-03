import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../node.class';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.css']
})
export class NodeTreeComponent implements OnInit {

  @Input() node: Node;

  @Input() lastNode: boolean;

  @Input() lastParentNode: boolean;

  @Input() countParents: number;

  constructor() { }

  ngOnInit() {
  }

  clickExpandCollapse() {
    this.node.expand = !this.node.expand;
  }

  getNumber(num: number) {
    return new Array(num);   
  }

}
