import { useSearchParams } from '@remix-run/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
import { useState } from 'react';

export const ExportChatButton = ({ exportChat }: { exportChat?: () => Promise<void> }) => {
  const [searchParams] = useSearchParams();
  const branch = searchParams.get('branch');
  const [loading, setLoading] = useState<'chat' | 'code' | null>(null);

  const handleExportChat = async () => {
    try {
      setLoading('chat');
      await exportChat?.();
    } finally {
      setLoading(null);
    }
  };

  const handleDownloadCode = async () => {
    try {
      setLoading('code');
      await workbenchStore.downloadZip(branch);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex border border-bolt-elements-borderColor rounded-md overflow-hidden mr-2 text-sm">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={classNames(
            'rounded-md items-center justify-center px-3 py-1.5 text-xs',
            'bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary',
            '[&:not(:disabled,.disabled)]:hover:bg-bolt-elements-button-primary-backgroundHover',
            '[&:is(:disabled,.disabled)]:cursor-not-allowed [&:is(:disabled,.disabled)]:opacity-60',
            'outline-accent-500 flex gap-1.7',
          )}
          disabled={loading !== null}
        >
          {loading ? (
            <span className="i-ph:spinner animate-spin" />
          ) : (
            <>
              Export
              <span className="i-ph:caret-down transition-transform" />
            </>
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className={classNames(
            'z-[250]',
            'bg-bolt-elements-background-depth-2',
            'rounded-lg shadow-lg',
            'border border-bolt-elements-borderColor',
            'animate-in fade-in-0 zoom-in-95',
            'py-1',
          )}
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className={classNames(
              'cursor-pointer flex items-center w-auto px-4 py-2 text-sm',
              'text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive',
              'gap-2 rounded-md group relative',
              ...(loading === 'code' ? ['opacity-50', 'pointer-events-none'] : []),
            )}
            onClick={handleDownloadCode}
          >
            <div className="i-ph:code size-4.5" />
            <span>Download Code</span>
            {loading === 'code' && <div className="i-ph:spinner animate-spin ml-auto size-4" />}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={classNames(
              'cursor-pointer flex items-center w-full px-4 py-2 text-sm',
              'text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive',
              'gap-2 rounded-md group relative',
              ...(loading === 'chat' ? ['opacity-50', 'pointer-events-none'] : []),
            )}
            onClick={handleExportChat}
          >
            <div className="i-ph:chat size-4.5" />
            <span>Export Chat</span>
            {loading === 'chat' && <div className="i-ph:spinner animate-spin ml-auto size-4" />}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
