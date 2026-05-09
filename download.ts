import fs from 'fs';

async function download() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/gh/apache/echarts@master/test/data/map/json/province/fujian.json');
    const text = await res.text();
    fs.writeFileSync('src/data/fujian.json', text);
    console.log('Downloaded successfully');
  } catch (e) {
    console.error(e);
  }
}

download();
