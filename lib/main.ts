#!/usr/bin/env node
import { __VERSION__ } from './config';
import dontenv from 'dotenv';
import chalk from 'chalk';
import { ChatGPTAPI } from 'chatgpt';
import ora from 'ora';
import prompts from 'prompts';
dontenv.config();

let conversationId = '';
let parentMessageId = '';
let name = 'ChatGPT';

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) {
  chalk.red('请提供你的OPENAI_API_KEY');
  process.nextTick(() => {
    process.exit(0);
  });
}

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string
});

const handleSession = async (message: string) => {
  const spinner = ora('').start();
  try {
    let res = await api.sendMessage(message, {
      conversationId,
      parentMessageId
    });
    conversationId = res.conversationId;
    parentMessageId = res.parentMessageId;

    spinner.succeed(chalk.green(res.text));
  } catch (error) {
    spinner.stop();
    await handleSession(message);
  }
};

const chatGptAction = async () => {
  while (true) {
    const response = await prompts(
      {
        type: 'text',
        name: 'message',
        message: ``
      },
      {
        onCancel(prompt, answers) {
          process.exit(0);
        }
      }
    );

    await handleSession(response.message);
  }
};

chatGptAction();
