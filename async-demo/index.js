console.log('before');
// getUser(1, (user) => {
//     console.log('User', user.id, user.githubUsername);

//     getRepositories(1, (repo) => {
//         console.log('Repositorie', repo);

//         getCommits(2, (commit) => {
//             console.log('Commits', commit)
//         });
//     });
// });

//Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.repo))
//     .then(commits => getCommits(commits))
//     .then(commits => console.log(commits))
//     .catch(err => console.log('Error', err.message));

console.log('after');

//Async and await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repo = await getRepositories(user.repo);
        const commit = await getCommits(commits);
        console.log(commits);
    } catch(err) {
        console.log('Error', err.message);
    }
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, githubUsername: 'den', repo: 2});
        }, 2000);
    });
}

function getRepositories(repo) {
    const repositories = ['repo1', 'repo2', 'repo3'];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //resolve(repositories[repo - 1]);
            reject(new Error('Something went wrong...'))
        }, 2000);
    }); 
}

function getCommits(commit) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    }); 
}