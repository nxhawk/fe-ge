import { Link } from '@remix-run/react';
import { Card, CardContent } from '~/components/ui/Card';

interface TemplateCardProps {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
}

export function TemplateCard({ title, description, image, href }: TemplateCardProps) {
  return (
    <Link to={href}>
      <Card className="overflow-hidden border-gray-800 bg-gray-900 transition-all hover:border-gray-700 hover:bg-gray-800/50">
        <div className="aspect-video relative hover:scale-105 transition-transform">
          <img src={image} alt={title} className="object-cover w-full h-full" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mt-2">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
