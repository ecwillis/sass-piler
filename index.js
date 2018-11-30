const sass = require('node-sass');
const fs = require('fs-extra');
const yaml = require('js-yaml');

module.exports = async function(args) {
  if (!args.configFile) {
    console.log('ERROR: must provide configuration file');
    return;
  }
  
  let configs;
  try {
    configs = yaml.safeLoad(fs.readFileSync(args.configFile));
  } catch (e) {
    console.log(e);
    return false;
  }
  const sourceDir = configs.sourceDir || '';
  const filesObj = configs.files || {};
  
  fs.mkdirp(configs.outputDir);

  Object.keys(filesObj).forEach(k => {
    const output = `${configs.outputDir}/${filesObj[k]}`;
    console.log(`Rendering ${output}`);
    const result = sass.renderSync({
      file: `${sourceDir}${k}`,
      outFile: output,
      sourceMap: true
    });
    fs.writeFileSync(output, result.css);
    if (result.map) {
      fs.writeFileSync(`${output}.map`, result.map);
    }
  });
  
  

};
