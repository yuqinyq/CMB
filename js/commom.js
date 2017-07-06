/* *
*  全局变量
* */
let rate_obj = {
    a : 0,
    b : 0,
    c : 0,
    d : 0
}
/* *
*  vue 实列
* */
const vm = new Vue({
    el : '.container',
    creatd : {},
    data : {
        len : 0,
        is_show :true,
        // 存放输入数据的数组；
        total : [],
        // 输出输出数据的数组；
        outpt : [],
        display : []
    },
    methods : {
        // 利息计算
        ab : function (idx) {
            let self = this;
            // 利率计算
            calculate(self,idx)
        },
    },
    components : {},
    watch : {
        len : function () {
            // 初始化一个二维数组,js里不能直接声明二维数组；
            for (let i = 0 ; i < parseFloat(this.len) ; i++){
                this.total[i] = [];
                this.outpt[i] = [];
            }
        }
    },
    computed : {
        aa :
            // getter
            function () {
               let self = this;
               // 动态创建分期数；
               return add(self);
        },
        // 全部总利息
        sum : function () {
            let self = this;
            // 计算总利息、每期总利息、本息共计
            return sum_all(self);
        }
    },
    filters : {}
});
/* *
*  功能：动态创建分期数
*  参数1：vue实列；
* */
function add(arry) {
    if (arry.len === ''){
        arry.is_show = true;
        return arry.len = 0;
    }else if(arry.len === 0){
        arry.is_show = true;
        return;
    }
    arry.is_show = false;
    return arry.len = parseInt(arry.len);
}
/* *
*   功能 ：计算利息
*   参数1 ：分期还款金额
*   参数2 ：分期数量
* */

function calculate(obj,idx) {
    if (obj.total[idx][0]){
        // a -- 每期利息 b--- 总利息 c--- 每期本息 d--- 总本息 this.total[idx][1]为第idx期贷款期数；this.total[idx][0]为第idx期贷款金额
        switch ( obj.total[idx][1] ) {
            case 2 : {calculate_single(obj,idx,0.01)}break;
            case 3 : {calculate_single(obj,idx,0.009)}break;
            case 6 : {calculate_single(obj,idx,0.0075)}break;
            case 10 : {calculate_single(obj,idx,0.007)}break;
            case 12 : {calculate_single(obj,idx,0.0066)}break;
            case 18 : {calculate_single(obj,idx,0.0068)}break;
            case 24 : {calculate_single(obj,idx,0.0068)}break;
        }
    }else {
        rate_obj.a = '';
        rate_obj.b = '';
        rate_obj.c = '';
        rate_obj.d = '';
    }
    // 给新增的数据添加观察，能实现数据的动态响应；
    Vue.set(obj.outpt,idx,[rate_obj.a,rate_obj.b,rate_obj.c,rate_obj.d])
}
/* *
*  功能：单期利率计算
* */
function calculate_single(obj,idx,rate) {
    rate_obj.a = ((obj.total[idx][0] * rate)/2).toFixed(2);
    rate_obj.b = ((obj.total[idx][0] * rate)).toFixed(2);
    rate_obj.c = ((obj.total[idx][0] * (1 + rate))/2).toFixed(2) ;
    rate_obj.d = (obj.total[idx][0] * (1 + rate)).toFixed(2);
}
/* *
*  功能：计算总利息、每期总利息、本息共计
* */
function sum_all(obj) {
    let a = 0,
        b = 0,
        c = 0;
    for (let i = 0 ; i < obj.outpt.length ; i++){
        if (!obj.total[i][0]){
            continue;
        }
        a += parseFloat(obj.outpt[i][0])
        b += parseFloat(obj.outpt[i][1])
        c += parseFloat(obj.outpt[i][3])
    }
    if (!obj.len){
        a = 0;
        b = 0;
        c = 0;
    }
    a = a.toFixed(2);
    b = b.toFixed(2);
    c = c.toFixed(2);
    return [a,b,c]
}
/* *
*  交互事件 运用jquery来做；
* */
$(".hover").click(function () {
    let self = $(this);
    self.parents(".list-group-item").next().slideToggle();
    if (self.text() === "+"){
        self.text("-");
    }else if (self.text() === "-"){
        self.text("+");
    }
    let span = self.parents(".list-group-item").siblings().find(".hover");
    span.each(function (idx,ele) {
        if ($(this).text() === '-'){
            $(this).parents(".list-group-item").next().slideToggle();
            $(this).text('+');
        }
    })
})





/*--------  测试  ------*/

