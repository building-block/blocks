const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');

const paths = fg.sync(
  ['packages/*/package.json'],
  {
    dot: true,
  },
).sort().map(pkgPath => path.join(__dirname, '..', pkgPath));

const packages = paths.map(require);

const heading = '| Package | Description | Metadata |';
const justifyContent = '| --- | --- | --- |';

const createBadges = (pkg) => `
[![NPM](https://img.shields.io/npm/v/${pkg.name}.svg?style=flat)](https://www.npmjs.com/package/${pkg.name})
[![Gzip Size](https://img.badgesize.io/https://unpkg.com/${pkg.name}/${pkg.main}?compression=gzip)](https://unpkg.com/${pkg.name}/)
`.replace(/(?:\r\n|\r|\n)/g, '');

const createRow = (pkg) => {
  const [, moduleName] = pkg.name.split('/');

  return `| [${pkg.name}](packages/${moduleName}) | ${pkg.description} | ${createBadges(pkg)} |`;
};

const rows = packages.map(createRow).join('\n');

const index = `${heading}
${justifyContent}
${rows}`

const readmePath = path.join(__dirname, '..', 'README.md');

const md = fs.readFileSync(readmePath, 'utf8');

fs.writeFileSync(readmePath, md.replace(/\| Package \| D.*\|$/mgs, index));
