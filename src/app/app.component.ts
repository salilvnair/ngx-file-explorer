import { Component, OnInit } from '@angular/core';
import { NgxFileNode, NgxFileExplorerBuilder } from 'projects/ngx-file-explorer/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngx-file-explorer-lib';
  rootFileNode:NgxFileNode;
  expandAll = false;
  collapseAll = false;
  expandAllNodes() {
    this.collapseAll = false;
    this.expandAll = true;
  }
  collapseAllNodes() {
    this.expandAll = false;
    this.collapseAll = true;
  }
  ngOnInit(): void {
    let diffFiles = [
      "src/com/att/adopt/frontload/echo/A.java_color_red",
      "src/com/att/adopt/frontload/echo/B.java_color_green",
      "war/WEB-INF/jsp/core/a.jsp_color_blue",
      "war/WEB-INF/jsp/core/b.jsp_color_red",
      "war/static/inc/a.js_color_green",
      "war/static/inc/b.js_color_red"
    ]
    let a = [];
    a = diffFiles.map(difFile=>{  
      return difFile.split("/");;
    })
    let ngxFileExplorerBuilder = new NgxFileExplorerBuilder();
    let rootChildren = ngxFileExplorerBuilder.filePathCollection(a).build();
    this.rootFileNode = new NgxFileNode({name:'root',children:rootChildren});
  }
}
