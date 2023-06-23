import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { textDocumentValidationSchema } from 'validationSchema/text-documents';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.text_document
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTextDocumentById();
    case 'PUT':
      return updateTextDocumentById();
    case 'DELETE':
      return deleteTextDocumentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTextDocumentById() {
    const data = await prisma.text_document.findFirst(convertQueryToPrismaUtil(req.query, 'text_document'));
    return res.status(200).json(data);
  }

  async function updateTextDocumentById() {
    await textDocumentValidationSchema.validate(req.body);
    const data = await prisma.text_document.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTextDocumentById() {
    const data = await prisma.text_document.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
