# GitHub Repository and Pom.xml Dependencies Extractor

This script uses the GitHub API to list all repository names of a GitHub user and extracts dependencies from the `pom.xml` files in a specified repository.

## Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:

 ```bash
 git clone https://github.com/your-username/your-repo.git
```
 
2. Install the required npm packages:
 ```bash
 npm install
```

3. Set up a GitHub personal access token:

  - Go to GitHub Settings > Developer settings > Personal access tokens.
  - Generate a new token with the repo scope.
  - Copy the token.

4. Open the index.js file and replace 'YOUR_GITHUB_TOKEN' with the personal access token you generated.

 ```bash
 const octokit = new Octokit({
 auth: 'YOUR_GITHUB_TOKEN',
 });
 ```

5.Replace 'YOUR_GITHUB_USERNAME' with your GitHub username and 'REPO_NAME' with the repository name:
 
```bash
const owner = 'YOUR_GITHUB_USERNAME';
const repo = 'REPO_NAME';
```

6. Run the script:

 ```bash
 node index.js
```


# Output
The script will output the list of repository names and dependencies from pom.xml files.

# Example Output
GitHub Repository Names:

1. repository1
2. repository2
3. repository3
4. Dependencies from pom.xml:

Group: com.example, Artifact: example-library, Version: 1.0.0

Group: org.springframework, Artifact: spring-boot, Version: 2.5.3



