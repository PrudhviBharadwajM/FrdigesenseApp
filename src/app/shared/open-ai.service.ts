import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor() { }

  public configuration = new Configuration({
    organization:"org-GV8TdrWqwhpymHLlSWItn1vX",
    apiKey: environment.chatGptSecret
  });

  public openai = new OpenAIApi(this.configuration);

  async getDataFromOpenAPI(text: string) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: 3800,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response = completion.data.choices[0].text;
    return response;
  }
}