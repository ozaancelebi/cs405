const totalDeath = {
    "Total": [369703, 366471, 376162, 376520, 373041, 391091, 405528, 422964, 426857, 426785, 436624, 509048, 566485, 504839],
};

const babyDeath = {
    "Total": [17607, 15164, 14567, 14974, 14027, 14951, 13677, 12910, 12134, 11718, 11022, 9757, 10089, 9522],
};

const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

const svg = document.getElementById('chart');
const svgNS = 'http://www.w3.org/2000/svg';

// Define chart dimensions and margins
const svgWidth = 1500;
const svgHeight = 800;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Create x and y scales
const xScale = (index) => margin.left + (index * chartWidth) / (years.length - 1);
const totalDeathYScale = (value) => margin.top + chartHeight - (value / 620000) * chartHeight;
const babyDeathYScale = (value) => margin.top + chartHeight - (value / 19000) * chartHeight;

// Create x-axis
const xAxis = document.createElementNS(svgNS, 'line');
xAxis.setAttribute('x1', margin.left);
xAxis.setAttribute('y1', margin.top + chartHeight);
xAxis.setAttribute('x2', margin.left + chartWidth);
xAxis.setAttribute('y2', margin.top + chartHeight);
xAxis.setAttribute('stroke', 'black');
svg.appendChild(xAxis);

// Create y-axis1
const yAxis = document.createElementNS(svgNS, 'line');
yAxis.setAttribute('x1', margin.left);
yAxis.setAttribute('y1', margin.top);
yAxis.setAttribute('x2', margin.left);
yAxis.setAttribute('y2', margin.top + chartHeight);
yAxis.setAttribute('stroke', 'black');
svg.appendChild(yAxis);

// Create y-axis2
const yAxis2 = document.createElementNS(svgNS, 'line');
yAxis2.setAttribute('x1', 1500 - margin.right);
yAxis2.setAttribute('y1', margin.top);
yAxis2.setAttribute('x2', 1500 - margin.right);
yAxis2.setAttribute('y2', margin.top + chartHeight);
yAxis2.setAttribute('stroke', 'black');
svg.appendChild(yAxis2);

const totalBars = years.length;
const barWidth = (chartWidth - 2 * margin.left) / (2 * totalBars + 1) + 1;
const barGap = barWidth;

// Create bars for babyDeath
babyDeath.Total.forEach((value, index) => {
    const xPos = margin.left - 22.415 + barGap + (2.2 * barWidth) * index;
    const yPos = babyDeathYScale(value);
    const bar = document.createElementNS(svgNS, 'rect');
    bar.setAttribute('x', xPos);
    bar.setAttribute('y', yPos);
    bar.setAttribute('width', barWidth);
    bar.setAttribute('height', chartHeight - (yPos - 50));
    bar.setAttribute('fill', 'steelblue');
    svg.appendChild(bar);
});

// Create line for totalDeath
const line = document.createElementNS(svgNS, 'path');
let lineData = '';
totalDeath.Total.forEach((value, index) => {
    const xPos = margin.left + barWidth +  (2.2 * barWidth) * index;
    const yPos = totalDeathYScale(value);
    if (index === 0) {
        lineData += `M ${xPos} ${yPos} `;
    } else {
        lineData += `L ${xPos} ${yPos} `;
    }
});
line.setAttribute('d', lineData);
line.setAttribute('fill', 'none');
line.setAttribute('stroke', 'red');
line.setAttribute('stroke-width', '2');
svg.appendChild(line);

totalDeath.Total.forEach((value, index) => {
    const xPos = margin.left + barWidth + (2.2 * barWidth) * index;
    const yPos = totalDeathYScale(value);
    
    // Create circle element
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', xPos);
    circle.setAttribute('cy', yPos);
    circle.setAttribute('r', 4); // Adjust the radius of the circle as needed
    circle.setAttribute('fill', 'red'); // Set the color of the circle
    svg.appendChild(circle);
});

const totalDeathMax = Math.max(...totalDeath.Total);
const babyDeathMax = Math.max(...babyDeath.Total);

// Calculate step for y-axes
const totalDeathYStep = totalDeathMax > 50000 ? 50000 : 2000; // Change step size as needed
const babyDeathYStep = babyDeathMax > 2000 ? 2000 : 100; // Change step size as needed

// Create y-axis labels for totalDeath
for (let i = 0; i <= totalDeathMax + 50000; i += totalDeathYStep) {
    const yPos = totalDeathYScale(i);
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', margin.left - 10);
    label.setAttribute('y', yPos + 6); // Adjust the vertical position for proper alignment
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('font-size', '18px');
    label.textContent = (i/1000).toLocaleString(); // Format the number if necessary
    svg.appendChild(label);
}

