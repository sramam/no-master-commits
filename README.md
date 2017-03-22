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

A small brick in the wall that allows automation of a git-flow/feature-branch
git branching workflow. Both prevent commits directly to the master branch.

A lazy-dog developer like me will always forget and commit locally,
and then scramble to make things right. This is a tool to prevent making the mistake.

Also as an aid to the forget-ful developer, provides the
required help to self-correct without having to resort to google.

# No CI?
Turns out that CI systems checkout a branch at specific commit-shas.
Reversing the branch information for this is a complicated process and we bailed after a few attempts.

The tests are run locally, and since the package is supposed to check
local checkouts in the first place, we'll leave it at that.
