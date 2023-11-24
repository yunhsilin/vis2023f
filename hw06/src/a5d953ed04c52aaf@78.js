function _1(md){return(
md`# HW06`
)}

function _artistver1Artistver1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer (1) - artistVer (1).csv"),{from:{table:"artistVer (1) - artistVer (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistpublic1Artistpublic1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic (1) - artistPublic (1).csv"),{from:{table:"artistPublic (1) - artistPublic (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artist_columnKey(artistver1Artistver1){return(
Object.keys(artistver1Artistver1[0])[3]
)}

function _artist_Column(artistver1Artistver1,artist_columnKey){return(
artistver1Artistver1.map(row => row[artist_columnKey])
)}

function _artistver_uniqueValues(artist_Column){return(
[...new Set(artist_Column)].sort()
)}

function _artist_counts(artistver_uniqueValues,artist_Column){return(
artistver_uniqueValues.map(val => ({
  value: val,
  count: artist_Column.filter(v => v === val).length
}))
)}

function _artistpublic_columnKey(artistpublic1Artistpublic1){return(
Object.keys(artistpublic1Artistpublic1[0])[4]
)}

function _artistpublic_Column(artistpublic1Artistpublic1,artistpublic_columnKey){return(
artistpublic1Artistpublic1.map(row => String(row[artistpublic_columnKey]))
)}

function _artistpublic_uniqueValues(artistpublic_Column){return(
[...new Set(artistpublic_Column)].sort()
)}

function _artistpublic_counts(artistpublic_uniqueValues,artistpublic_Column){return(
artistpublic_uniqueValues.map(val => ({
  value: val,
  count: artistpublic_Column.filter(v => v === String(val)).length
}))
)}

function _data(artist_counts,artistpublic_counts){return(
artist_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: artistpublic_counts[index].count,
    series: 'artistpublic'
  }
]))
)}

function _13(htl){return(
htl.html`<h1>Simple baseline</h1>`
)}

function _selectedSeries_simple(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _15(Plot,artist_columnKey,data,selectedSeries_simple){return(
Plot.plot({
  height: 600,
  title: artist_columnKey,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#654321', '#d2b48c'],
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries_simple.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _16(htl){return(
htl.html`<h1>Medium baseline</h1>`
)}

function _selectedSeries_medium(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(data,selectedSeries_medium,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries_medium.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#654321', '#d2b48c']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart1(data,selectedSeries_medium,d3)
{
  
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries_medium.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#654321', '#d2b48c']);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        
          .transition() 
          .duration(1000) 
        
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _20(htl){return(
htl.html`<h1>Strong baseline</h1>`
)}

function _chart2(data,selectedSeries_medium,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys = Array.from(new Set(data.map(d => d.series)));
  
  const filteredData = data.filter(d => selectedSeries_medium.includes(d.series));

  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#654321', '#d2b48c']);
  
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4)
      .attr("result", "blur");

  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 4)
      .attr("dy", 4)
      .attr("result", "offsetBlur");

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic");

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)")
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#f5deb3");
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key));
        d3.select(".tooltip").remove();
        });
});

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));
  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer (1) - artistVer (1).csv", {url: new URL("./artistVer (1) - artistVer (1).csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic (1) - artistPublic (1).csv", {url: new URL("./artistPublic (1) - artistPublic (1).csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistver1Artistver1")).define("artistver1Artistver1", ["__query","FileAttachment","invalidation"], _artistver1Artistver1);
  main.variable(observer("artistpublic1Artistpublic1")).define("artistpublic1Artistpublic1", ["__query","FileAttachment","invalidation"], _artistpublic1Artistpublic1);
  main.variable(observer("artist_columnKey")).define("artist_columnKey", ["artistver1Artistver1"], _artist_columnKey);
  main.variable(observer("artist_Column")).define("artist_Column", ["artistver1Artistver1","artist_columnKey"], _artist_Column);
  main.variable(observer("artistver_uniqueValues")).define("artistver_uniqueValues", ["artist_Column"], _artistver_uniqueValues);
  main.variable(observer("artist_counts")).define("artist_counts", ["artistver_uniqueValues","artist_Column"], _artist_counts);
  main.variable(observer("artistpublic_columnKey")).define("artistpublic_columnKey", ["artistpublic1Artistpublic1"], _artistpublic_columnKey);
  main.variable(observer("artistpublic_Column")).define("artistpublic_Column", ["artistpublic1Artistpublic1","artistpublic_columnKey"], _artistpublic_Column);
  main.variable(observer("artistpublic_uniqueValues")).define("artistpublic_uniqueValues", ["artistpublic_Column"], _artistpublic_uniqueValues);
  main.variable(observer("artistpublic_counts")).define("artistpublic_counts", ["artistpublic_uniqueValues","artistpublic_Column"], _artistpublic_counts);
  main.variable(observer("data")).define("data", ["artist_counts","artistpublic_counts"], _data);
  main.variable(observer()).define(["htl"], _13);
  main.variable(observer("viewof selectedSeries_simple")).define("viewof selectedSeries_simple", ["Inputs"], _selectedSeries_simple);
  main.variable(observer("selectedSeries_simple")).define("selectedSeries_simple", ["Generators", "viewof selectedSeries_simple"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artist_columnKey","data","selectedSeries_simple"], _15);
  main.variable(observer()).define(["htl"], _16);
  main.variable(observer("viewof selectedSeries_medium")).define("viewof selectedSeries_medium", ["Inputs"], _selectedSeries_medium);
  main.variable(observer("selectedSeries_medium")).define("selectedSeries_medium", ["Generators", "viewof selectedSeries_medium"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["data","selectedSeries_medium","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["data","selectedSeries_medium","d3"], _chart1);
  main.variable(observer()).define(["htl"], _20);
  main.variable(observer("chart2")).define("chart2", ["data","selectedSeries_medium","d3"], _chart2);
  return main;
}
