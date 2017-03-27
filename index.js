#!/usr/bin/env node

const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const pkgDir = require('pkg-dir')

var noMasterCommit = function (excludeBranches) {
  excludeBranches = excludeBranches || ['master']
  const basedir = pkgDir.sync()
  const gitHeadFile = path.join(basedir, '.git', 'HEAD')
  const gitHead = fs.readFileSync(gitHeadFile, 'utf8')
  const heads = gitHead.match(/ref: refs\/heads\/([^\n]+)/)
  const actual = heads ? heads[1] : null
  const isExcluded = actual ? excludeBranches.indexOf(actual) : -1
  if (!actual) {
    throw (new Error(`${basedir} does not appear to be a git repository`))
  } else if (isExcluded > -1) {
    const c = /^win/.test(process.platform) ? 'rem' : '#'
    const str = chalk.red(
      ` Commits to '${actual}' branch are restricted.\n` +
      ` Please commit to a feature-branch and generate a pull-request to ${actual}\n`) +
      ` ---- \n` +
      chalk.yellow(
      ` MEMORY AID: create a new branch\n` +
      ` git checkout -b feature-branch-:RENAME_ME: master  ${c} (local)\n` +
      ` git push -u origin feature-branch-:RENAME_ME:      ${c} (remote)\n`) +
      ` ---- \n`
    console.log(str)
    throw (new Error(`Commits to '${actual}' branch are restricted. Please commit to a feature-branch and generate a pull-request to '${actual}'.`))
  }
  // actual not in excluded_branches - all is well
}

if (require.main === module) {
  // cli
  const program = require('commander')
  const pkg = require('./package.json')
  program
    .version(pkg.version)
    .usage('[options] ')
    .description('checks to ensure that current branch is not one of specified options')
    .option('-b, --branches <comma,seperated,list>', 'comma seperated list of branches to exclude from commits', 'master')
    .parse(process.argv)
  try {
    noMasterCommit(program.branches.split(',').map(b => b.trim()))
  } catch (err) {
    process.exit(-1)
  }
} else {
  // module
  module.exports = noMasterCommit
}
