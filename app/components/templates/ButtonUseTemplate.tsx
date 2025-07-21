import { useChatHistory } from '~/lib/persistence';
import { classNames } from '~/utils/classNames';
import type { Message } from 'ai';
// eslint-disable-next-line no-restricted-imports
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { useGit } from '~/lib/hooks/useGit';
import { useState } from 'react';
import ignore from 'ignore';
import { createCommandsMessage, detectProjectCommands, escapeBoltTags } from '~/utils/projectCommands';
import { generateId } from '~/utils/fileUtils';

const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  '.github/**',
  '.vscode/**',
  'dist/**',
  'build/**',
  '.next/**',
  'coverage/**',
  '.cache/**',
  '.idea/**',
  '**/*.log',
  '**/.DS_Store',
  '**/npm-debug.log*',
  '**/yarn-debug.log*',
  '**/yarn-error.log*',
  '**/*lock.json',
  '**/*lock.yaml',
];

const ig = ignore().add(IGNORE_PATTERNS);

const MAX_FILE_SIZE = 100 * 1024; // 100KB limit per file
const MAX_TOTAL_SIZE = 500 * 1024; // 500KB total limit

interface ButtonUseTemplateProps {
  githubUrl: string;
}

const ButtonUseTemplate = ({ githubUrl }: ButtonUseTemplateProps) => {
  

//   const handleClone = async () => {
//     if (!ready) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const { workdir, data } = await gitClone(githubUrl);

//       if (importChat) {
//         const filePaths = Object.keys(data).filter((filePath) => filePath === '.env' || !ig.ignores(filePath));
//         const textDecoder = new TextDecoder('utf-8');

//         let totalSize = 0;
//         const skippedFiles: string[] = [];
//         const fileContents = [];

//         for (const filePath of filePaths) {
//           const { data: content, encoding } = data[filePath];

//           // Skip binary files
//           if (
//             content instanceof Uint8Array &&
//             !filePath.match(/\.(txt|md|js|jsx|ts|tsx|json|html|css|scss|less|yml|yaml|xml|svg|png|jpg|env)$/i)
//           ) {
//             skippedFiles.push(filePath);
//             continue;
//           }

//           try {
//             const textContent =
//               encoding === 'utf8' ? content : content instanceof Uint8Array ? textDecoder.decode(content) : '';

//             if (!textContent) {
//               continue;
//             }

//             // Check file size
//             const fileSize = new TextEncoder().encode(textContent).length;

//             if (fileSize > MAX_FILE_SIZE) {
//               skippedFiles.push(`${filePath} (too large: ${Math.round(fileSize / 1024)}KB)`);
//               continue;
//             }

//             // Check total size
//             if (totalSize + fileSize > MAX_TOTAL_SIZE) {
//               skippedFiles.push(`${filePath} (would exceed total size limit)`);
//               continue;
//             }

//             totalSize += fileSize;
//             fileContents.push({
//               path: filePath,
//               content: textContent,
//             });
//           } catch (e: any) {
//             skippedFiles.push(`${filePath} (error: ${e.message})`);
//           }
//         }

//         const commands = await detectProjectCommands(fileContents);
//         const commandsMessage = createCommandsMessage(commands);

//         const filesMessage: Message = {
//           role: 'assistant',
//           content: `Cloning the repo ${githubUrl} into ${workdir}
// ${
//   skippedFiles.length > 0
//     ? `\nSkipped files (${skippedFiles.length}):
// ${skippedFiles.map((f) => `- ${f}`).join('\n')}`
//     : ''
// }

// <boltArtifact id="imported-files" title="Git Cloned Files" type="bundled">
// ${fileContents
//   .map(
//     (file) =>
//       `<boltAction type="file" filePath="${file.path}">
// ${escapeBoltTags(file.content)}
// </boltAction>`,
//   )
//   .join('\n')}
// </boltArtifact>`,
//           id: generateId(),
//           createdAt: new Date(),
//         };

//         const messages = [filesMessage];

//         if (commandsMessage) {
//           messages.push(commandsMessage);
//         }

//         await importChat(`Git Project:${githubUrl.split('/').slice(-1)[0]}`, messages);
//       }
//     } catch (error) {
//       console.error('Error during import:', error);
//       toast.error('Failed to import repository');
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Button
      title="Clone a Git Repo"
      variant="outline"
      size="lg"
      className={classNames(
        'gap-2 bg-[#F5F5F5] dark:bg-[#252525] w-full',
        'text-bolt-elements-textPrimary dark:text-white',
        'hover:bg-[#E5E5E5] dark:hover:bg-[#333333]',
        'border-[#E5E5E5] dark:border-[#333333]',
        'h-10 px-4 py-2 min-w-[120px] justify-center',
        'transition-all duration-200 ease-in-out',
      )}
      // onClick={handleClone}
    >
      Use This Template
    </Button>
  );
};

export default ButtonUseTemplate;
