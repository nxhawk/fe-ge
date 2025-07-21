import React, { useState } from 'react';
import { Plus, Trash2, Video } from 'lucide-react';
import type { TemplateFeature } from '~/types/template';

interface TemplateFormProps {
  onSubmit: (data: { name: string; backgroundImage: string; githubUrl: string; features: TemplateFeature[] }) => void;
  initialData?: {
    name: string;
    backgroundImage: string;
    githubUrl: string;
    features: TemplateFeature[];
  };
}

export function TemplateForm({ onSubmit, initialData }: TemplateFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [backgroundImage, setBackgroundImage] = useState(initialData?.backgroundImage ?? '');
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl ?? '');
  const [features, setFeatures] = useState<TemplateFeature[]>(initialData?.features ?? []);

  const addFeature = () => {
    setFeatures([
      ...features,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        isDefault: false,
      },
    ]);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const updateFeature = (id: string, updates: Partial<TemplateFeature>) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, backgroundImage, githubUrl, features });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Background Image URL</label>
        <input
          type="url"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">GitHub Repository URL</label>
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-300">Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </button>
        </div>

        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="p-4 bg-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  value={feature.name}
                  onChange={(e) => updateFeature(feature.id, { name: e.target.value })}
                  placeholder="Feature name"
                  className="block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFeature(feature.id)}
                  className="ml-2 text-red-400 hover:text-red-300 transition-colors duration-200 bg-transparent rounded-full p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <textarea
                value={feature.description}
                onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                rows={4}
                placeholder="Feature description"
                className="block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
                required
              />

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={feature.isDefault}
                    onChange={(e) => updateFeature(feature.id, { isDefault: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-gray-600 border-gray-500 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-300">Default Feature</label>
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="url"
                      value={feature.videoUrl || ''}
                      onChange={(e) => updateFeature(feature.id, { videoUrl: e.target.value })}
                      placeholder="Demo video URL (optional)"
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
        >
          Save Template
        </button>
      </div>
    </form>
  );
}
