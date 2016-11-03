import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../node.class';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.css']
})
export class NodeTreeComponent implements OnInit {

  @Input() node: Node;

  @Input() last: boolean;

  constructor() { }

  ngOnInit() {
  }

  clickExpandCollapse() {
    this.node.expand = !this.node.expand;
  }

}
