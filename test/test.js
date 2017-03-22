/* eslint-env mocha */
const expect = require('chai').expect

describe('no-master-commits', function () {
  it('check local master branch', function () {
    try {
      require('../index')
      expect(true).to.be.false('Check to prevent commits to master branch failed.')
    } catch (err) {
      expect(err.message).to.match(/Commits to master branch are not permitted. Create a pull request./)
    }
  })
})
