import { useState } from 'react';
import { FeatureCard } from './FeatureCard';
import type { TemplateFeature } from '~/types/template';

interface FeatureListProps {
  features: TemplateFeature[];
}

export function FeatureList({ features }: FeatureListProps) {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Các Tính Năng Được Hỗ Trợ Bởi Template</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Danh sách những chức năng mà template hiện tại cung cấp, giúp người dùng dễ dàng hình dung các khả năng mà
        website sẽ có sau khi khởi tạo từ template này
      </p>

      <div className="space-y-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isPreviewActive={activePreview === feature.id}
            onPreviewToggle={() => setActivePreview(activePreview === feature.id ? null : feature.id)}
          />
        ))}
      </div>
    </div>
  );
}
