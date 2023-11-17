function _1(md){return(
md`HW2 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function __constellations(){return(
function _constellations(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
);}
)}

function _ConstellationCount(){return(
[]
)}

function _cnConstellation(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _6(ConstellationCount,cnConstellation,data)
{
  ConstellationCount.length = 0; //ConstellationCount
  for (var y=0; y<cnConstellation.length; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    ConstellationCount.push({number: y, constellation:cnConstellation[y], gender:"male", count:0}); 
    //Object包含：0. index，1. 星座，2.男性，3.人數(設為0)
    ConstellationCount.push({number: y, constellation:cnConstellation[y], gender:"female", count:0}); 
    //Object包含：0. index，1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = x.Constellation*2 + (x.Gender== "男" ? 0 : 1); 
    ConstellationCount[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return ConstellationCount;
}


function _7(Plot,ConstellationCount){return(
Plot.plot({
  grid: true,
  x: {domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]},
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY(ConstellationCount, {x: "constellation", y: "count", fill: "gender", tip: true}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("_constellations")).define("_constellations", __constellations);
  main.variable(observer("ConstellationCount")).define("ConstellationCount", _ConstellationCount);
  main.variable(observer("cnConstellation")).define("cnConstellation", _cnConstellation);
  main.variable(observer()).define(["ConstellationCount","cnConstellation","data"], _6);
  main.variable(observer()).define(["Plot","ConstellationCount"], _7);
  return main;
}
