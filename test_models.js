const fs = require('fs');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("Please set the GEMINI_API_KEY environment variable before running this script.");
    process.exit(1);
}

async function check() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
}

check();
