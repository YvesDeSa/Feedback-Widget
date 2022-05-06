import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

let submitFeedback: SubmitFeedbackUseCase;

describe('Submit feedback', () => {

  beforeEach(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => { } },
      { sendMail: async () => { } }
    )
  });

  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'testImage.png'
    })).resolves.not.toThrow();
  });

});