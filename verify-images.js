const fs = require('fs');
const path = require('path');
const files = ['public/index.html','public/about.html','public/contact.html','public/products.html','public/css/style.css','public/js/script.js'];
const regex = /images\/[^")'\s]+/g;
const refs = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = regex.exec(content)) !== null) {
    refs.add(m[0]);
  }
}
const sorted = Array.from(refs).sort();
console.log('REFERENCES:');
for (const ref of sorted) console.log(ref);
console.log('---');
let missing = false;
for (const ref of sorted) {
  const fullPath = path.join('public', ref.replace(/\//g, path.sep));
  if (!fs.existsSync(fullPath)) {
    missing = true;
    console.log('MISSING', ref);
  }
}
if (!missing) console.log('ALL ASSETS FOUND');
