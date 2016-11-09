import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  //model: any;

  tree: Observable<Array<Node>>;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: ReturnsJsonArrayService) {
    this.loadFile();
    console.log("AppComponent.data:" + this.tree);
  }

  ngOnInit() {

  }

  loadFile() {
    this.tree = this.service.getTree('./data/tree.json');
  }

  onChange(event) {
    console.log('event:' + event);
    var file: File = event.srcElement.files[0];
    var url;
    console.log('file:' + file);
    console.log('file.name:' + file.name);
    if(file != null) {
      url = URL.createObjectURL(file);
    } else {
      url = './data/tree.json';
    }
    console.log('url:' + url);
    if(url != null) {
      this.tree = this.service.getTree(url);
    }
    console.log('enviem');
    this.notify.emit(this.tree);
    console.log('fi onChange');
  }

}
