import { prisma } from '@origenix/database';
export class UserRepository {
  async findByEmail(email: string) { return prisma.user.findUnique({ where: { email } }); }
  async create(data: any) { return prisma.user.create({ data }); }
  async findById(id: string) { return prisma.user.findUnique({ where: { id } }); }
  async update(id: string, data: any) { return prisma.user.update({ where: { id }, data }); }
}
