const fs = require('fs');
const yaml = require('js-yaml');

function buildCmsConfig() {
  const config = process.env;

  const configPath = './public/admin/';
  const exampleFileName = 'config.example.yml';
  const fileName = 'config.yml';

  const yamlContent = fs.readFileSync(configPath + exampleFileName, 'utf8');
  const interpolatedYamlContent = yamlContent.replace(/\${(\w+):-(\w+)}/g, (_, key, defaultValue) => {
    console.info('Replacing CMS config key:', key, 'with', config[key] || defaultValue);
    return config[key] || defaultValue; // Replace ${key:-defaultValue} with the value of key from the config or defaultValue if key is not present
  });
  const parsedConfig = yaml.load(interpolatedYamlContent);
  fs.writeFileSync(configPath + fileName, yaml.dump(parsedConfig));
  console.info(`CMS config written to ${configPath + fileName}`);
}

module.exports = buildCmsConfig;
