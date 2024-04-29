interface Issue {
  title: string;
  number: number;
  state: string;
  comment_count: number;
  url: string;
}

interface IssueProperties {
  Name: {
    title: { type: string; text: { content: string } }[];
  };
  "Issue Number": {
    number: number;
  };
  State: {
    select: { name: string };
  };
  "Number of Comments": {
    number: number;
  };
  "Issue URL": {
    url: string;
  };
}

export class IssuePropertyGetter {
  private title: string;
  private number: number;
  private state: string;
  private commentCount: number;
  private url: string;

  constructor(issue: Issue) {
    this.title = issue.title;
    this.number = issue.number;
    this.state = issue.state;
    this.commentCount = issue.comment_count;
    this.url = issue.url;
  }

  getProperties(): IssueProperties {
    return {
      Name: {
        title: [{ type: "text", text: { content: this.title } }],
      },
      "Issue Number": {
        number: this.number,
      },
      State: {
        select: { name: this.state },
      },
      "Number of Comments": {
        number: this.commentCount,
      },
      "Issue URL": {
        url: this.url,
      },
    };
  }
}
