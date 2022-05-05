import express from 'express';
import { container } from 'tsyringe';
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedbackUseCase';

export const routes = express.Router();


routes.post('/feedback', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const submitFeedbackUseCase = container.resolve(SubmitFeedbackUseCase);

  submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return response.status(201).send();
});