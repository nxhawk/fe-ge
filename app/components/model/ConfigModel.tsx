import { useState } from 'react';
import type { IConfigModel } from '~/types/model';

const ConfigModel = ({ name, description, apiKey = '', isDefault = false, placeholder = '...' }: IConfigModel) => {
  const [checked, setChecked] = useState(isDefault);
  const [key, setKey] = useState(apiKey);

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm border-gray-300 dark:border-gray-800 bg-[#F5F5F5] dark:bg-[#252525] text-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl text-bolt-elements-textPrimary dark:text-white font-semibold leading-none tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-bolt-elements-textPrimary dark:text-white"
              htmlFor="openai-api-key"
            >
              API Key
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 border-gray-700 text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary"
              id="openai-api-key"
              placeholder={placeholder}
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="switch"
              aria-checked={checked}
              data-state={checked ? 'checked' : 'unchecked'}
              value="on"
              onClick={() => setChecked((prev) => !prev)}
              className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple data-[state=unchecked]:bg-gray-600"
              id="openai-default"
            >
              <span
                data-state={checked ? 'checked' : 'unchecked'}
                className="pointer-events-none block h-5 w-5 rounded-full bg-black shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
              ></span>
            </button>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-bolt-elements-textPrimary dark:text-white"
              htmlFor="openai-default"
            >
              Set as default provider
            </label>
          </div>
        </div>
      </div>
      <div className="items-center p-6 pt-0 flex justify-between">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input border-gray-700 bg-black hover:bg-gray-900 hover:text-accent-foreground h-10 px-4 py-2">
          Learn More
        </button>
        <button className="text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple hover:bg-purple/90 h-10 px-4 py-2">
          Save
        </button>
      </div>
    </div>
  );
};

export default ConfigModel;
