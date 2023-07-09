"use strict"

const tttt = {
    vec: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    ray: new THREE.Raycaster(),
    box: new THREE.Box3()
}
const core = {
    ...tttt,
    halfPI: Math.PI / 2,
    twoPI: Math.PI * 2,


    l: (...v) => {  // 改写console.log 上线就不运行
        // if(!DEBUG) return
        // console.log(...v)
        return null
    }

    , sleep: function (time) {
        return new Promise((res, _) => {
            let tt = setTimeout(() => {
                res()
                clearTimeout(tt)
            }, time * 1000)
        })
    }


    , ms: (s) => {
        return new Promise((res, _) => {
            setTimeout(() => {
                res()
            }, s)
        })
    }

    , uuid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    seconde2Min: (time) => core.Seconde2Min(time),  // 为了兼容
    /** 秒数转字符串时间 */
    Seconde2Min: (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        const hours = Math.floor(time / 3600);
        time = time - hours * 3600;

        function str_pad_left(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }

        let finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2)
        if (hours) finalTime = str_pad_left(hours, '0', 2) + finalTime
        return finalTime
    },

    /**
     * 秒数转天小时分
     * @param {Number} s
     * @returns {{ days: Number, hours: Number , minutes: Number , seconds: Number }}
     */
    Seconds2Time(s) {
        // const day = Math.floor(totalMins / 1440) 
        // const hour = Math.floor(totalMins / 60) % 24 
        // const min =  totalMins % 60 

        //计算出相差天数
        const days = Math.floor(s / (24 * 3600 * 1))

        //计算出小时数
        const leave1 = s % (24 * 3600 * 1)    //计算天数后剩余的秒数
        const hours = Math.floor(leave1 / (3600 * 1))
        //计算相差分钟数
        const leave2 = leave1 % (3600 * 1)        //计算小时数后剩余的秒数
        const minutes = Math.floor(leave2 / (60 * 1))
        //计算相差秒数
        const leave3 = leave2 % (60 * 1)      //计算分钟数后剩余的秒数
        const seconds = Math.round(leave3 / 1)

        return { days, hours, minutes, seconds }
    },

    /**
     * 计算两个时间的差别用于显示
     * @param {Number} future 
     * @param {Number} now 
     * @param {Boolean} isMill 是否是毫秒 
     * @returns {Number} 秒数
     */
    TimeDiff(future, now = (Date.now() / 1000), isMill) {
        let ff = isMill ? (future / 1000) : future
        let nooow = isMill ? (now / 1000) : now
        let time = Math.floor(nooow)
        time = Math.floor(ff) - time
        // const time = Math.floor(future - now) / 60
        return time
    },

    /**
     * 16进制颜色转css用的hex字符串
     * @param {Number}
     * @returns {String}
     */
    Color16ValToHex(val = 0xffff00) {
        let v = Math.round(val).toString(16)
        if( v.length < 6 ){  // 弥补足6位
            let cc = 6 - v.length
            while( cc-- ) v = '0' + v
        }
        return '#' + v
    },

    /* // 改变页面URL地址
    ,replaceURL:  function () {
        // if (!isOnline) return  // 上线了才替换
        // 修改页面链接
        // var stateObj = { foo: "bar" };
        // history.pushState(stateObj, "page 2", "bar.html"); //推到历史中
    
        // history.replaceState({page: 0}, 'DogFightX', '?stat=1'); //直接替换
        window.history.replaceState({page: 0}, 'DogFightX', '?start') // 直接替换
    }
    */



    // 获取地址栏后面的参数， 用 ,getQueryParams().参数的方式调用
    getQueryParams: function () {
        var qs = window.location.search
        if (!qs) {
            // console.error('getQueryParams no parameter')
            return {}
        }
        qs = qs.split('+').join(' ')

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
        }
        return params
    }
    // 限定最大最小值
    , normalize: function (v, vmin, vmax, tmin, tmax) {
        var nv = Math.max(Math.min(v, vmax), vmin) // 限制在 vmax 和 vmin 之间
        var dv = vmax - vmin // 最大最小的区间范围
        var pc = (nv - vmin) / dv  // 当前值在区间中的百分比
        var dt = tmax - tmin // 要达到值的区间
        var tv = tmin + (pc * dt) // 在区间的百分比 + 最小值 = t 范围的值
        return tv
    }

    // 限定最大最小值
    , clamp: function (v, min = 0, max = 1) {
        return Math.min(Math.max(v, min), max);
    }

    //数组单一化 去掉重复
    , uniqueArray: function (ar) {
        // return myArray.filter((v, i, a) => a.indexOf(v) === i);
        return ar.filter((x, i, a) => a.indexOf(x) === i)
        // var j = {};
        //
        // ar.forEach( function(v) {
        //   j[v+ '::' + typeof v] = v;
        // });
        //
        // return Object.keys(j).map(function(v){
        //   return j[v];
        // });
    },

    /**
     * 权重随机
     *         const enemyList = [   // 怪物类型随机
            [Enum_Enemy_Types.Goblin, 100],
            [Enum_Enemy_Types.Archer, 60],
            ]
     * @param {[ Array<string, number> ]} list 
     * @returns 
     */
    weightRandom(list) {
        let totalWeights = 0;
        for (const [, weight] of list)
            totalWeights += weight;

        let random = Math.random() * totalWeights;
        for (const [id, weight] of list)
            if ((random -= weight) < 0)
                return id;
        return list[list.length - 1];
    }
    ,


    //  * @param { Array<{ [key]: Number }> } list 需要随机的数组
    /**
     * 权重循环出结果, 传入数组 [ {vv: 300, cc: 100, aa: 1}]
     * @param { Array< object.< string, Number >> } list 需要随机的数组
     */
    RandomWithWeight(list) {
        let totalWeights = 0
        for (let i of list) {
            totalWeights += Object.values(i)[0]
        }
        let random = Math.random() * totalWeights
        // console.log('随机结果', random, totalWeights)
        for (let i of list) {
            // random -= list[ i ]   // 每次减去值
            random -= Object.values(i)[0]   // 每次减去值
            if (random < 0) return Object.keys(i)[0]
        }

        return Object.keys(list[list.length - 1])[0]
    }


    /**
     * 数组随机
     * @param {*} list 
     * @returns 
     */
    , listRandom: function (list) {
        return list[Math.floor(Math.random() * list.length)];
    },


    /**
     * 数字转换字符，带 K 和 M
     * @param {Number} num 输入数字
     * @param {Number} keepFix 保留小数位
     * @returns {String}
     */
    NumberFormat(num, keepFix = 2) {
        num = num.toString().replace(/[^0-9.]/g, '');
        if (num < 10000) {
            return num;
        }
        let si = [
            { v: 1E3, s: "K" },
            { v: 1E6, s: "M" },
            { v: 1E9, s: "B" },
            { v: 1E12, s: "T" },
            { v: 1E15, s: "P" },
            { v: 1E18, s: "E" }
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (num / si[index].v).toFixed(keepFix).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    },


    /**
     * 数字转百分比的字符
     * @param {Number} x 
     */
    Number2PercentStr(x) {
        let f = parseFloat(x)
        if (isNaN(f)) return x

        f = ~~(x * 100)
        return f + '%'
    },

    /** 
     *  功能：将浮点数四舍五入，取小数点后2位
    */
    toDecimal: function (x) {
        let f = parseFloat(x)
        if (isNaN(f)) {
            return x
        }
        // f = Math.round(x*100)/100;
        f = ~~(x * 100) / 100
        return f
    }

    // 模拟花瓣翻转的效果，当当前变形量超过原先尺寸时，变形方向改为相反方向（本来变大改为变小） (当前值得， 最大值， 速度值)
    , getMinusInRange: function (val, max, speedVal) {
        var speed = speedVal
        if (val < -(max)) {  // 小过最小值
            speed = speedVal
        } else if (val > max) {  // 超过最大值
            speed = -speedVal
        } else if (val < max && val > 0) {
            speed = -speedVal
        }
        // if(val >-max && val <0){
        //     speed=speedVal
        // };
        return speed
    }

    // 检查是否是手机
    , isMobile: function () {
        var isMobile = false // initiate as false
        // device detection
        // if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        // /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true
        const checkI = /iPad|iPhone|iPod/.test(navigator.userAgent)
        // const checkIPad = (navigator.userAgent === 'MacIntel' && navigator.maxTouchPoints > 1)
        // const checkIPad = (navigator.userAgent === 'MacIntel' && navigator.maxTouchPoints > 1)
        // 2023.6.20 苹果在iPad上改了userAgent 通过最大触摸判断
        const checkIPad = (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1)
        if (checkI || checkIPad) isMobile = true
        return isMobile
    }


    , isIOS: function () {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    }

    // 判断数据类型
    , _typeof,

    // util作为判断变量具体类型的辅助模块
    util: (function () {
        var class2type = {};
        ['Null', 'Undefined', 'Number', 'Boolean', 'String', 'Object', 'Function', 'Array', 'RegExp', 'Date'].forEach(function (item) {
            class2type['[object ' + item + ']'] = item.toLowerCase()
        })

        function isType(obj, type) {
            return getType(obj) === type
        }
        function getType(obj) {
            return class2type[Object.prototype.toString.call(obj)] || 'object'
        }
        return {
            isType: isType,
            getType: getType
        }
    })()
    // 深度copy
    , deepCopy


    //判断是否为空
    , isNull: function (obj) {
        if (obj === undefined || obj === null) return true
        const t = _typeof(obj)
        // console.log('判断空',obj, t);
        if (t !== 'string') return false
        obj = delSpace(obj)// 删除空格
        // if(obj === ' ') return true;
        if (obj === '') return true
        return false
    },
    // 去掉空格
    delSpace,


    // 生成 min max 范围内的随机数
    getRandomIntInRange: function (min, max) {
        return parseInt(Math.random() * max, 10) + min
    },

    /**
     * 获取Object数量
     * @param {Object} a 要判断长度的对象
     */
    Olength: function (a) {
        return Object.keys(a).length
    },

    /**
     * 根据object value获取key的名字
     * @param {*} v 
     * @param {Object} obj
     */
    GetKeyFromValue(v, obj) {
        for (let i in obj) {
            if (obj[i] !== v) continue
            return i
        }
    },

    /**
     * lerp 过渡数值
     * @param {Number} value1 启动值
     * @param {Number} value2 终值
     * @param {Number} amount 过渡
     */
    lerp(value1, value2, amount) {
        amount = Math.max(Math.min(amount, 1), 0);
        return value1 + (value2 - value1) * amount;
    },

    // 角度变方向
    degToDirection: function (num) {
        // var val = Math.floor((num / 22.5) + 0.5);
        // var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        if (num < 0) num += 360
        var val = Math.floor((num / 45) + 0.5)
        var arr = [1, 2, 3, 4, 5, 6, 7, 8]
        val = (val % 16)
        if (val >= arr.length) val = 0

        var returnVal = arr[val]
        return returnVal
    }

    // 角度换弧度
    , angleToRadian: function (angle) {
        // angle = angle < 0 ? angle + 360 : angle;
        angle = angle >= 360 ? angle - 360 : angle
        angle = angle < 0 ? angle + 360 : angle
        return (angle * Math.PI) / 180
    }

    //弧度转角度
    , radianToAngle: function (radian) {
        return 180 / (Math.PI / radian)
    }

    // 计算两者的角度
    , getAngle: function (px1, py1, px2, py2) {
        // 两点的x、y值
        var x = px2 - px1
        var y = py2 - py1
        var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        // 斜边长度
        var cos = x / hypotenuse
        var radian = Math.acos(cos) // 求出弧度

        var angle = 180 / (Math.PI / radian)
        // 用弧度算出角度
        // if (y < 0) {
        //   angle = -angle
        // } else if ((y == 0) && (x < 0)) {
        //   angle = 180
        // }

        angle = angle || 0
        return ~~(angle)  //parseInt
    }


    , getAngle2: function (startx, starty, endx, endy) {
        var diff_x = endx - startx,
            diff_y = endy - starty;
        // return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);

        let degree = Math.atan2(diff_y, diff_x)
        degree /= (Math.PI / 180)  //弧度转角度
        degree -= 90;// 默认先减90度，再取反
        degree = -degree;
        return degree
    }

    //求两点间弧度
    , getRadian: function (px1, py1, px2, py2) {
        // var circle = Math.PI * 2
        var radian = Math.atan2(py2 - py1, px2 - px1);

        // while(radian > circle) radian -= circle
        // while(radian < 0) radian += circle
        // 两点的x、y值
        // var x = px2 - px1
        // var y = py2 - py1
        // var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        // // 斜边长度
        // var cos = x / hypotenuse
        // var radian = Math.acos(cos) // 求出弧度
        return radian
    }

    , dirToRadian: function (dir) {  // 2D 方向转角度
        return Math.atan2(dir.z, dir.x);
    }

    , radianToDir: function (r) {  // 2D 转向角度转方向
        // this._shootDir.x = Math.cos( this.getYFunc() )
        // this._shootDir.z = Math.sin( this.getYFunc() )
        return {
            x: Math.cos(r),
            z: Math.sin(r)
        }
    }


    // 碰撞计算 计算距离
    , getDistance: function (self, pt) {
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.z - pt.z, 2))
    }
    // 3D 碰撞计算 计算距离
    , get3DDistance: function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }




    //计算一点到线的距离
    // p: point, v:lineStart, w:lineEnd
    , getDisToLine: function (p, v, w) {

        function sqr(x) {
            return x * x
        }

        function dist2(v, w) {
            return sqr(v.x - w.x) + sqr(v.z - w.z)
        }

        var l2 = dist2(v, w);//判断两点间距离
        if (l2 == 0) return dist2(p, v);//如果线是一个点就返回两点间距离

        var t = ((p.x - v.x) * (w.x - v.x) + (p.z - v.z) * (w.z - v.z)) / l2;

        if (t < 0) return dist2(p, v);
        if (t > 1) return dist2(p, w);

        return dist2(p, { x: v.x + t * (w.x - v.x), z: v.z + t * (w.z - v.z) });
    }


    //计算3D中一点到线的距离
    // p: point, v:lineStart, w:lineEnd
    , getDisToLine3D: function (p, v, w) {
        function sqr(x) {
            return x * x
        }
        function dist3D(v, w) {
            return sqr(v.x - w.x) + sqr(v.y - v.y) + sqr(v.z - w.z)
        }
        var lineDist = dist3D(v, w)
        if (lineDist === 0) return dist3D(p, v)
        var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y) + (p.z - v.z) * (w.z - v.z)) / lineDist
        // console.log('t大小', t)
        if (t < 0) return dist3D(p, v);
        if (t > 1) return dist3D(p, w);
        var cut = {
            x: v.x + t * (w.x - v.x),
            y: v.y + t * (w.y - v.y),
            z: v.z + t * (w.z - v.z)
        }
        return dist3D(p, cut);
    }


    /**
     * 计算N个点均匀排列成圆的各个点坐标
     * @param nodeSize 参与排列成圆的元素个数
     * @param center 圆的中心点坐标 {x:, y:}
     * @param radius 圆的半径
     * @return 各个元素的坐标：[{x:, y:}, {x:, y:}, ...]
     */
    , CircularLayout: function (nodeSize, radius, center) {
        center = center || { x: 0, y: 0 }
        var i, _i, _layouts = [];
        for (i = _i = 0; _i < nodeSize; i = ++_i) {
            var x = center.x + radius * Math.sin(2 * Math.PI * i / nodeSize),
                y = center.y + radius * Math.cos(2 * Math.PI * i / nodeSize);

            _layouts.push({ 'x': x, 'y': y });
        }

        return _layouts;
    }


    //圆形分布  radius半径, i第几位, sum总数
    , posCircular: function (radius, i, sum) {
        return {
            x: radius * Math.sin(2 * Math.PI * i / sum),
            z: radius * Math.cos(2 * Math.PI * i / sum)
        }
    }

    //球形随机分布
    , randomInSphere: function (R) {
        return tttt.vec.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(R * Math.random())
    }

    //球形表面随机分布
    , randomInSphereSurface: function (R, noY) {
        let y = Math.random() * -0.5 //不要负值
        if (noY) {
            if (y < -0.2) y = -y  //避免过多直向下
        }
        return tttt.vec.set(Math.random() - 0.5, y, Math.random() - 0.5).normalize().multiplyScalar(R)
    }

    //环形随机分布  R是半径，C是范围
    , randomInCircle: function (R, C) {
        return tttt.vec.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize().multiplyScalar(R - C + C * Math.random())
    }


    // 计算某点半径内的一个随机点  POS：点， radius：半径
    , randomPosInRadius: function (POS, radius) {
        var angle = Math.random() * 360 // 随机角度
        var radian = Math.sin(2 * Math.PI / 360) * angle // 得出弧度
        var y = Math.sin(radian) * radius
        var x = Math.cos(radian) * radius
        // console.log('角度是', angle, x, y);
        POS.x += x
        POS.y += y
        return POS
    }

    // forward 前进移动
    , forward: function (pos, rotation, speed) {
        pos.z += Math.sin(rotation) * speed;
        pos.x += Math.cos(rotation) * speed;
    }


    // 判断含有threejs object的数量
    , MLength: function (mesh, type) {
        type = type || THREE.Mesh
        var count = 0
        var delCount = 0
        mesh.traverse(function (object) {
            // console.log('type', object.name, object.type,count);
            if (object instanceof type) {
                if (!object.name) {
                    delCount += 1
                    mesh.remove(object)
                } else {
                    count += 1
                }
            }
        })
        // console.log('最后数字',count, '删除', delCount);
        return count
    }



    // 获取两点间的点  percentage是0-1的百分比
    , getPointInBetweenByPerc: function (pointA, pointB, percentage) {
        percentage = percentage || 0.5
        let vec = tttt.vec
        vec.copy(pointB)
        let dir = vec.sub(pointA)
        let len = dir.length()
        dir = dir.normalize().multiplyScalar(len * percentage)
        vec.copy(pointA)
        vec.add(dir)
        return vec
    }

    // 位置取整
    , posRound: function (pos) {
        return {
            // x:Math.round(pos.x),
            // y:Math.round(pos.y),
            // z:Math.round(pos.z)
            x: ~~(pos.x),
            y: ~~(pos.y),
            z: ~~(pos.z)
        }
    }

    // 读取dae文件
    , loadCollada: function (URL, cb) {
        var loader = new THREE.ColladaLoader()
        loader.options.convertUpAxis = true
        loader.load(URL, function (collada) {
            var dae = collada.scene

            dae.traverse(function (child) {
                if (child instanceof THREE.SkinnedMesh) {
                    var animation = new THREE.Animation(child, child.geometry.animation)
                    animation.play()
                }
            })
            dae.scale.x = dae.scale.y = dae.scale.z = 0.002
            dae.position.x = -1
            dae.updateMatrix()
            cb(dae)
        })
    }


    //3D位置转换成2D屏幕位置, 输入位置，相机，一半的宽和高
    , position2Screen: function (target, camera, widthHalf, heightHalf) {
        if (!target || !camera) return //没有瞄准就返回
        if (!target.matrixWorld) { console.error('get 2D error'); return; }
        tttt.vec.setFromMatrixPosition(target.matrixWorld);
        tttt.vec.project(camera);

        tttt.vec.x = (tttt.vec.x * widthHalf);
        tttt.vec.y = -(tttt.vec.y * heightHalf);
        return tttt.vec
    },



    // function for drawing rounded rectangles
    roundRect: function (ctx, x, y, w, h, r) {
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + r)
        ctx.lineTo(x + w, y + h - r)
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
        ctx.lineTo(x + r, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - r)
        ctx.lineTo(x, y + r)
        ctx.quadraticCurveTo(x, y, x + r, y)
        ctx.closePath()
        ctx.fill()
        // ctx.stroke();
    }

    // 删除mesh中的threejs元素
    // object.name = "test_name"; //加入的时候给名字
    // scene.add(object);
    , removeMesh: function (parent, object) {
        console.log('要删除的元素', object.name)
        var selectedObject = parent.getObjectByName(object.name)
        console.log('要删除的元素内容', selectedObject)
        parent.remove(selectedObject)
        animate()
    }

    // 获取模型的参数
    , getMeshParameters: function (mesh) {
        // var sea = Environment.sea.mesh;
        // var height = sea.geometry.parameters;
        // console.log('大海高度', height);
        return mesh.geometry.parameters
    }

    // 获取模型在页面中的大小
    , getMeshSize: function (mesh, vec) {
        const box = this.box.setFromObject(mesh)
        box.getSize(vec)
        // const size = box.getSize(vec)
        // size.x = Math.ceil(size.x);
        // size.y = Math.ceil(size.y);
        // size.z = Math.ceil(size.z);
        // return size
    },



    Base64: {

        // private property
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        // public method for encoding
        encode: function (input) {
            var output = ''
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4
            var i = 0

            input = Base64._utf8_encode(input)

            while (i < input.length) {
                chr1 = input.charCodeAt(i++)
                chr2 = input.charCodeAt(i++)
                chr3 = input.charCodeAt(i++)

                enc1 = chr1 >> 2
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                enc4 = chr3 & 63

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
            }

            return output
        },

        // public method for decoding
        decode: function (input) {
            var output = ''
            var chr1, chr2, chr3
            var enc1, enc2, enc3, enc4
            var i = 0

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')

            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++))
                enc2 = this._keyStr.indexOf(input.charAt(i++))
                enc3 = this._keyStr.indexOf(input.charAt(i++))
                enc4 = this._keyStr.indexOf(input.charAt(i++))

                chr1 = (enc1 << 2) | (enc2 >> 4)
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
                chr3 = ((enc3 & 3) << 6) | enc4

                output = output + String.fromCharCode(chr1)

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }

            output = Base64._utf8_decode(output)

            return output
        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, '\n')
            var utftext = ''

            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n)

                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192)
                    utftext += String.fromCharCode((c & 63) | 128)
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224)
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                    utftext += String.fromCharCode((c & 63) | 128)
                }
            }

            return utftext
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = ''
            var i = 0
            var c = 0
            // var c1 = 0
            var c2 = 0

            while (i < utftext.length) {
                c = utftext.charCodeAt(i)

                if (c < 128) {
                    string += String.fromCharCode(c)
                    i++
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1)
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
                    i += 2
                } else {
                    c2 = utftext.charCodeAt(i + 1)
                    var c3 = utftext.charCodeAt(i + 2)
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
                    i += 3
                }
            }

            return string
        }

    }

    //二进制内容

    //ArrayBuffer 转 string
    , ab2str: function (buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }


    //string 转 ArrayBuffer
    , str2ab: function (str) {
        // var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var buf = new ArrayBuffer(str.length * 1); // 1 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    , ab162str: function (buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    //UTF8的ArrayBuffer 转string 适用所有情况
    , Utf8ArrayToStr: function (array) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

}  // export default

