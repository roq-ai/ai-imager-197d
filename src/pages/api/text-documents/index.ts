import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { textDocumentValidationSchema } from 'validationSchema/text-documents';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTextDocuments();
    case 'POST':
      return createTextDocument();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTextDocuments() {
    const data = await prisma.text_document
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'text_document'));
    return res.status(200).json(data);
  }

  async function createTextDocument() {
    await textDocumentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.video?.length > 0) {
      const create_video = body.video;
      body.video = {
        create: create_video,
      };
    } else {
      delete body.video;
    }
    const data = await prisma.text_document.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
