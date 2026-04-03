const fs = require('fs');
const apiKey = "AIzaSyBEvFxdsdZm9ZdW6di2gwJ8apAaO5ke1NY";
async function check() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
}
check();
