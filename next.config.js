const yaml = require('js-yaml');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const DEFAULT_ENV = {
  CMS_LOCAL_BACKEND: false,
};

(config = () => {
  const config = process.env;

  const yamlContent = fs.readFileSync('./public/admin/config.example.yml', 'utf8');
  const interpolatedYamlContent = yamlContent.replace(
    /\${(\w+)}/g,
    (match, envVar) => config[envVar] || DEFAULT_ENV[envVar] || '',
  );
  const parsedConfig = yaml.load(interpolatedYamlContent);
  fs.writeFileSync('./public/admin/config.yml', yaml.dump(parsedConfig));

  console.log(`parsedConfig`, parsedConfig);
})();

module.exports = nextConfig;