// Create y-axis labels for babyDeath
for (let i = 0; i <= babyDeathMax + 2000; i += babyDeathYStep) {
    const yPos = babyDeathYScale(i);
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', margin.left + chartWidth + 10);
    label.setAttribute('y', yPos + 6); // Adjust the vertical position for proper alignment
    label.setAttribute('text-anchor', 'start');
    label.setAttribute('font-size', '18px');
    label.textContent = (i/1000).toLocaleString(); // Format the number if necessary
    svg.appendChild(label);
}

years.forEach((year, index) => {
    const xPos = margin.left + barGap + (2.2 * barWidth) * index;
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', xPos);
    label.setAttribute('y', margin.top + chartHeight + 20); // Adjust the vertical position for proper alignment
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '18px');
    label.textContent = year;
    svg.appendChild(label);
});

// Create lines for x-axis labels
years.forEach((year, index) => {
    const xPos = margin.left + barGap + (2.2 * barWidth) * index;
    const yPos = margin.top + chartHeight;
    
    // Create line element
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', xPos);
    line.setAttribute('y1', yPos);
    line.setAttribute('x2', xPos);
    line.setAttribute('y2', yPos + 6); // Adjust the length of the line as needed
    line.setAttribute('stroke', 'black');
    svg.appendChild(line);
});

// Create lines for y-axis labels for totalDeath
for (let i = 0; i <= totalDeathMax + 50000; i += totalDeathYStep) {
    const yPos = totalDeathYScale(i);
    const xPos = margin.left;
    
    // Create line element
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', xPos);
    line.setAttribute('y1', yPos);
    line.setAttribute('x2', xPos - 6); // Adjust the length of the line as needed
    line.setAttribute('y2', yPos);
    line.setAttribute('stroke', 'black');
    svg.appendChild(line);
}

// Create lines for y-axis labels for babyDeath
for (let i = 0; i <= babyDeathMax + 2000; i += babyDeathYStep) {
    const yPos = babyDeathYScale(i);
    const xPos = margin.left + chartWidth;
    
    // Create line element
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', xPos);
    line.setAttribute('y1', yPos);
    line.setAttribute('x2', xPos + 6); // Adjust the length of the line as needed
    line.setAttribute('y2', yPos);
    line.setAttribute('stroke', 'black');
    svg.appendChild(line);
}

// Create arrows for y-axis
const yArrowPoints = `${margin.left - 5},${margin.top} ${margin.left + 5},${margin.top} ${margin.left},${margin.top - 10}`;
const yArrow = document.createElementNS(svgNS, 'polygon');
yArrow.setAttribute('points', yArrowPoints);
yArrow.setAttribute('fill', 'black');
svg.appendChild(yArrow);

// Create arrow for y-axis2
const y2ArrowPoints = `${1500 - margin.right - 5},${margin.top} ${1500 - margin.right + 5},${margin.top} ${1500 - margin.right},${margin.top - 10}`;
const y2Arrow = document.createElementNS(svgNS, 'polygon');
y2Arrow.setAttribute('points', y2ArrowPoints);
y2Arrow.setAttribute('fill', 'black');
svg.appendChild(y2Arrow);

// Create y-axis legends
const totalDeathLegend = document.createElementNS(svgNS, 'text');
totalDeathLegend.setAttribute('x', margin.left + 35);
totalDeathLegend.setAttribute('y', margin.top - 40);
totalDeathLegend.setAttribute('text-anchor', 'end');
totalDeathLegend.setAttribute('font-size', '14px');
totalDeathLegend.setAttribute('stroke', 'black'); // Set the border color
totalDeathLegend.setAttribute('stroke-width', '0.5px'); // Set the border width
totalDeathLegend.textContent = 'Total Death';
svg.appendChild(totalDeathLegend);

const totalDeathLegend2 = document.createElementNS(svgNS, 'text');
totalDeathLegend2.setAttribute('x', margin.left + 45);
totalDeathLegend2.setAttribute('y', margin.top - 20);
totalDeathLegend2.setAttribute('text-anchor', 'end');
totalDeathLegend2.setAttribute('font-size', '14px');
totalDeathLegend2.setAttribute('stroke', 'black'); // Set the border color
totalDeathLegend2.setAttribute('stroke-width', '0.5px'); // Set the border width
totalDeathLegend2.textContent = '(in thousands)';
svg.appendChild(totalDeathLegend2);

const babyDeathLegend = document.createElementNS(svgNS, 'text');
babyDeathLegend.setAttribute('x', margin.left + chartWidth - 40);
babyDeathLegend.setAttribute('y', margin.top - 40);
babyDeathLegend.setAttribute('text-anchor', 'start');
babyDeathLegend.setAttribute('font-size', '14px');
babyDeathLegend.setAttribute('stroke', 'black'); // Set the border color
babyDeathLegend.setAttribute('stroke-width', '0.5px'); // Set the border width
babyDeathLegend.textContent = 'Baby Death';
svg.appendChild(babyDeathLegend);

