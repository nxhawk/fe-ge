import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Header } from '~/components/header/Header';
import ConfigModel from '~/components/model/ConfigModel';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [{ title: 'FE Generator' }, { name: 'description', content: 'Talk with FE Generator, an AI assistant' }];
};

export async function loader(args: LoaderFunctionArgs) {
  return json({ url: args.params.url });
}

export default function Index() {
  return (
    <div className="flex flex-col w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <div className="space-y-8 my-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold dark:text-white">AI Model Integration</h1>
          <p className="text-gray-400 max-w-2xl">
            Connect your preferred AI models to enhance code generation and features
          </p>
        </div>

        {/* List model */}
        <div className="container mx-auto space-y-6">
          <ConfigModel
            name="OpenAI"
            description="Connect to OpenAI's models like GPT-4o for code generation and assistance"
            placeholder="sk-..."
          />
          <ConfigModel
            name="Anthropic"
            description="Connect to Anthropic's Claude models for natural language understanding"
            placeholder="sk_ant-..."
          />
          <ConfigModel name="Cohere" description="Connect to Cohere's models for text generation and understanding" />
        </div>
      </div>
    </div>
  );
}
