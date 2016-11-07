import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Node } from '../node.class';

import { ReturnsJsonArrayService } from '../returns-json-array.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
  providers: [ReturnsJsonArrayService]
})
export class LoadComponent implements OnInit {

  model: any;

  static tree: Observable<Array<Node>>;

  constructor(private service: ReturnsJsonArrayService) {
    this.loadFile();
    console.log("AppComponent.data:" + LoadComponent.tree);
  }

  ngOnInit() {

  }

  loadFile() {
    if(this.model != null) {
      LoadComponent.tree = this.service.getTreeFromFile(this.model);
    }
    LoadComponent.tree = this.service.getTree();
  }

}
