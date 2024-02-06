const yaml = require('js-yaml');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

(config = () => {
  const config = process.env;

  const yamlContent = fs.readFileSync('./public/admin/config.example.yml', 'utf8');
  const interpolatedYamlContent = yamlContent.replace(
    /\${(\w+):-(\w+)}/g,
    (_, key, defaultValue) => config[key] || defaultValue,
  );
  const parsedConfig = yaml.load(interpolatedYamlContent);
  fs.writeFileSync('./public/admin/config.yml', yaml.dump(parsedConfig));
  console.log(`parsedConfig`, parsedConfig);
})();

module.exports = nextConfig;
