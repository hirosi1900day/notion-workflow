"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const client_1 = require("@notionhq/client");
const core = __importStar(require("@actions/core"));
const notion_token = core.getInput('notion_token');
const notion_task_database_id = core.getInput('notion_task_database_id');
const title = core.getInput('title');
const repo = core.getInput('repo');
const url = core.getInput('url');
async function run() {
    const notion = new client_1.Client({
        auth: notion_token,
        logLevel: client_1.LogLevel.DEBUG,
    });
    try {
        await notion.pages.create({
            parent: { database_id: notion_task_database_id },
            properties: {
                タスク名: {
                    id: 'title',
                    title: [{ text: { content: title } }],
                },
                リポジトリ: {
                    type: 'select',
                    select: { name: repo },
                },
                'GitHub Issue リンク': {
                    type: 'url',
                    url: url,
                },
            },
        });
    }
    catch (error) {
        (0, core_1.setFailed)(error);
    }
}
run();
//# sourceMappingURL=index.js.map