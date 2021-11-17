// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

async function loaddis(name){
    var dis = new Array()
    var disa = await calladd({name:name, id:'a'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    disa = await calladd({name:name, id:'b'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    disa = await calladd({name:name, id:'c'})
    disa = disa.result.data.dis
    for(var i = 0; i < disa.length; i++)
    {
      dis.push(disa[i])
    }
    return dis
}
async function calladd(p){
    return new Promise(function(resolve, reject){
      cloud.callFunction({
        name:'add',
        data:{
          name:p.name,
          id:p.id
        }
      }).then(res=>{
        resolve(res)
      })
    })
}

// 云函数入口函数
exports.main = async (event, context) => {
    
    var jingdian = await calladd({name:'jingdiandz', id:'fa24ce1a61923f9d06b8949d1813e775'})
    jingdian = jingdian.result.data.list
    var jiudian = await calladd({name:'jiudiandz', id:'18ed09686192251305652f6930305cf9'})
    jiudian = jiudian.result.data.list
    var meishi = await calladd({name:'meishidz', id:'fa24ce1a6192260006b143e46e4b940e'})
    meishi = meishi.result.data.list
    console.log(event)
    var INF = 1000000
    var f = new Array()
    var g = new Array()
    var h = new Array()
    var t = event.t
    var T = t*5
    var mon = event.mon
    console.log(t)
    console.log(mon)
    for(var i = 0; i < T; i++)
    {
        f[i] = new Array()
        g[i] = new Array()
        h[i] = new Array()
        for(var j = 0; j < jiudian.length; j++)
        {
        f[i][j] = new Array()
        g[i][j] = new Array()
        h[i][j] = new Array()
        for(var m = 0; m <= mon; m++)
        {
            f[i][j][m] = INF
            g[i][j][m] = -1
            h[i][j][m] = -1
        }
        }
    }
    var dis = event.dis
    for(var i = 0; i < dis.length; i++)
    {
        //console.log(i)
        var dic = jingdian[i]
        if(dis[i] < f[0][i][dic.cost])
        {
            f[0][i][dic.cost] = dis[i]
            g[0][i][dic.cost] = 0
            h[0][i][dic.cost] = 0
        }
    }
    
    var disjingdianmeishi = await calladd({name:'jingdianmeishi', id:'18ed0968619321700585236174f10061'})
    disjingdianmeishi = disjingdianmeishi.result.data.dis
    //console.log(disjingdianmeishi)
    var disjiudianmeishi = await loaddis('jiudianmeishi')
    //console.log(disjiudianmeishi)
    var disjiudianjingdian = await loaddis('jiudianjingdian')
    
    for(var day = 0; day < t; day++)
        for(var i = 0; i < 5; i++)
        {
        if(i == 0 && day == 0) {continue}
        var maxj
        var dis
        var maxlst
        if(i == 0) {dis = disjiudianjingdian; maxj = jingdian.length; maxlst = jiudian.length}
        else if(i == 1 || i == 2 || i == 3) 
        {
            dis = disjingdianmeishi
            if(i == 1 || i == 3) {maxj = meishi.length; maxlst = jingdian.length;}
            else {maxj = jingdian.length; maxlst = meishi.length;}
        }
        else if(i == 4) 
        {
            dis = disjiudianmeishi
            maxj = jiudian.length
            maxlst = meishi.length
        }
        for(var j = 0; j < maxj; j++)
        {
            var cost
            if(i == 0 || i == 2) cost = jingdian[j].cost
            if(i == 1 || i == 3) cost = meishi[j].cost
            if(i == 4) cost = jiudian[j].cost
            for(var m = cost; m <= mon; m++)
            {
            for(var lst = 0; lst < maxlst; lst++)
            {
                if(f[day*5+i-1][lst][m-cost] + dis[lst][j] < f[day*5+i][j][m])
                {
                f[day*5+i][j][m] = f[day*5+i-1][lst][m-cost] + dis[lst][j]
                g[day*5+i][j][m] = lst
                h[day*5+i][j][m] = m-cost
                }
            }
            }
        }
        }
    var min = f[T-1][0][0]
    var ed = 0
    var lstmon = 0
    for(var j = 0; j < jiudian.length; j++)
        for(var m = 0; m <= mon; m++)
        {
            if(f[T-1][j][m] < min)
            {
                min = f[T-1][j][m]
                ed = j
                lstmon = m
            }
        }
    if(min == INF) {return undefined}
    //console.log(min)
    //console.log(lstmon)
    var route = new Array()
    for(var day = t-1; day >= 0; day--)
        for(var i = 4; i >= 0; i--)
        {
        if(i == 4) route.push(jiudian[ed])
        else if(i == 0 || i == 2) route.push(jingdian[ed])
        else if(i == 1 || i == 3) route.push(meishi[ed])
        //route.push(ed)
        //console.log('----------')
        //console.log(i)
        //console.log(ed)
        //console.log(lstmon)
        //console.log(f[day*5+i][ed][lstmon])
        var nxted = g[day*5+i][ed][lstmon]
        var nxtlstmon = h[day*5+i][ed][lstmon]
        ed = nxted
        lstmon = nxtlstmon
        }
    /*
    return new Promise(function(resolve,reject){
        resolve(route)
    })
    */
    var reroute = new Array()
    for(var i = route.length-1; i >= 0; i--)
    {
        reroute.push(route[i])
    }
    
    return reroute
}