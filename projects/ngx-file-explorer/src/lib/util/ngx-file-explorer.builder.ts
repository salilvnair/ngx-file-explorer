export class NgxFileExplorerBuilder {

    table = [];

    public filePathCollection(pathString:any[]) : NgxFileExplorerBuilder {
        this.table = pathString;
        return this;
    }

    public build() {
        let t = [];
        this.table.forEach((entry) => {
            t = this.addToTree(t, entry);
        });
        console.log(JSON.stringify(t, null, 2))
        return t;
    }

    addLeaf(array:any){
        if (!array || !array.length) return;      
        let temp = { name:array[0], children: []};
        if (array.length > 1) {
          temp.children = [this.addLeaf(array.slice(1))];
        }
        else {
          //console.log(temp.name)
          if(temp.name.indexOf("_color_")>-1){
            temp['color'] =  temp.name.split("_color_")[1];
            temp.name = temp.name.split("_color_")[0];
          }
        }
        return temp;
    }

    addToTree(tree:any, array:any){
        if (!array || !array.length) return [];  
        const branchIndex = tree.findIndex(entry => entry.name === array[0]); 
        if (branchIndex !== -1) {
          tree[branchIndex].children = [...this.addToTree(tree[branchIndex].children, array.slice(1))];
        } else {
          tree = [...tree, this.addLeaf(array)];
        }
        return tree;
      };

}