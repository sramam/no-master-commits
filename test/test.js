/* eslint-env mocha */
const expect = require('chai').expect
const pkgDir = require('pkg-dir')
const path = require('path')
const fs = require('fs')

function currBranch () {
  const basedir = pkgDir.sync()
  const gitHeadFile = path.join(basedir, '.git', 'HEAD')
  const gitHead = fs.readFileSync(gitHeadFile, 'utf8')
  const heads = gitHead.match(/ref: refs\/heads\/([^\n]+)/)
  return heads[1]
}

describe('no-master-commits', function () {
  const curr = currBranch()

  before(() => {
    expect(curr).to.not.equal('master', 'tests cannot run when master branch is checked out')
  })

  it(`cannot commit to ['${curr}', 'master']`, () => {
    try {
      const noMasterCommit = require('../index')
      noMasterCommit([curr, 'master'])
      expect(true).to.be.false(`Check to prevent commits to ${curr} branch failed.`)
    } catch (err) {
      expect(err.message).to.equal(
        `Commits to '${curr}' branch are restricted. Please commit to a feature-branch and generate a pull-request to '${curr}'.`
      )
    }
  })

  it(`can commit to branch '${curr}'`, () => {
    const noMasterCommit = require('../index')
    noMasterCommit()
    // exception will fail the test
  })
})
