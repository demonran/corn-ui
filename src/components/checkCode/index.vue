<template>
    <div class="get_code" @click="drawCode('')" id="code">
        <canvas width="100" height="40" id="verifyCanvas"></canvas>
        <img id="code_img">
    </div>　　　
</template>
<script>
export default {

    data()
    {
        return {
            nums:["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ],
        }
    },

    mounted()
    {
        this.drawCode();
    },

    methods:{
         drawCode() 
         {
                document.getElementById('verifyCanvas').remove();//每次更新验证码都要移除canvas，然后再进行重绘
                var box = document.getElementById("code");
                var p1 = document.getElementById("code_img");

                var p0 = document.createElement('canvas');//创建canvas节点
                p0.id = 'verifyCanvas';//定义canvas id

                box.insertBefore(p0, p1);//将canvas节点插入到img节点前面
                p0.width = 100;//设置画布宽度
                p0.height = 40;//设置画布高度
                var canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
                var context = canvas.getContext("2d"); //获取画布2D上下文环境
                context.fillStyle = "#fff"; //画布填充色
                context.fillRect(0, 0, canvas.width, canvas.height); //清空画布
                context.fillStyle = "#800000"; //设置字体颜色
                context.font = "25px Arial"; //设置字体
                var rand = new Array();
                var x = new Array();
                var y = new Array();
                for(var i = 0; i < 4; i++) {
                    rand.push(rand[i]);
                    rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)];//在数组中随机取一个值
                    x[i] = i * 20 + 10;
                    y[i] = Math.random() * 20 + 20;
                    context.fillText(rand[i], x[i], y[i]);//设置文本在画布中显示的位置
                }
                this.str = rand.join('').toUpperCase();//将验证码的值中小写字母转为大写
                //画3条随机线
                for(var i = 0; i < 3; i++) {
                    this.drawline(canvas, context);
                }

                // 画30个随机点
                for(var i = 0; i < 30; i++) {
                    this.drawDot(canvas, context);
                }
                this.convertCanvasToImage(canvas);
                return this.str;
            },
            // 随机线
            drawline(canvas, context) {
                context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
                context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
                context.lineWidth = 0.5; //随机线宽
                context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
                context.stroke(); //描边，即起点描到终点
            },
            // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
            drawDot(canvas, context) {
                var px = Math.floor(Math.random() * canvas.width);
                var py = Math.floor(Math.random() * canvas.height);
                context.moveTo(px, py);
                context.lineTo(px + 1, py + 1);
                context.lineWidth = 0.2;
                context.stroke();

            },
            // 绘制图片
            convertCanvasToImage(canvas) {
                document.getElementById("verifyCanvas").style.display = "none";
                var image = document.getElementById("code_img");
                image.src = canvas.toDataURL("image/png");//画布转成图片地址
                return image;//返回图片对象
            }
    }
}
</script>

