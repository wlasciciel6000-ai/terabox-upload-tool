const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/helpers/fileDelete.js');
let content = fs.readFileSync(filePath, 'utf8');

// Sprawdzenie czy Content-Type już istnieje
if (!content.includes('Content-Type')) {
    console.log('Patching fileDelete.js to include Content-Type...');
    
    // Dodanie Content-Type do nagłówków
    const findStr = '"Cookie": `browserid=${browserId}; ndus=${ndus};`,';
    const replaceStr = '"Cookie": `browserid=${browserId}; ndus=${ndus};`,\n    "Content-Type": "application/x-www-form-urlencoded",';
    
    content = content.replace(findStr, replaceStr);
    fs.writeFileSync(filePath, content);
    console.log('Successfully patched fileDelete.js');
} else {
    console.log('fileDelete.js already has Content-Type header.');
}
