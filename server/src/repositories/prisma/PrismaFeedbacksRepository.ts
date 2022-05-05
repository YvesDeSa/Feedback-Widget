
import { prisma } from "../../Prisma";

import { IFeedbackCreateData, IFeedbacksRepository } from "../IFeedbacksRepository";

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  public async create({ type, comment, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  };
}