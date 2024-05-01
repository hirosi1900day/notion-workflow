import * as core from '@actions/core';
import { NotionAction } from './notion_action';
import { NotionIssueFetcher } from './notion_issue_fetcher'
import { Client, LogLevel } from '@notionhq/client';
import { GithubIssueFetcher } from './github_issue_fetcher'

async function main(): Promise<void> {
  const notionToken = core.getInput('notion_token');
  const notionTaskDatabaseId = core.getInput('notion_task_database_id');
  const url = core.getInput('url');
  const repo_owner= core.getInput('repo_owner');
  const repo_name = core.getInput('repo_name');
  
  const notionAction = new NotionAction(notionToken, notionTaskDatabaseId, url);
  await notionAction.run();
  const notionClient = new Client({
    auth: notionToken,
    logLevel: LogLevel.DEBUG
  })
  
  //  以下確認ようのコード
  core.error('失敗テスト')
  const notionFetcher = new NotionIssueFetcher(notionClient, notionTaskDatabaseId)
  const test = await notionFetcher.fetchIssues()
  core.info(`testだよー！:${test}`)
  const githubFetcher = new GithubIssueFetcher(repo_owner, repo_name)
  const test2 = await githubFetcher.getIssues()
  console.log(test2)
  core.setOutput('test', test2);
}


main();