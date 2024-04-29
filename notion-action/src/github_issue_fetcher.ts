import { Octokit } from "@octokit/rest";

interface Issue {
  number: number;
  title: string;
  state: string;
  comment_count: number;
  url: string;
}

export class GithubIssueFetcher {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor(owner: string, repo: string) {
    this.octokit = new Octokit();
    this.owner = owner;
    this.repo = repo;
  }

  async getIssues(): Promise<Issue[]> {
    const issues: Issue[] = [];
    const iterator = this.octokit.paginate.iterator(this.octokit.rest.issues.listForRepo, {
      owner: this.owner,
      repo: this.repo,
      state: "all",
      per_page: 100,
    });

    for await (const response of iterator) {
      for (const issue of response.data) {
        if (!issue.pull_request) {
          issues.push({
            number: issue.number,
            title: issue.title,
            state: issue.state,
            comment_count: issue.comments,
            url: issue.html_url,
          });
        }
      }
    }
    return issues;
  }
}
