const fs = require('fs');
const axios = require('axios');
const path = require('path');

const inputFilePath = path.join(__dirname, 'adlinks.txt');
const outputFilePath = path.join(__dirname, 'bypassedLinks.txt');

async function processAdLinks() {
  try {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    const adLinks = data.split('\n').filter(link => link.trim() !== '');
    const bypassedLinks = [];

    for (let link of adLinks) {
      try {
        const response = await axios.get(`https://REDACTEDNOLOOK/bypass?url=${encodeURIComponent(link)}`);

        console.log(`Original URL: ${link}`);
        console.log(`API Response:`, response.data);

        bypassedLinks.push(JSON.stringify(response.data));
      } catch (error) {
        console.error(`Error processing ${link}: ${error.message}`);
      }
    }
    fs.writeFileSync(outputFilePath, bypassedLinks.join('\n'), 'utf8');
    console.log(`Bypassed links have been written to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

processAdLinks();

