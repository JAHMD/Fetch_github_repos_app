const reposContainer = document.querySelector(".repos-container");
const userInput = document.getElementById("user-name");
const getReposBtn = document.querySelector(".submit-btn");
const noRepos = document.querySelector(".no-repos");

// "https://api.github.com/users/JAHMD/repos"
// ElzeroWebSchool
// JAHMD

getReposBtn.addEventListener("click", handler);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handler();
  }
});

function handler() {
  console.log();
  if (userInput.value) {
    let input = userInput.value;
    userInput.value = "";
    userInput.focus();
    reposContainer.innerText = "";
    let api = `https://api.github.com/users/${input}/repos`;
    getrepos(api).then((repos) => {
      if ([...repos].length > 0) {
        repos.forEach((repo) => {
          const repoContainer = document.createElement("div");
          const repoName = document.createElement("p");
          const stars = document.createElement("span");
          const repoLink = document.createElement("a");
          // set elements values
          repoContainer.className = "repo-container";
          repoName.className = "repo-name";
          repoName.innerText = repo.name;
          stars.className = "stars";
          stars.innerText = `Stars ${repo.stargazers_count}`;
          repoLink.className = "repo-url";
          repoLink.href = repo.html_url;
          repoLink.target = "_blank";
          repoLink.innerText = "Link";
          repoContainer.append(repoName, stars, repoLink);
          reposContainer.append(repoContainer);
          noRepos.style.display = "none";
        });
      } else {
        noRepos.style.display = "flex";
        reposContainer.append(noRepos);
      }
    });
  }
}
// get repos function
async function getrepos(api) {
  try {
    let repos = await fetch(api);
    return repos.json();
  } catch (error) {
    return error;
  }
}
