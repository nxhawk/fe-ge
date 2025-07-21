import { Check, ChevronDown, Lock, MonitorPlay } from 'lucide-react';
import type { TemplateFeature } from '~/types/template';
import { ClientOnly } from 'remix-utils/client-only';

interface FeatureCardProps {
  feature: TemplateFeature;
  isPreviewActive: boolean;
  onPreviewToggle: () => void;
}

export function FeatureCard({ feature, isPreviewActive, onPreviewToggle }: FeatureCardProps) {
  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-all ${
        feature.isDefault ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:border-blue-300 dark:hover:border-blue-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <button
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors bg-blue-500 text-white cursor-default`}
            >
              <Check size={14} />
            </button>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
              <span>{feature.name}</span>
              {feature.isDefault && <Lock size={16} className="text-blue-500" />}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 ml-10 leading-relaxed">{feature.description}</p>
        </div>
        <button
          onClick={onPreviewToggle}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-6 bg-transparent"
        >
          <MonitorPlay size={20} />
          <span>Xem demo</span>
          <ChevronDown size={16} className={`transform transition-transform ${isPreviewActive ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isPreviewActive && (
        <div className="mt-4 ml-10">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <ClientOnly>
              {() => (
                <video className="w-full rounded-lg aspect-video" controls autoPlay preload="auto">
                  <source src={feature.videoUrl} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              )}
            </ClientOnly>
          </div>
        </div>
      )}
    </div>
  );
}
