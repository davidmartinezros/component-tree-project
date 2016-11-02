import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ReturnsJsonArrayService } from '../returns-json-array.service';

import { Node } from '../node.class';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [ReturnsJsonArrayService]
})
export class TreeComponent {
  
  tree: Observable<Array<Node>>;

  constructor(private service: ReturnsJsonArrayService) {
    this.tree = service.getTree();
    console.log("AppComponent.data:" + this.tree);
  }

}
