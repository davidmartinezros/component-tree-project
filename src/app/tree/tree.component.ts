import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Node } from '../node.class';

import { LoadComponent } from '../load/load.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
  @Input() tree: Observable<Array<Node>>;

  constructor() {
    console.log("AppComponent.data:" + this.tree);
  }

  ngOnInit() {

  }

}
