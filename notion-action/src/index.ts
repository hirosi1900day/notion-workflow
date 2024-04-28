import * as core from '@actions/core';
import { NotionAction } from './notion_action';
import { NotionIssueFetcher } from './notion_issue_fetcher'
import { Client, LogLevel } from '@notionhq/client';

async function main(): Promise<void> {
  const notionToken = core.getInput('notion_token');
  const notionTaskDatabaseId = core.getInput('notion_task_database_id');
  const url = core.getInput('url');
  // const repo_name = core.getInput('repo_name');
  // const repo_owner= core.getInput('repo_owner');

  const notionAction = new NotionAction(notionToken, notionTaskDatabaseId, url);
  await notionAction.run();
  const notionClient = new Client({
    auth: notionToken,
    logLevel: LogLevel.DEBUG
  })
  const notionFetcher = new NotionIssueFetcher(notionClient, notionTaskDatabaseId)
  console.log('確認', notionFetcher.fetchIssues());
}


main();