function deepCopy(obj, deep) {
    // 如果obj不是对象，那么直接返回值就可以了
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 定义需要的局部变脸，根据obj的类型来调整target的类型
    var i, target = core.util.isType(obj, 'array') ? [] : {}, value, valueType
    for (i in obj) {
        value = obj[i]
        valueType = core.util.getType(value)
        // 只有在明确执行深复制，并且当前的value是数组或对象的情况下才执行递归复制
        if (deep && (valueType === 'array' || valueType === 'object')) {
            target[i] = deepCopy(value)
        } else {
            target[i] = value
        }
    }
    return target
}

function _typeof(obj) {
    var class2type = {}
    var names = 'Boolean Number String Function Array Date RegExp Object Error'
    names.split(' ').forEach(function (e, i) {
        class2type['[object ' + e + ']'] = e.toLowerCase()
    })

    if (obj === null) {
        return String(obj)
    }
    return typeof obj === 'object' || typeof obj === 'function'
        ? class2type[class2type.toString.call(obj)] || 'object'
        : typeof obj
}


function delSpace(str) {
    str = str.trim() // 全掉两头空格
    str = str.replace(/\s+/g, '') // 去掉中间所有空格
    return str
}



//二进制array转string
function bin2String(array) {
    var result = ''
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 2))
    }
    return result
}
function string2Bin(str) {
    var result = []
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i).toString(2))
    }
    return result
}
function str2bytes(str) {
    var bytes = []
    for (var i = 0, len = str.length; i < len; ++i) {
        var c = str.charCodeAt(i)
        var byte = c & 0xff
        bytes.push(byte)
    }
    return bytes
}
function toBuffer(ab) {
    var buf = new Buffer(ab.byteLength)
    var view = new Uint8Array(ab)
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i]
    }
    return buf
}
function Base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64)
    var len = binary_string.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
}

export default core
export const isIOS = core.isIOS
// export const getQueryParams = core.getQueryParams
