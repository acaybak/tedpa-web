#!/usr/bin/env node
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isWindows = os.platform() === 'win32';
const ALLOWED_COMMANDS = new Set(['vercel', 'npm', 'pnpm', 'yarn']);
function log(msg) { console.error(msg); }
function commandExists(cmd) {
  if (!ALLOWED_COMMANDS.has(cmd)) throw new Error(`Command not in whitelist: ${cmd}`);
  try {
    if (isWindows) { const r = spawnSync('where', [cmd], { stdio: 'ignore' }); return r.status === 0; }
    else { const r = spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' }); return r.status === 0; }
  } catch { return false; }
}
function getCommandOutput(cmd, args) {
  try { const r = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['pipe','pipe','ignore'], shell: isWindows }); return r.status === 0 ? (r.stdout||'').trim() : null; } catch { return null; }
}
function checkVercelInstalled() {
  if (!commandExists('vercel')) { log('Error: Vercel CLI not installed'); process.exit(1); }
  log(`Vercel CLI version: ${getCommandOutput('vercel',['--version'])||'unknown'}`);
}
function checkLoginStatus() {
  log('Checking login status...');
  try {
    const r = spawnSync('vercel', ['whoami'], { encoding: 'utf8', stdio: ['pipe','pipe','pipe'], shell: isWindows });
    const output = (r.stdout||'').trim();
    if (r.status === 0 && output && !output.includes('Error') && !output.includes('not logged in')) {
      log(`Logged in as: ${output}`); return true;
    }
  } catch {}
  return false;
}
function checkProject(projectPath) {
  const absPath = path.resolve(projectPath);
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isDirectory()) {
    log(`Error: Project directory does not exist: ${absPath}`); process.exit(1);
  }
  log(`Project path: ${absPath}`);
  if (fs.existsSync(path.join(absPath, 'package.json'))) log('Detected package.json');
  return absPath;
}
function detectPackageManager(projectPath) {
  if (fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) return 'npm';
  if (commandExists('pnpm')) return 'pnpm';
  if (commandExists('yarn')) return 'yarn';
  if (commandExists('npm')) return 'npm';
  return null;
}
function runBuildIfNeeded(projectPath) {
  const pkgPath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return true;
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')); } catch (e) { log(`Warning: ${e.message}`); return true; }
  if (!pkg.scripts || !pkg.scripts.build) { log('No build script, skipping'); return true; }
  log(''); log('========================================'); log('Running pre-deployment build...'); log('========================================'); log('');
  const pkgMgr = detectPackageManager(projectPath);
  if (!pkgMgr) { log('Error: No package manager found'); process.exit(1); }
  log(`Using package manager: ${pkgMgr}`);
  const nodeModulesPath = path.join(projectPath, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    log('node_modules not found, installing dependencies...');
    const installArgs = pkgMgr === 'yarn' ? [] : ['install'];
    try { const r = spawnSync(pkgMgr, installArgs, { cwd: projectPath, stdio: 'inherit', shell: isWindows }); if (r.status !== 0) throw new Error('Install failed'); }
    catch (e) { log('Error: Failed to install dependencies'); process.exit(1); }
  }
  const buildArgs = pkgMgr === 'npm' ? ['run', 'build'] : ['build'];
  log(`Executing: ${pkgMgr} ${buildArgs.join(' ')}`); log('');
  try {
    const r = spawnSync(pkgMgr, buildArgs, { cwd: projectPath, stdio: ['pipe', 'inherit', 'inherit'], shell: isWindows, input: 'Skip\n' });
    if (r.status !== 0) throw new Error('Build failed');
    log(''); log('========================================'); log('Build completed successfully!'); log('========================================');
    return true;
  } catch (e) {
    log(''); log('========================================'); log('Build FAILED!'); log('========================================');
    log(`cd ${projectPath} && ${pkgMgr} ${buildArgs.join(' ')}`);
    process.exit(1);
  }
}
function doDeploy(projectPath, options) {
  log(''); log('Starting deployment...'); log('');
  const cmdParts = ['vercel'];
  if (options.yes) cmdParts.push('--yes');
  if (options.prod) { cmdParts.push('--prod'); log('Deployment environment: Production (Public)'); }
  else { log('Deployment environment: Preview'); }
  log(`Executing: ${cmdParts.join(' ')}`); log(''); log('========================================');
  try {
    const args = cmdParts.slice(1);
    const r = spawnSync('vercel', args, { cwd: projectPath, encoding: 'utf8', stdio: ['inherit','pipe','pipe'], timeout: 300000, shell: isWindows });
    const output = (r.stdout||'') + (r.stderr||'');
    log(output);
    if (r.status !== 0) throw new Error('Deployment command failed');
    const aliasedMatch = output.match(/Aliased:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
    const deploymentMatch = output.match(/Production:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
    const finalUrl = (aliasedMatch ? aliasedMatch[1] : null) || (deploymentMatch ? deploymentMatch[1] : null);
    log(''); log('========================================'); log('Deployment successful!'); log('========================================'); log('');
    if (finalUrl) { log(`Your site is live! Visit: ${finalUrl}`); console.log(JSON.stringify({ status: 'success', url: finalUrl })); }
    else { console.log(JSON.stringify({ status: 'success', message: 'Deployment successful' })); }
  } catch (e) { log(e.message||''); log(''); log('Deployment failed'); process.exit(1); }
}
function main() {
  log('========================================'); log('Vercel CLI Project Deployment'); log('========================================'); log('');
  const args = process.argv.slice(2);
  const options = { projectPath: '.', prod: true, yes: false, skipBuild: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--prod') options.prod = true;
    else if (a === '--yes' || a === '-y') options.yes = true;
    else if (a === '--skip-build') options.skipBuild = true;
    else if (!a.startsWith('-')) options.projectPath = a;
  }
  checkVercelInstalled(); log('');
  if (!checkLoginStatus()) { log('Error: Not logged in'); process.exit(1); }
  log('');
  const projectPath = checkProject(options.projectPath);
  if (!options.skipBuild) runBuildIfNeeded(projectPath);
  else log('Build step skipped');
  doDeploy(projectPath, options);
}
main();
