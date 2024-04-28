import * as core from '@actions/core';
import { NotionAction } from './notion_action';


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