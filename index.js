const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const pkgDir = require('pkg-dir')
const desired = 'master'

module.exports = (function () {
  const basedir = pkgDir.sync()
  const gitHead = path.join(basedir, '.git', 'HEAD')
  const data = fs.readFileSync(gitHead, 'utf8')
  const match = data.match(/ref: refs\/heads\/([^\n]+)/)
  const actual = match ? match[1] : null
  if (!actual) {
    throw (new Error(`${basedir} does not appear to be a git repository`))
  } else if (actual === desired) {
    const str = chalk.yellow(
      ` MEMORY AID: to create a new branch:\n` +
      ` git checkout -b feature-branch-RENAME_ME master\n` +
      ` git push -u orign feature-branch-RENAME_ME\n`
    )
    console.log(str)
    throw (new Error(`Commits to ${desired} branch are not permitted. Create a pull request.`))
  }
  // actual === desired - all is well
})()
