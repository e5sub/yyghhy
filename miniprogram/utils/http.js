/**
 * 根据经纬度转换为地址编码
 * @param {} e 
 */
function getAddress(e){
  return new Promise((resolve,reject)=>{
    //console.log(e)
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo?location='+e.lng+','+e.lat+'&output=json&key='+e.key,
      method:'get',
      data:{
      },
      success(res){
        
        resolve(res)
      },fail(err){
        resolve(err);
        reject("调用失败");
      }
    })
  })
}
/**
 * 获取当前城市的天气预报
 * @param {*} e 
 */
function getWeather(e){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?city='+e.adcode+'&extensions='+e.extensions+'&key='+e.key,
      method:'get',
      data:{
      },
      success(res){
        resolve(res.data)
      },fail(err){
        resolve(err);
        reject("调用失败");
      }
    })
  })
}
/**
 * 根据地理位置获取地理编码
 * @param {*} e 
 */
function getGeocode(e){
  console.log(e)
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/geo?address='+e.address+'&key='+e.key,
      method:'get',
      data:{
      },
      success(res){
        resolve(res)
        console.log(res.data)
      },fail(err){
        resolve(err);
        reject("调用失败");
      }
    })
  })
}
/**
 * 深圳市新冠每日确诊
 * @param {} e 

function getNewCovid19(e){
  console.log(e)
    wx.request({
      url: 'https://opendata.sz.gov.cn/api/328179243/1/service.xhtml?page=1&rows=2&appKey=35e9d88e05f546bea37e05599991ab19',
      method:'post',
      success(res){
        console.log(res)
      },fail(err){
        resolve(err);
       
      }
    })

}
 */
module.exports={
  getAddress:getAddress,
  getWeather:getWeather,
  getGeocode:getGeocode,


}