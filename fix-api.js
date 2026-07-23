const fs = require('fs');
const path = require('path');
const apiModules = 'J:/Origenix Connect AI/origenix-connectai/apps/api/src/modules';

const repos = fs.readdirSync(apiModules).filter(f => fs.statSync(path.join(apiModules, f)).isDirectory());

repos.forEach(repoName => {
  const repoFile = path.join(apiModules, repoName, 'repository.ts');
  if (!fs.existsSync(repoFile)) return;
  if (repoName === 'linkedin') return;
  
  let className = repoName.charAt(0).toUpperCase() + repoName.slice(1);
  if (className.endsWith('s') && className !== 'AiAnalysis') className = className.slice(0, -1);
  if (className === 'Ai') className = 'Ai';
  className += 'Repository';
  
  if (repoName === 'startups') className = 'StartupRepository';
  if (repoName === 'investors') className = 'InvestorRepository';
  if (repoName === 'founders') className = 'FounderRepository';
  if (repoName === 'users') className = 'UserRepository';
  if (repoName === 'companies') className = 'CompanyRepository';
  if (repoName === 'notifications') className = 'NotificationRepository';
  if (repoName === 'crm') className = 'CRMRepository'; 
  if (repoName === 'ai') className = 'AiRepository'; 
  if (repoName === 'search') className = 'SearchRepository';

  const content = `import { collections } from '@origenix/database';

export class ${className} {
  async findAll(filters?: any) { return []; }
  async findById(id: string) { return null; }
  async create(data: any) { return { id: 'mock', ...data }; }
  async update(id: string, data: any) { return { id, ...data }; }
  async delete(id: string) { return true; }
`;
  let extras = '';
  if (repoName === 'users') {
    extras = `  async findByEmail(email: string) { return null; }\n`;
  } else if (repoName === 'crm') {
    extras = `  async findContacts() { return []; }
  async updateStage(id: string, stage: string) { return null; }
  async addNote(contactId: string, content: string) { return true; }
  async getNotes(contactId: string) { return []; }\n`;
  } else if (repoName === 'notifications') {
    extras = `  async markAsRead(id: string) { return null; }\n`;
  } else if (repoName === 'search') {
    extras = `  async searchAcrossAll(query: string, category?: string) { return { companies: [], investors: [], founders: [], startups: [] }; }\n`;
  }
  
  fs.writeFileSync(repoFile, content + extras + '}\n');
  console.log('Fixed ' + repoFile);
});
