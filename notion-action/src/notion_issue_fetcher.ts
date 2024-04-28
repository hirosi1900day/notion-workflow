import { Client } from "@notionhq/client"; // Notion SDK
import { QueryDatabaseResponse, NumberPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints"; // 型定義
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Issue {
  pageId: string;
  issueNumber: number;
}

export class NotionIssueFetcher {
  private notionClient: Client;
  private databaseId: string;

  constructor(notionClient: Client, databaseId: string) {
    this.notionClient = notionClient;
    this.databaseId = databaseId;
  }

  async fetchIssues(): Promise<Issue[]> {
    const pages: PageObjectResponse[] = [];
    let cursor: string | undefined;

    while (true) {
      const response: QueryDatabaseResponse = await this.notionClient.databases.query({
        database_id: this.databaseId,
        start_cursor: cursor,
      });

      pages.push(...response.results as PageObjectResponse[]);

      if (!response.next_cursor) {
        break;
      }

      cursor = response.next_cursor;
    }

    console.log(`${pages.length} issues successfully fetched.`);

    const issues: Issue[] = [];

    for (const page of pages) {
      const issueNumberPropertyId = page.properties["Issue Number"].id;
      const propertyResult = await this.notionClient.pages.properties.retrieve({
        page_id: page.id,
        property_id: issueNumberPropertyId,
      }) as NumberPropertyItemObjectResponse;
      
      console.log('確認でーす')
      if (propertyResult.number) {
        console.log('確認3', page.id)
        console.log('確認4', propertyResult.number)
        issues.push({
          pageId: page.id,
          issueNumber: propertyResult.number,
        });
      }
    }

    return issues;
  }
}
