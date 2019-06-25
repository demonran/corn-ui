export default {
    layouts: [
        {
            name: "diyui-swiper",
            data:{ 
                rate: 0.3,
                images: [
                    {src:"https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",type:'panorama',target:""},
                    {src:"https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",type:'image',target:""}
                ]
            }
        },
        {
            name: "diyui-scenebaseinfo",
            data:{ 
                title:"北欧生活 惬意人生",
                type:"二室一厅",
                style:"北欧风格",
                size:"129m2"
            },
            dataSource:{
                default: {
                    skulist: { 
                        totalPrice: 10000 
                    }
                },
                list:['skulist']
            }
        },
        {
            name:"diyui-explain",
            data:{
                desc: "因为这里能让我们流连忘返；喜欢这里，因为淡雅的蓝、因为窗外永恒的景色，让我们的内心变得优雅而宁静；喜欢这里，充满艺术感的居住空间让我们平实的追求中也找到了幸福与快乐"
            }
        },
        {
            name:"diyui-skugroup",
            data:{
                title: "客厅",
                image: "https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",
                desc:"因为这里能让我们流连忘返；喜欢这里，因为淡雅的蓝、因为窗外永恒的景色，让我们的内心变得优雅而宁静。"
            },
            dataSource:{
                default: {skulist: { list: [1,2,3] }},
                list:['skulist']
            }
        },
        {
            name:"diyui-skugroup",
            data:{
                title: "客厅",
                image: "https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png",
                desc:"因为这里能让我们流连忘返；喜欢这里，因为淡雅的蓝、因为窗外永恒的景色，让我们的内心变得优雅而宁静。"
            },
            dataSource:{
                default: {skulist: { list: [4] }},
                list:['skulist']
            }
        }
    ],

    dataSource:[
        {
            name:"skulist",
            query: {
                ids: [1,2,3,4]
            }
        }
    ]
}
