import { warn, fail, danger } from 'danger';

const removeContext = (string) => string.replace(/^(.[^ ]+:\s*)/, '');
const startWithCapitalLetter = (string) => string[0] === string[0].toUpperCase();

// PR METADATA CHECKS
const prTitle = removeContext(danger.github.pr.title);

if(prTitle.endsWith('.')) {
  warn(`PR title <i>"${prTitle}"</i> ends with a period`);
}

if(!startWithCapitalLetter(prTitle)) {
  warn(`First word in PR title <i>"${prTitle}"</i> isn't capitalized`);
}

// COMMIT METADATA CHECKS
danger.github.commits.forEach(commit => {
  const commitTitle = removeContext(commit.commit.message.split('\n')[0]);

  if(commitTitle.endsWith('.')) {
    fail(`Commit message <i>"${commitTitle}"</i> ends with a period`);
  }

  if(!startWithCapitalLetter(commitTitle)) {
    fail(`First word in commit message <i>"${commitTitle}"</i> isn't capitalized`);
  }
});
