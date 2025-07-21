import { Edit2, Trash2, Github, Video } from 'lucide-react';
import type { Template } from 'types/template';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onEdit, onDelete }: TemplateCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      <img
        // src={`/api/image-proxy?url=${encodeURIComponent(template.backgroundImage)}`}
        src={'/placeholder.svg'}
        alt="Ảnh"
        className="h-48 bg-cover bg-center w-full"
      />

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white mr-2">{template.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(template)}
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 bg-transparent rounded-full"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(template.id)}
              className="text-gray-400 hover:text-red-400 transition-colors duration-200 bg-transparent rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <a
          href={template.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
        >
          <Github className="h-4 w-4 mr-1" />
          View Source Code
        </a>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300">Features:</h4>
          <ul className="mt-2 space-y-2">
            {template.features.map((feature) => (
              <li key={feature.id} className="text-sm text-gray-400">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-300">{feature.name}</span>
                  </div>
                  {feature.videoUrl && (
                    <a
                      href={feature.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      <Video className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {feature.isDefault && (
                  <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-900 text-indigo-200">
                    Default
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
