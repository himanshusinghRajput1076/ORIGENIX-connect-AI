import { prisma } from '@origenix/database';
export class SearchRepository {
  async searchAcrossAll(query: string, category?: string) {
    const filters = category ? { category } : {};
    return {
      companies: await prisma.company.findMany({ where: { name: { contains: query } } }),
      investors: await prisma.investor.findMany({ where: { name: { contains: query } } }),
      founders: await prisma.founder.findMany({ where: { name: { contains: query } } }),
      startups: await prisma.startup.findMany({ where: { company: { name: { contains: query } } } })
    };
  }
}
