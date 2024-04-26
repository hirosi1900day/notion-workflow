import { setFailed } from '@actions/core'
import { Client, LogLevel } from '@notionhq/client'
import * as core from '@actions/core'

const notion_token = core.getInput('notion_token');
const notion_task_database_id = core.getInput('notion_task_database_id');
const title = core.getInput('title');
const repo = core.getInput('repo');
const url = core.getInput('url');

async function run(): Promise<void> {
  const notion = new Client({
    auth: notion_token,
    logLevel: LogLevel.DEBUG,
  })

  try {
    await notion.pages.create({
      parent: { database_id: notion_task_database_id },
      properties: {
        'GitHub Issue リンク': {
          type: 'url',
          url: url,
        }
      },
    })
  } catch (error) {
    setFailed(error as Error)
  }
}

run()