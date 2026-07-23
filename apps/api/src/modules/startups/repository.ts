import { prisma } from '@origenix/database';
export class StartupRepository {
  async findAll() { return prisma.startup.findMany(); }
  async findById(id: string) { return prisma.startup.findUnique({ where: { id } }); }
  async updateMetrics(id: string, data: any) { return prisma.startup.update({ where: { id }, data }); }
}
