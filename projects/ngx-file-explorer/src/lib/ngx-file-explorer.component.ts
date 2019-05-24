import {
    Component,
    EventEmitter, 
    Input, 
    Output, 
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core'

import {NgxFileNode} from './ngx-file-node'

@Component({
    selector: 'ngx-file-explorer',
    templateUrl: './ngx-file-explorer.component.html',
    styles: ['./ngx-file-explorer.component.css'],
    host: {
        '(window:keydown)': 'keydownHandler($event)'
    }
})
export class NgxFileExplorerComponent implements OnInit, OnChanges {
    @Input('root') rootNode: NgxFileNode;
    @Input() keyboardWatch: boolean;
    @Input() expandAll: boolean;
    @Input() collapseAll: boolean;
    @Output() onChange: EventEmitter<NgxFileNode>;

    // private _expandAll: boolean;
    // private _collapseAll: boolean;

    currFocusNode: NgxFileNode;

    constructor() {
        this.onChange = new EventEmitter()
        this.keyboardWatch = false
    }

    // get expandAll(): boolean {
    //     return this._expandAll;
    //   }
      
    // @Input()
    // set expandAll(expandAll: boolean) {
    //     this._expandAll = expandAll;
    // }

    // get collapseAll(): boolean {
    //     return this._collapseAll;
    // }
      
    // @Input()
    // set collapseAll(collapseAll: boolean) {
    //     this._collapseAll = collapseAll;
    // }

    ngOnInit() {
        this.rootNode = new NgxFileNode(this.rootNode);
        this.currFocusNode = null
        this.expandOrCollapseAllNodes(this.rootNode);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.expandOrCollapseAllNodes(this.rootNode);
    }

    expandOrCollapseAllNodes(node :NgxFileNode) {
       if(node.hasChildren()){
            node.children.forEach(child=>{
                this.expandOrCollapseAllNodes(child);
            })

            node.isExpanded = this.expandAll || !this.collapseAll;
       }
    }

    nodeClicked(nextNode: NgxFileNode) {
        this.updateFocusNode(nextNode);
        this.onChange.emit(nextNode)
    }

    keydownHandler(event: KeyboardEvent) {
        if (!this.keyboardWatch) return
        if (this.currFocusNode === null) return

        switch (event.keyCode) {
            case 13: // Enter
                this.onChange.emit(this.currFocusNode)
                break
            case 37: // left
                if (this.currFocusNode.isFolder
                    && this.currFocusNode.isExpanded) {
                    this.currFocusNode.isExpanded = false
                    return
                }
                if (!this.currFocusNode.hasParent()) return
                this.updateFocusNode(this.currFocusNode.parent)
                break
            case 38: // Up
                // Move to upper item
                let i = 0;     
                this.currFocusNode.parent.children.find((child,index)=>{
                    i = index;
                    if(child.name ===  this.currFocusNode.name) {
                        i--;
                        return true;
                    }
                    else{
                        return false;
                    }
                })      
                if(i>=0){
                    this.updateFocusNode(this.currFocusNode.parent.children[i]);
                }  
                break;
            case 39: // Right
                if (!this.currFocusNode.isFolder) return
                if (!this.currFocusNode.isExpanded) {
                    this.currFocusNode.isExpanded = true
                } else if (this.currFocusNode.children.length > 0) {
                    this.updateFocusNode(this.currFocusNode.children[0])
                }
                break
            case 40: // Down
                if (this.currFocusNode.isFolder
                    && this.currFocusNode.isExpanded
                    && this.currFocusNode.children.length > 0) {
                    // first child
                    this.updateFocusNode(this.currFocusNode.children[0])
                } else { 
                    if(this.currFocusNode.parent==null) {
                        break;
                    } 
                    let i = 0;     
                    this.currFocusNode.parent.children.find((child,index)=>{
                        i = index;
                        if(child.name ===  this.currFocusNode.name) {
                            i++;
                            return true;
                        }
                        else{
                            return false;
                        }
                    })      
                    if(i<=this.currFocusNode.parent.children.length-1){
                        this.updateFocusNode(this.currFocusNode.parent.children[i]);
                    }      
                    // next sibling
                }
                break
        }
    }

    private updateFocusNode(next: NgxFileNode) {
        if (this.currFocusNode) {
            this.currFocusNode._focus = false
        }
        this.currFocusNode = next
        this.currFocusNode._focus = true
    }

}