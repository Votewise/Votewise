Development process
===================

1. Create a branch to represent your work.  `git checkout -b branchname` will
   simultaneously create a new branch and switch you to it.
2. Start by writing tests that describe what you are adding.  Your tests should
   make you confident that, when they pass, the feature you are adding is done
   and implemented properly.  Be thoughtful about corner cases, like failures.
3. If you made a new test file, add it to `run-tests`.
3. Now implement the feature until your tests pass.  If you think of any extra
   edge cases, add them.  Keep working until all the tests pass and you're happy 
   with your work.
4. Merge in the most recent Node branch.

   ```
      $ git fetch
      $ git merge origin/Node
   ```
5. Fix any merge conflicts that may have resulted from the above.
6. Run `./run-tests`.  They should all pass.
7. Push your branch to GitHub.
8. Create a pull request on GitHub from your branch to Node.  Add at least one
   other programmer as a participant to review it.
9. When you and the reviewer are happy with the changes, merge them into Node.

TODO: The `Node` branch should be changed to `dev` or something.

