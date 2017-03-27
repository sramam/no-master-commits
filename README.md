# no-master-commits
<!-- badge -->
[![npm license](https://img.shields.io/npm/l/no-master-commits.svg)](https://www.npmjs.com/package/no-master-commits)
[![David](https://david-dm.org/sramam/no-master-commits/status.svg)](https://david-dm.org/sramam/no-master-commits)
[![David](https://david-dm.org/sramam/no-master-commits/dev-status.svg)](https://david-dm.org/sramam/no-master-commits?type=dev)
<br/>
[![NPM](https://nodei.co/npm/no-master-commits.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/no-master-commits/)
<!-- endbadge -->

A simple node module to prevent commits to the master branch. Include in your pre-commit flow and profit.

# Why?

Popular (git work-flows)[https://www.atlassian.com/git/tutorials/comparing-workflows] prevent rewriting history
on the master branch and possibly others. To enforce this, no commits are allowed on such branches, only pull requests.

This lazy-developer, consistently made commits to local master branch,
and then suffered the consequences of having to reconcile the branches one too many times.

This module was born. The idea is to provide a simple CLI command that can be invoked in the precommit hook.

# Installation
```
npm install no-master-commits
```

# Usage
To prevent commits to branches ['master', 'deploy']
```
// package.json
"scripts": {
  "precommit": "no-master-commits -b master,deploy"
}
```

### No CI?
Turns out that CI systems checkout a branch at specific commit-shas.
Reversing the branch information for this is a complicated process and we bailed after a few attempts.

The tests are run locally, and since the package is supposed to check
local checkouts in the first place, we'll leave it at that.
