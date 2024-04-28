import { setFailed } from '@actions/core';
import { Client, LogLevel } from '@notionhq/client';

export class NotionAction {
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
  