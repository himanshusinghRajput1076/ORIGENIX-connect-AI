import { prisma } from '@origenix/database';
export class CompanyRepository {
  async findAll(filters: any) { return prisma.company.findMany({ where: filters }); }
  async findById(id: string) { return prisma.company.findUnique({ where: { id } }); }
  async create(data: any) { return prisma.company.create({ data }); }
  async update(id: string, data: any) { return prisma.company.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.company.delete({ where: { id } }); }
}
