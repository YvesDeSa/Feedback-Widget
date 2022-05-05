import { container } from 'tsyringe';

import { IFeedbacksRepository } from '../../repositories/IFeedbacksRepository';
import { PrismaFeedbacksRepository } from '../../repositories/prisma/PrismaFeedbacksRepository';

import { IMailAdapter } from '../../adapters/IMailAdapter';
import { NodemailerMailAdapter } from '../../adapters/nodemailer/NodemailerMailAdapter';

container.registerSingleton<IFeedbacksRepository>(
  'FeedbacksRepository',
  PrismaFeedbacksRepository
);

container.registerSingleton<IMailAdapter>(
  'MailAdapter',
  NodemailerMailAdapter
);