const babyDeathLegend2 = document.createElementNS(svgNS, 'text');
babyDeathLegend2.setAttribute('x', margin.left + chartWidth - 50);
babyDeathLegend2.setAttribute('y', margin.top - 20);
babyDeathLegend2.setAttribute('text-anchor', 'start');
babyDeathLegend2.setAttribute('font-size', '14px');
babyDeathLegend2.setAttribute('stroke', 'black'); // Set the border color
babyDeathLegend2.setAttribute('stroke-width', '0.5px'); // Set the border width
babyDeathLegend2.textContent = '(in thousands)';
svg.appendChild(babyDeathLegend2);

// Create x-axis legends
const xAxisLegend = document.createElementNS(svgNS, 'text');
xAxisLegend.setAttribute('x', margin.left + chartWidth / 2);
xAxisLegend.setAttribute('y', margin.top + chartHeight + 40);
xAxisLegend.setAttribute('text-anchor', 'middle');
xAxisLegend.setAttribute('font-size', '18px');
xAxisLegend.textContent = 'Years';
svg.appendChild(xAxisLegend);

// Create y-axis legends at the bottom with visual cues
const totalDeathLegend3 = document.createElementNS(svgNS, 'text');
totalDeathLegend3.setAttribute('x', margin.left + 100);
totalDeathLegend3.setAttribute('y', svgHeight - margin.bottom + 47);
totalDeathLegend3.setAttribute('text-anchor', 'end');
totalDeathLegend3.setAttribute('font-size', '18px');
totalDeathLegend3.textContent = 'Total Death';
svg.appendChild(totalDeathLegend3);

const totalDeathRect = document.createElementNS(svgNS, 'rect');
totalDeathRect.setAttribute('x', margin.left + 110);
totalDeathRect.setAttribute('y', svgHeight - margin.bottom + 40);
totalDeathRect.setAttribute('width', '26');
totalDeathRect.setAttribute('height', '3');
totalDeathRect.setAttribute('fill', 'red');
svg.appendChild(totalDeathRect);

const circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('cx', margin.left + 123); // X-coordinate of the circle's center
circle.setAttribute('cy', svgHeight - margin.bottom + 41.5); // Y-coordinate of the circle's center
circle.setAttribute('r', 4); // Radius of the circle
circle.setAttribute('fill', 'red'); // Color of the circle
svg.appendChild(circle);

const babyDeathLegend3 = document.createElementNS(svgNS, 'text');
babyDeathLegend3.setAttribute('x', margin.left + 160);
babyDeathLegend3.setAttribute('y', svgHeight - margin.bottom + 47);
babyDeathLegend3.setAttribute('text-anchor', 'start');
babyDeathLegend3.setAttribute('font-size', '18px');
babyDeathLegend3.textContent = 'Baby Death';
svg.appendChild(babyDeathLegend3);

const babyDeathRect = document.createElementNS(svgNS, 'rect');
babyDeathRect.setAttribute('x', margin.left + 260);
babyDeathRect.setAttribute('y', svgHeight - margin.bottom + 33);
babyDeathRect.setAttribute('width', '20');
babyDeathRect.setAttribute('height', '17');
babyDeathRect.setAttribute('fill', 'steelblue');
svg.appendChild(babyDeathRect);

// Add numbers above the points on the line
totalDeath.Total.forEach((value, index) => {
    const xPos = margin.left + barWidth + (2.2 * barWidth) * index;
    const yPos = totalDeathYScale(value) - 10; // Adjust the vertical position above the line
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', xPos);
    text.setAttribute('y', yPos);
    text.setAttribute('text-anchor', 'middle'); // Center the text horizontally above the point
    text.setAttribute('font-size', '18px');
    text.setAttribute('stroke', 'black'); // Set the border color
    text.setAttribute('stroke-width', '0.5px'); // Set the border width
    text.textContent = value.toLocaleString(); // Format the number if necessary
    svg.appendChild(text);
});

// Add numbers inside the rotated text on the bars
babyDeath.Total.forEach((value, index) => {
    const xPos = margin.left - 10 + barGap + (2.2 * barWidth) * index;
    const yPos = -20; // Adjust the vertical position above the bar

    // Create a group element to hold the rotated text element
    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('transform', `translate(${xPos + barWidth / 2}, ${yPos + chartHeight}) rotate(-90)`);
    
    // Create rotated text element
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('stroke', 'white'); // Set the border color
    text.setAttribute('stroke-width', '2px'); // Set the border width
    text.setAttribute('font-size', '36px'); // Adjust font size as needed
    text.textContent = value.toLocaleString(); // Format the number if necessary
    
    // Append rotated text element to the group
    group.appendChild(text);
    
    // Append the group to the SVG
    svg.appendChild(group);
});
