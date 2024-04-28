import { setFailed } from '@actions/core';
import { Client, LogLevel } from '@notionhq/client';
import * as core from '@actions/core';

class NotionAction {
  notionToken: string;
  notionTaskDatabaseId: string;
  url: string;

  constructor(notionToken: string, notionTaskDatabaseId: string, url: string) {
    this.notionToken = notionToken;
    this.notionTaskDatabaseId = notionTaskDatabaseId;
    this.url = url;
  }

  async run(): Promise<void> {
    const notion = new Client({
      auth: this.notionToken,
      logLevel: LogLevel.DEBUG,
    });

    try {
      await notion.pages.create({
        parent: { database_id: this.notionTaskDatabaseId },
        properties: {
          'GitHub Issue リンク': {
            type: 'url',
            url: this.url,
          }
        },
      });
    } catch (error) {
      setFailed(error as Error);
    }
  }
}

async function main(): Promise<void> {
  const notionToken = core.getInput('notion_token');
  const notionTaskDatabaseId = core.getInput('notion_task_database_id');
  const url = core.getInput('url');
  // const repo_name = core.getInput('repo_name');
  // const repo_owner= core.getInput('repo_owner');

  const notionAction = new NotionAction(notionToken, notionTaskDatabaseId, url);
  await notionAction.run();
}

main();