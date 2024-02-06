const yaml = require('js-yaml');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

(config = () => {
  const config = process.env;

  const yamlContent = fs.readFileSync('./public/admin/config.example.yml', 'utf8');
  const interpolatedYamlContent = yamlContent.replace(/\${(\w+):-(\w+)}/g, (_, key, defaultValue) => {
    console.info('Replacing CMS config key:', key, 'with', config[key] || defaultValue);
    return config[key] || defaultValue; // Replace ${key:-defaultValue} with the value of key from the config or defaultValue if key is not present
  });
  const parsedConfig = yaml.load(interpolatedYamlContent);
  fs.writeFileSync('./public/admin/config.yml', yaml.dump(parsedConfig));
})();

module.exports = nextConfig;
