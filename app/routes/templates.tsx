import { useEffect } from 'react';
import { Header } from '~/components/header/Header';
import { TemplateCard } from '~/components/templates/TemplateCard';
import BackgroundRays from '~/components/ui/BackgroundRays';
import { useTemplateStore } from '~/store';

export default function TemplatesPage() {
  const { templates, fetchTemplates } = useTemplateStore();

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex flex-col w-full bg-bolt-elements-background-depth-1 min-h-full">
      <BackgroundRays />
      <Header />
      <div className="space-y-8 my-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold text-white">E-Commerce Templates</h1>
          <p className="text-gray-400 max-w-2xl">
            Choose from our collection of professionally designed templates for clothing e-commerce websites
          </p>
        </div>

        {/* List Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.name}
              description={
                'Choose from our collection of professionally designed templates for clothing e-commerce websites'
              }
              image={template.backgroundImage}
              href={`/templates/${template.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
