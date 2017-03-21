
const gitBranch = require('git-branch')
const chalk = require('chalk')
const branch = 'master'

module.exports = (function () {
  const actual = gitBranch.sync()
  if (actual === branch) {
    const str = chalk.bgCyan.black(
      '\n  To create a new branch that is tracked (I never remember the commands):\n' +
      '    git checkout -b feature-branch_RENAME_ME master\n' +
      '    git push -u origin feature-branch_RENAME_ME'
    )
    console.log(str)
    throw new Error('Commits to the ' + branch + ' are not permitted')
  }
})()
