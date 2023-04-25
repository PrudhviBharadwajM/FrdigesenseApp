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
    const completion = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: text}],
    });
    
    const response = completion.data.choices[0].message?.content;
    return response;
}
}