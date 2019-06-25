import {UINames, DataSources} from "../const";

import swiper from "./swiper/Swiper";
import BaseInfo from "./sceneBaseInfo/BaseInfo";
import Explain from "./Explain";
import SkuGroup from "./sceneSkuGroup/SkuGroup";


Vue.component(UINames.Swiper, swiper);
Vue.component(UINames.SceneBaseInfo, BaseInfo);
Vue.component(UINames.Explain, Explain);
Vue.component(UINames.SkuGroup, SkuGroup);

function getDataSourceFormat(cfg = [])
{
    let fmt = {};
    let n = cfg.length;
    while(n--)
    {
         let c = cfg[n];
         fmt[c.name] = c.value;
    }
    return fmt;
}

export default [{
        label:"轮播图", name:UINames.Swiper,
        default:{ rate: 0.3,
            images: [{src:"https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",type:'panorama',target:""},{src:"https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",type:'image',target:""}]
        },
        dataSource:{
            default:{},
            list:[]
        }
    },
    {
        label:"方案详情基本信息", name:UINames.SceneBaseInfo,
        default:{ title:"北欧生活 惬意人生",
           type:"一室一厅",
           style:"现代北欧",
           size:"129m2",
           totalPrice:"12000"
        },
        dataSource:{
            default:getDataSourceFormat([{name:DataSources.SkuList, value:{totalPrice:12000}}]),
            list:[DataSources.SkuList]
        }
    },
    {
        label:"方案介绍", name:UINames.Explain,
        default:{
            desc:
              "因为这里能让我们流连忘返；喜欢这里，因为淡雅的蓝、因为窗外永恒的景色，让我们的内心变得优雅而宁静；喜欢这里，充满艺术感的居住空间让我们平实的追求中也找到了幸福与快乐"
        },
        dataSource:{
            default:{},
            list:[]
        }
    },
    {
        label:"方案SKU组合", name:UINames.SkuGroup,
        default:{
            title: "客厅",
            image: "https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",
            desc:"因为这里能让我们流连忘返；喜欢这里，因为淡雅的蓝、因为窗外永恒的景色，让我们的内心变得优雅而宁静。"
        },
        dataSource:{
            default:getDataSourceFormat([{name:DataSources.SkuList, value:{list:[]}}]),
            list:[DataSources.SkuList]
        }
    }
];