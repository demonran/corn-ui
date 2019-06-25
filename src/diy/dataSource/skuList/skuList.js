const ClsName = "skulist";

export default class SkuList {
    static Name = ClsName
    constructor(query,config)
    {
        this.name = ClsName;
        this.query = query;
        this.dataSource = null;
        this.config = config;
    }

    //合并数据
    mergeQuery( cfg )
    {
        if( !cfg ) return;
        if( !this.query ) {
            this.query = {skuIds:[]};
            this.config = {};
        }

        if( cfg.list ) {
            cfg.list.forEach(item=>{
                if( this.query.skuIds.indexOf(item.skuId) < 0 ) {
                    this.query.skuIds.push( item.skuId );
                    this.config[item.skuId] = parseInt(item.amount);
                } else {
                    this.config[item.skuId] += parseInt(item.amount);
                }
            })
        }
    }

    //获取某个组件的数据
    getComponentData(cfg)
    {
        let data = {};
        if(cfg.list){   
            let ds = this.dataSource;

            let list =  cfg.list.map(d=>{
                let n = ds.length;
                let ret = null;
                while( n-- ) {
                     if( ds[n].skuId == d.skuId)
                     {
                        ret = {...ds[n], amount:d.amount};
                        break;
                     }
                }
                return ret;
            })
            data.list = list;
        }

        if(cfg.totalPrice != undefined){
            let totalPrice = 0;
            this.dataSource.forEach(d => {
                let amount = this.config? this.config[d.skuId] : null;

                console.log( this.config );
                totalPrice += (d.price * (amount?amount:1))
            });
            data.totalPrice = totalPrice.toFixed(2);
        }
        return data;
    }
    
    //保存组件数据
    saveComponentData(cfg)
    {
        let data = {};
        if(cfg.list) {
            let skuids = cfg.list.map((d, i) => {
                return {skuId:d.skuId, amount:d.amount?d.amount:1};
            })
            data.list = skuids;
        }
        if( cfg.totalPrice ) {
            data.totalPrice = 10;
        }
        return data;
    }

    static create(query,config)
    {
        return new SkuList(query,config);
    }

    //加载数据
    load() {
        let scope = this;
        return new Promise(resolve => {
            console.log( this.query );

            Infish.http.post("/app/goods/getListBySkuIds", {skuIds:JSON.stringify(this.query.skuIds)}).then((ret)=>{
                
                if( ret.data.errorNo == "0" ) {
                    let dataSource = ret.data.result;
                    let n = dataSource.length;
                    while( n-- ) {
                        dataSource[n].imgUrl = dataSource[n].imgUrl.split(",")[0];
                    }
                    scope.dataSource = dataSource;
                    
                    resolve( dataSource );
                    return;
                }
                console.error("getListBySkuIds-->", ret.data.errorDesc );
                resolve();
            }).catch((error)=>{
                console.error("getListBySkuIds catch error-->", error);
                resolve();
            });
        });
    }
}