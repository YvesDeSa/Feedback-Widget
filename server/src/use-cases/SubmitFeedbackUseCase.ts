import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { IMailAdapter } from "../adapters/IMailAdapter";
import { IFeedbacksRepository } from "../repositories/IFeedbacksRepository";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

@injectable()
export class SubmitFeedbackUseCase {

  constructor(
    @inject('FeedbacksRepository') private feedbackRepository: IFeedbacksRepository,
    @inject('MailAdapter') private mailAdapter: IMailAdapter
  ) { }

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required.');
    }

    if (!(type === 'BUG' || type === 'IDEA' || type === 'OTHER')) {
      throw new Error('Invalid type format.');
    }

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    console.log('Submit');

    this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 18px; color: #111; text-align: center" >',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img width="80%" src="${screenshot}" />` : '',
        '</div>',
      ].join('\n')
    })
  }
}