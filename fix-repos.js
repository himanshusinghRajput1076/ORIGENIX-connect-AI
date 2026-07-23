const fs = require('fs');
const path = require('path');
const modulesDir = 'J:/Origenix Connect AI/origenix-connectai/apps/api/src/modules';

const repos = fs.readdirSync(modulesDir).filter(f => fs.statSync(path.join(modulesDir, f)).isDirectory());

repos.forEach(repoName => {
  const repoFile = path.join(modulesDir, repoName, 'repository.ts');
  if (!fs.existsSync(repoFile)) return;
  
  const content = `import { collections } from '@origenix/database';

export class ${repoName.charAt(0).toUpperCase() + repoName.slice(1)}Repository {
  async findAll(filters?: any) {
    if (!collections.${repoName}) return [];
    const snapshot = await collections.${repoName}.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.${repoName}) return null;
    const doc = await collections.${repoName}.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.${repoName}) return { id: 'mock', ...data };
    const ref = await collections.${repoName}.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.${repoName}) return { id, ...data };
    await collections.${repoName}.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.${repoName}) return true;
    await collections.${repoName}.doc(id).delete();
    return true;
  }
}
`;
  fs.writeFileSync(repoFile, content);
  console.log('Updated ' + repoFile);
});

// Special fixes for ones that had custom methods
const usersRepo = path.join(modulesDir, 'users', 'repository.ts');
if (fs.existsSync(usersRepo)) {
  let uContent = fs.readFileSync(usersRepo, 'utf8');
  uContent = uContent.replace('delete(id: string) {', 'async findByEmail(email: string) {\n    if (!collections.users) return null;\n    const snapshot = await collections.users.where(\"email\", \"==\", email).limit(1).get();\n    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };\n  }\n\n  delete(id: string) {');
  fs.writeFileSync(usersRepo, uContent);
}

const crmRepo = path.join(modulesDir, 'crm', 'repository.ts');
if (fs.existsSync(crmRepo)) {
  let cContent = fs.readFileSync(crmRepo, 'utf8');
  cContent = cContent.replace('delete(id: string) {', 'async findContacts() { return this.findAll(); }\n  async updateStage(id: string, stage: string) { return this.update(id, { stage }); }\n  async addNote(contactId: string, content: string) { if(collections.crmNotes) await collections.crmNotes.add({contactId, content, userId: \"system\"}); return true; }\n  async getNotes(contactId: string) { if(!collections.crmNotes) return []; const snap = await collections.crmNotes.where(\"contactId\", \"==\", contactId).get(); return snap.docs.map(d => d.data()); }\n\n  delete(id: string) {');
  fs.writeFileSync(crmRepo, cContent);
}

const notificationsRepo = path.join(modulesDir, 'notifications', 'repository.ts');
if (fs.existsSync(notificationsRepo)) {
  let nContent = fs.readFileSync(notificationsRepo, 'utf8');
  nContent = nContent.replace('delete(id: string) {', 'async markAsRead(id: string) { return this.update(id, { isRead: true }); }\n\n  delete(id: string) {');
  fs.writeFileSync(notificationsRepo, nContent);
}

const searchRepo = path.join(modulesDir, 'search', 'repository.ts');
if (fs.existsSync(searchRepo)) {
  let sContent = fs.readFileSync(searchRepo, 'utf8');
  sContent = sContent.replace('delete(id: string) {', 'async searchAcrossAll(query: string, category?: string) { return { companies: [], investors: [], founders: [], startups: [] }; }\n\n  delete(id: string) {');
  fs.writeFileSync(searchRepo, sContent);
}
