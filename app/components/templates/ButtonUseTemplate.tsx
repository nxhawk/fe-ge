import { useChatHistory } from '~/lib/persistence';
import { classNames } from '~/utils/classNames';
import type { Message } from 'ai';
import { Button } from '~/components/ui/Button';
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
  const { importChat } = useChatHistory();
  const { ready, gitClone } = useGit();
  const [loading, setLoading] = useState(false);


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
      disabled={!ready || loading}
    >
      Use This Template
    </Button>
  );
};

export default ButtonUseTemplate;
