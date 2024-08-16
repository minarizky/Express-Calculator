app.use(express.static(__dirname));


const express = require('express');
const app = express();

// Helper function to parse numbers
function parseNumbers(nums) {
  let numbers = nums.split(',').map(num => {
    let parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) {
      throw new Error(`${num} is not a number.`);
    }
    return parsedNum;
  });
  return numbers;
}

// Route for calculating mean
app.get('/mean', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }
  let numbers;
  try {
    numbers = parseNumbers(req.query.nums);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  
  let mean = numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
  return res.json({ operation: 'mean', value: mean });
});

// Route for calculating median
app.get('/median', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }
  let numbers;
  try {
    numbers = parseNumbers(req.query.nums);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  numbers.sort((a, b) => a - b);
  let median;
  let middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    median = (numbers[middle - 1] + numbers[middle]) / 2;
  } else {
    median = numbers[middle];
  }

  return res.json({ operation: 'median', value: median });
});

// Route for calculating mode
app.get('/mode', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }
  let numbers;
  try {
    numbers = parseNumbers(req.query.nums);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  let freqCounter = numbers.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  let mode = Object.keys(freqCounter).reduce((a, b) => 
    freqCounter[a] > freqCounter[b] ? a : b
  );

  return res.json({ operation: 'mode', value: parseFloat(mode) });
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
