# bem-version

`bem version` command for [bem-tools](http://bem.info/tools/bem/).

## Installation

Install it globally if you are using globally installed `bem-tools`

    npm -g install bem-version

Or install it into your project

    npm install bem-version --save-dev

## Usage

Create commit with patch version bump

    bem version patch

Create commit with minor version bump and tag it

    bem version minor --tag

If you are on a release branch and want to merge it into `master` after bumping version run

    bem version major --merge --tag

of into another branch

    bem version major --merge-into v1 --tag

If you are using `git-flow`, you could use it with `bem version` together

    git flow release start 1.0.25
    git add ChangeLog.md
    git commit -m "ChangeLog for 1.0.25"
    bem version patch
    git flow release finish 1.0.25
