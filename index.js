const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const pkgUp = require('pkg-up')
const desired = 'master'

module.exports = (function () {
  return pkgUp().then(fpath => {
    const basedir = path.dirname(fpath)
    const gitHead = path.join(basedir, '.git', 'HEAD')
    return new Promise((resolve, reject) => {
      fs.readFile(gitHead, 'utf8', (err, data) => {
        if (err) {
          reject(new Error(`${basedir} does not appear to be a git repository`))
        }
        if (!data || data === '') {
          reject(new Error(`${gitHead} is an empty file. Cannot validate.`))
        }
        const re = /ref: refs\/heads\/([^\n]+)/
        const match = re.exec(data)
        const actual = match ? match[1] : null
        if (actual && actual !== desired) {
          resolve()
        } else if (actual && actual === desired) {
          const str = chalk.yellow(
            ` MEMORY AID: to create a new branch:\n` +
            ` git checkout -b feature-branch-RENAME_ME master\n` +
            ` git push -u orign feature-branch-RENAME_ME\n`
          )
          console.log(str)
          reject(new Error(`Commits to ${desired} branch are not permitted. Create a pull request.`))
        } else {
          reject(new Error(`${gitHead} is badly formed. Cannot validate.`))
        }
      })
    })
  })
})()
