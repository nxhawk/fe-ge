import type { Framework } from '~/types/template';

interface FrameworkSelectorProps {
  frameworks: Framework[];
}

export function FrameworkSelector({ frameworks }: FrameworkSelectorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-2 mb-2">
        {/* <Code2 className="text-blue-500" size={24} /> */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Công nghệ sử dụng</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Các framework/library mà template này sử dụng</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <button
            className={`p-4 rounded-xl border-2 transition-all ${'border-blue-500 bg-blue-50 dark:bg-blue-900/20'}`}
          >
            <div className="flex items-center justify-center mb-3">
              <img src={fw.logo} alt={fw.name} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{fw.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{fw.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
