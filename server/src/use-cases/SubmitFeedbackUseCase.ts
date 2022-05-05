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

    this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    console.log('Submit');

    this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div>',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>',
      ].join('\n')
    })
  }
}