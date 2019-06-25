
const ClsName = "SkuList";

export default class SkuList {
    static Name = ClsName
    constructor()
    {
        this.name = ClsName;
        this.range = [];
    }

    //合并数据
    mergeRange(range)
    {
        if( !range ) return;

        range.forEach(el => {
            if( this.range.indexOf(el) < 0 ) this.range.push(el);
        });
    }

    getRangeData(range)
    {
        return [];
    }

    static create()
    {
        return new SkuList();
    }

    //加载数据
    load() {
    }
}