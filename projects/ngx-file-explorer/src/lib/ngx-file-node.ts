export class NgxFileNode {
    name: string;
    type: string;
    color: string;
    isRoot:boolean;
    children: Array<NgxFileNode>;
    _parent: NgxFileNode;
    _focus: boolean;
    _is_folder: boolean;
    _is_expanded: boolean;
    _params: Object;

    constructor(opts:{
        name?: string,
        color?: string,
        path?: string,
        expanded?: boolean,
        isRoot?:boolean,
        type?: string,
        children?: Array<NgxFileNode>,
        _focus?: boolean
    } = {}, parent: NgxFileNode = null) {
        this.name = opts.name || opts.path
        this.type = opts.type || ''
        this.color = opts.color || 'black';
        this.isRoot = opts.isRoot;
        this.children = opts.children || []
        var _children: Array<NgxFileNode> = []
        this.children.forEach((node) => _children.push(new NgxFileNode(node, this)))
        this.children = _children

        this._params = opts
        this._parent = parent
        this._focus = opts._focus || false
        this._is_folder = this.type === 'dir' || this.children.length > 0
        this._is_expanded = opts.expanded || false;
        
    }

    get params(): Object { return this.params }
    set params(p: Object) { this.params = p }

    get parent(): NgxFileNode { return this._parent }
    set parent(n: NgxFileNode) { this._parent = n }

    get isFolder(): boolean { return this._is_folder }

    get isExpanded(): boolean { return this._is_expanded }
    set isExpanded(t: boolean) { this._is_expanded = t }

    public hasParent(): boolean { return this.parent !== null || typeof (this.parent) === 'undefined' }

    public hasChildren(): boolean { return this.children !== null || typeof (this.children) != 'undefined' && this.children.length > 0 }
    

    public focus() { this._focus = true }

    public blur() { this._focus = false }

    public stringify() {
        return JSON.stringify(this, (key: string, value: any) => {
            if (key.includes('_')) return
            else return value
        })
    }
}