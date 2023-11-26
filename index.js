const { Octokit } = require('@octokit/rest');
const xml2js = require('xml2js');

const octokit = new Octokit({
  auth: 'YOUR_GITHUB_TOKEN',
});

const getRepoNames = async () => {
  try {
    const { data } = await octokit.rest.repos.listForAuthenticatedUser();

    const repoNames = data.map(repo => repo.name);

    return repoNames;
  } catch (error) {
    console.error('Error retrieving repository names:', error);
    return [];
  }
};
  
getRepoNames()
  .then(repoNames => {
    console.log('GitHub Repository Names:');
    repoNames.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  

const owner = 'YOUR_GITHUB_USERNAME'; // Replace with the GitHub username or organization name
const repo = 'REPO_NAME'; // Replace with the name of the repository

const getPomFiles = async () => {
    try {
      const { data } = await octokit.rest.repos.getContent({ owner, repo, path: '' });
  
      // Filter for pom.xml files
      const pomFiles = data.filter(file => file.name.toLowerCase() === 'pom.xml');
  
      return pomFiles;
    } catch (error) {
      console.error('Error retrieving repository contents:', error);
      return [];
    }
  };
  
  const parsePomXML = async (content) => {
    try {
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(content);
      return result;
    } catch (error) {
      console.error('Error parsing POM.XML:', error);
      return {};
    }
  };
  
  const getDependenciesFromPom = (parsedPom) => {
    const dependencies = [];
  
    if (parsedPom.project.dependencies) {
      const dependencyList = parsedPom.project.dependencies[0].dependency || [];
  
      for (const dependency of dependencyList) {
        dependencies.push({
          group: dependency.groupId[0],
          artifact: dependency.artifactId[0],
          version: dependency.version[0],
        });
      }
    }
  
    return dependencies;
  };
  
  const processPomFiles = async () => {
    const pomFiles = await getPomFiles();
  
    for (const file of pomFiles) {
      const contentResponse = await octokit.rest.repos.getContent({ owner, repo, path: file.path });
  
      if (!contentResponse.data) {
        console.error('Error fetching content for', file.path);
        continue;
      }
  
      const content = Buffer.from(contentResponse.data.content, 'base64').toString('utf8');
      const parsedPom = await parsePomXML(content);
  
      const dependencies = getDependenciesFromPom(parsedPom);
  
      console.log('Dependencies from', file.path, ':');
      dependencies.forEach((dependency, index) => {
        console.log(`${index + 1}. Group: ${dependency.group}, Artifact: ${dependency.artifact}, Version: ${dependency.version}`);
      });
    }
  };
  
  processPomFiles();
