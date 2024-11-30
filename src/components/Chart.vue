<template>
  <div id="chart"></div>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
  mounted() {
    axios.get('/api/pdfs/')
      .then(response => {
        const data = response.data.map(pdf => ({
          date: new Date(pdf.field4),
          balance: pdf.field11
        }));

        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = this.$el.clientWidth - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#chart")
                      .append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
                    .domain(d3.extent(data, d => d.date))
                    .range([0, width]);
        svg.append("g")
           .attr("transform", `translate(0,${height})`)
           .call(d3.axisBottom(x));

        const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.balance)])
                    .range([height, 0]);
        svg.append("g")
           .call(d3.axisLeft(y));

        svg.append("path")
           .datum(data)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-width", 1.5)
           .attr("d", d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.balance)));

        const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

        svg.selectAll("circle.data-point")
           .data(data)
           .enter()
           .append("circle")
           .attr("class", "data-point")
           .attr("cx", d => x(d.date))
           .attr("cy", d => y(d.balance))
           .attr("r", 3)
           .attr("fill", "steelblue")
           .on("mouseover", (event, d) => {
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html(`Date: ${d.date.toDateString()}<br>Balance: ${d.balance}`)
                     .style("left", (event.pageX + 5) + "px")
                     .style("top", (event.pageY - 28) + "px");
           })
           .on("mouseout", () => {
              tooltip.transition().duration(500).style("opacity", 0);
           });
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  }
}
</script>

<style>
/* Add your styles here */
</style>

