import { prisma } from '@origenix/database';
export class FounderRepository {
  async findAll(filters: any) { return prisma.founder.findMany({ where: filters }); }
  async findById(id: string) { return prisma.founder.findUnique({ where: { id } }); }
}
