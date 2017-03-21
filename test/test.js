/* eslint-env mocha */
const expect = require('chai').expect

describe('no-master-commits', function () {
  it('check local master branch', function () {
    expect(function () {
      require('../index')
    }).to.throw(/Commits to the master are not permitted/)
  })
})
