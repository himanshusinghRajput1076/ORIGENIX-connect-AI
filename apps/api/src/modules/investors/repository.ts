import { prisma } from '@origenix/database';
export class InvestorRepository {
  async findAll(filters: any) { return prisma.investor.findMany({ where: filters }); }
  async findById(id: string) { return prisma.investor.findUnique({ where: { id } }); }
}
