#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');

async function main() {
  console.log(chalk.cyan('\n📜 License Detector v1.0.0\n'));
  const repos = JSON.parse(execSync('gh repo list yksanjo --limit 100 --json name', { encoding: 'utf8' }));
  const licenses = {};
  for (const repo of repos) {
    try {
      const info = JSON.parse(execSync(`gh repo view yksanjo/${repo.name} --json licenseInfo`, { encoding: 'utf8' }));
      const lic = info.licenseInfo?.name || 'No license';
      licenses[lic] = (licenses[lic] || 0) + 1;
    } catch { licenses['Unknown'] = (licenses['Unknown'] || 0) + 1; }
  }
  console.log(chalk.yellow('License Distribution:'));
  Object.entries(licenses).forEach(([lic, count]) => console.log(`  ${lic}: ${count}`));
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
