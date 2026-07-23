import { PrismaClient, UserRole, CompanyType, FundingStage, ContactStage, LeadTemp } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.$transaction(async (tx: any) => {
    // 1. Create Admin User
    const admin = await tx.user.create({
      data: {
        email: 'himanshu@origenix.ai',
        name: 'Himanshu Singh',
        passwordHash: '$2b$10$xyz123placeholderhash', // Placeholder hash
        role: UserRole.ADMIN,
      },
    });
    console.log(`Created admin user: ${admin.email}`);

    // 2. Create Companies
    const origenix = await tx.company.create({
      data: {
        name: 'Origenix Connect AI',
        type: CompanyType.STARTUP,
        stage: FundingStage.PRE_SEED,
        location: 'Bengaluru',
        industries: ['AI', 'Data', 'B2B SaaS'],
      },
    });

    const horizon = await tx.company.create({
      data: {
        name: 'Horizon Ventures',
        type: CompanyType.VC_FIRM,
        stage: FundingStage.SERIES_A,
        location: 'Bengaluru',
        industries: ['Fintech', 'Healthcare', 'AI'],
      },
    });

    const techBridge = await tx.company.create({
      data: {
        name: 'TechBridge Fund',
        type: CompanyType.VC_FIRM,
        stage: FundingStage.SEED,
        location: 'Mumbai',
        industries: ['Web3', 'AI', 'Consumer Tech'],
      },
    });
    console.log('Created 3 companies.');

    // 3. Create Investors
    await tx.investor.createMany({
      data: [
        {
          name: 'Alice Investor',
          title: 'Partner',
          companyId: horizon.id,
          location: 'Bengaluru',
          industries: ['AI'],
        },
        {
          name: 'Bob Capital',
          title: 'Managing Director',
          companyId: horizon.id,
          location: 'Singapore',
          industries: ['Fintech'],
        },
        {
          name: 'Charlie Bridge',
          title: 'Principal',
          companyId: techBridge.id,
          location: 'Mumbai',
          industries: ['Web3'],
        },
      ],
    });
    console.log('Created 3 investors.');

    // 4. Create Founders
    await tx.founder.createMany({
      data: [
        {
          name: 'Himanshu Singh',
          title: 'CEO',
          companyId: origenix.id,
          location: 'Bengaluru',
          industries: ['AI'],
        },
        {
          name: 'Dana Founder',
          title: 'CTO',
          companyId: origenix.id,
          location: 'Bengaluru',
          industries: ['AI', 'Data'],
        },
        {
          name: 'Eve Builder',
          title: 'CEO',
          companyId: horizon.id, // Reusing existing company for simplicity
          location: 'San Francisco',
          industries: ['SaaS'],
        },
      ],
    });
    console.log('Created 3 founders.');

    // 5. Create Startups
    await tx.startup.create({
      data: {
        companyId: origenix.id,
        currentStage: FundingStage.PRE_SEED,
      },
    });

    // Create another company for a second startup
    const startup2Company = await tx.company.create({
      data: {
        name: 'AI Innovators',
        type: CompanyType.STARTUP,
        stage: FundingStage.SEED,
        location: 'Pune',
      },
    });

    await tx.startup.create({
      data: {
        companyId: startup2Company.id,
        currentStage: FundingStage.SEED,
      },
    });
    console.log('Created 2 startups.');

    // 6. Create Contacts
    await tx.contact.createMany({
      data: [
        {
          name: 'Frank Lead',
          email: 'frank@example.com',
          companyName: 'Example Corp',
          stage: ContactStage.NEW,
          temperature: LeadTemp.COLD,
        },
        {
          name: 'Grace Prospect',
          email: 'grace@example.com',
          companyName: 'Prospect Inc',
          stage: ContactStage.MEETING_SCHEDULED,
          temperature: LeadTemp.WARM,
        },
        {
          name: 'Henry Deal',
          email: 'henry@example.com',
          companyName: 'Deal LLC',
          stage: ContactStage.TERM_SHEET,
          temperature: LeadTemp.HOT,
        },
      ],
    });
    console.log('Created 3 contacts.');
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
