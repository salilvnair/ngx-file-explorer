import { Component } from '@angular/core'
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { NgxFileNode } from '../ngx-file-node'
import { CommonUtil } from '../util/common.util';

@Component({
    selector: 'ngx-file',
    templateUrl: './ngx-file.component.html',
    styleUrls: ['./ngx-file.component.css']
})
export class NgxFileComponent {
    @Input() node: NgxFileNode
    @Input() index: number
    @Output() clicked: EventEmitter<NgxFileNode>

    constructor() { this.clicked = new EventEmitter() }

    clickFolderExpand(node: NgxFileNode) { this.node.isExpanded = !this.node.isExpanded }

    clickItem(node: NgxFileNode) { this.clicked.emit(node) }

    propagate(node: NgxFileNode) { this.clicked.emit(node) }

    fileType(name:string) {
        return CommonUtil.getFileExtension(name);
    }
}