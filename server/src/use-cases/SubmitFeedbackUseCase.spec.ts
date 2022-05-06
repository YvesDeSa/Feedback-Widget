import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

let submitFeedback: SubmitFeedbackUseCase;

describe('Submit feedback', () => {

  beforeEach(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => { } },
      { sendMail: async () => { } },
    )
  });

  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,screenshot-0001'
    })).resolves.not.toThrow();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,screenshot-0001'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid type', async () => {
    await expect(submitFeedback.execute({
      type: 'Invalid-type',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,screenshot-0001'
    })).rejects.toThrow();
  });


  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,screenshot-0001'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'invalid-screenshot'
    })).rejects.toThrow();
  });
});