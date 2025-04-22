import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: environment.chatGptSecret
    });

    this.openai = new OpenAIApi(configuration);
  }

  async getDataFromOpenAPI(text: string): Promise<string | undefined> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: text }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return response.data.choices[0]?.message?.content?.trim();
    } catch (error: any) {
      console.error('OpenAI API Error:', error?.response?.data || error.message);
      return 'There was an error contacting OpenAI.';
    }
  }
}
