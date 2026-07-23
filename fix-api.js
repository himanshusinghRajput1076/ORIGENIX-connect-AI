const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('J:/Origenix Connect AI/origenix-connectai/apps/api/src', (filePath) => {
  if (!filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (filePath.endsWith('repository.ts')) {
    content = content.replace(
      /import\s+\{\s*PrismaClient\s*\}\s*from\s*['"]@prisma\/client['"];[\s\S]*?const\s*prisma\s*=\s*new\s*PrismaClient\(\);\s*/g,
      'import { prisma } from \'@origenix/database\';\n'
    );
  }

  if (filePath.endsWith('controller.ts')) {
    content = content.replace(/req\.params\.id(?! as string)/g, '(req.params.id as string)');
    content = content.replace(/req\.query(?! as any)/g, '(req.query as any)');
  }

  if (filePath.endsWith('router.ts') || filePath.endsWith('routes.ts')) {
    content = content.replace(/const\s+router\s*=\s*Router\(\);/g, 'const router: Router = Router();');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
});
