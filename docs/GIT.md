# Git

Git, GitHub, and the workflow around them: branching, review, commit history, and
getting yourself out of trouble.
Part of the [Frontend Roadmap](../README.md).
See also [Deployment](DEPLOYMENT.md) for the CI pipelines built on GitHub Actions,
and [Tooling](TOOLING.md) for the monorepo tools referenced below.

Learning the commands takes an afternoon. What costs people time in their first job
is everything around them: which branch to start from, how to keep it current, what
belongs in a single commit, what a reviewer needs from a pull request, and how to
undo something that is already pushed. The Learn section covers the commands;
everything after it covers working with other people.

## Learn

- [Pro Git](https://git-scm.com/book/en/v2) — The official book, free in full, and still the best single explanation of Git there is.
- [Learn Git Branching](https://learngitbranching.js.org/) — Branching, merging, and rebasing taught by moving nodes around an animated commit graph.
- [Git How To](https://githowto.com/) — Guided tour that walks through the fundamentals of Git.
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials) — Tutorials covering the commands and the workflows, with the clearest writing on rebasing anywhere.
- [GitHub Skills](https://skills.github.com/) — Short interactive courses that run as real pull requests in a repository of your own.

## Reference

### Documentation and cheat sheets

- [Git Documentation](https://git-scm.com/docs) — Reference page for every command, and the place to check what a flag really does.
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) — GitHub's one-page PDF of the commands you use daily. Kept as the only cheat sheet here because it is printable and does not go stale.
- [Git Command Explorer](https://gitexplorer.com/) — Finds the command from what you are trying to do, rather than the other way round.

### Git's model

Git stops being magic once you know that a commit is a snapshot plus a pointer to
its parent, and that a branch is a file containing one commit ID. Merge, rebase,
reset, and cherry-pick are all just moving those pointers, which is why the reading
below pays for itself.

- [Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) — The object store — blobs, trees, and commits — built up by hand from plumbing commands.
- [Commits Are Snapshots, Not Diffs](https://github.blog/open-source/git/commits-are-snapshots-not-diffs/) — The most useful correction to the way most people picture a commit.
- [Git From the Inside Out](https://maryrosecook.com/blog/post/git-from-the-inside-out) — Walks the graph as it changes, command by command, down to the files on disk.
- [Visualize Git](https://git-school.github.io/visualizing-git/) — Git visualizations powered by D3, driven by commands you type yourself.

### Everyday workflow

- [Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) — Staging, committing, and diffing, and what the index is actually for.
- [Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) — Fetch, pull, push, and the tracking relationship between a local branch and its remote.
- [Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning) — Parking half-finished work so you can switch branches without committing it.
- [Ignoring Files](https://docs.github.com/en/get-started/git-basics/ignoring-files) — What belongs in `.gitignore`, per repository and per machine.
- [gitattributes](https://git-scm.com/docs/gitattributes) — Line endings, diff drivers, and marking generated files, in the config file everyone forgets exists.

### Branching and collaboration

The short version of the argument: rebase your own branch to keep it current and to
tidy it before review, merge it into the trunk when it is ready, and never rebase a
branch someone else has already pulled.

- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow) — Branch, commit, open a pull request, merge, delete the branch. The default for a web team.
- [Trunk Based Development](https://trunkbaseddevelopment.com/) — Short-lived branches merged daily, and the case against long-running release branches.
- [Merging vs Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) — The golden rule of rebasing, and when each of the two is the right call.
- [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) — Why a branch costs nothing, and what a fast-forward actually is.
- [Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts) — Reading the conflict markers and resolving them without guessing.

### Pull requests and code review

- [How to Write the Perfect Pull Request](https://github.blog/developer-skills/github/how-to-write-the-perfect-pull-request/) — GitHub's own guidance on the scope, context, and tone of a PR.
- [Google's Code Review Guide](https://google.github.io/eng-practices/review/) — What a reviewer should look for and how to be reviewed well. The standard reference on both halves.
- [Conventional Comments](https://conventionalcomments.org/) — Labelling review comments as `nit:`, `suggestion:`, or `blocking:` so that tone survives plain text.
- [Pull Request Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) — Committing the checklist so every PR arrives with the same context.
- [Stacked Pull Requests](https://www.stacking.dev/) — Splitting one large change into a chain of small PRs that can each be reviewed on its own.

### Commit hygiene

- [How to Write a Git Commit Message](https://cbea.ms/git-commit/) — The seven rules, including why the subject line is written in the imperative mood.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) — A `feat:` or `fix:` prefix that machines can read, which is what drives changelogs and version bumps.
- [Atomic Commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/) — One commit per logical change, and everything that buys you months later.
- [Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) — Amend, interactive rebase, squash, and reorder, before anyone else has seen the branch.
- [Pull Request Merges](https://docs.github.com/en/pull-requests/reference/pull-request-merges) — Merge commit, squash, or rebase: what each option does to the history you are left with.

### Fixing mistakes

You will need this section. Almost nothing is destroyed by an ordinary Git mistake:
commits stay reachable through the reflog for 90 days by default, so most of what
feels like lost work is a lookup rather than a loss.

- [Oh Shit, Git!?!](https://ohshitgit.com/) — The mistakes everyone makes, each with the commands that undo it. The same content lives swear-free at dangitgit.com.
- [Undoing Changes](https://www.atlassian.com/git/tutorials/undoing-changes) — `reset`, `revert`, and `restore` compared, with what each one touches and what it leaves alone.
- [Reset Demystified](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified) — Reset explained through HEAD, the index, and the working tree, which makes `--soft` and `--hard` obvious.
- [git reflog](https://git-scm.com/docs/git-reflog) — The log of everywhere HEAD has been, and how a deleted branch comes back.
- [Debugging with Git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git) — `git bisect` to binary-search history for the commit that broke it, plus `git blame`.

### GitHub

- [GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions) — Workflows, jobs, and runners from the concepts up; the pipelines built on it are in [Deployment](DEPLOYMENT.md).
- [Dependabot Version Updates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates) — Automated dependency-bump pull requests, and how to keep them from becoming noise.
- [About Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) — Tags, generated release notes, and attaching build artifacts to a version.
- [Semantic Versioning](https://semver.org/) — What a major, minor, or patch bump promises, which is the claim a release tag is making.
- [Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) — Issue forms that collect the information you would otherwise have to ask for every time.

### Advanced

- [git worktree](https://git-scm.com/docs/git-worktree) — Several branches checked out in several directories at once, sharing one clone.
- [Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) — How they work, and why most teams end up reaching for a published package or a monorepo instead.
- [Git LFS](https://git-lfs.com/) — Large binaries kept outside the object database, with small pointer files committed in their place.
- [Signing Your Work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) — GPG and SSH commit signing, and what the Verified badge on a commit is asserting.
- [monorepo.tools](https://monorepo.tools/) — What a monorepo needs from its tooling, and which tools provide it. See [Tooling](TOOLING.md) for the tools themselves.

## Practice

- [Oh My Git!](https://ohmygit.org/) — Open-source card game that teaches the commit graph by making you repair broken repositories.
- [Git Exercises](https://gitexercises.fracz.com/) — Graded exercises checked by pushing your solution to a server that inspects the history.

## Tools

- [gitignore.io](https://www.toptal.com/developers/gitignore) — Generates a `.gitignore` from the languages, editors, and frameworks you name.
- [GitHub CLI](https://cli.github.com/) — `gh`, for pull requests, issues, releases, and Actions runs from the terminal.
- [husky](https://typicode.github.io/husky/) — Git hooks committed to the repository, so lint and tests run before a commit lands.
- [lint-staged](https://github.com/lint-staged/lint-staged) — Runs linters over staged files only, which is what keeps a pre-commit hook fast enough to survive.
- [commitlint](https://commitlint.js.org/) — Checks commit messages against Conventional Commits, in a hook or in CI.
- [lazygit](https://github.com/jesseduffield/lazygit) — Terminal UI for staging hunks, rebasing, and resolving conflicts without memorising flags.
