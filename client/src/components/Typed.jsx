// NpmTyped.js
import React from 'react';

const NpmTyped = () => {
  const commands = [
    { cmd: 'npm init', desc: 'Initialize a new project' },
    { cmd: 'npm install <package>', desc: 'Install a package locally' },
    { cmd: 'npm uninstall <package>', desc: 'Uninstall a package' },
    { cmd: 'npm run <script>', desc: 'Run a script from package.json' },
    { cmd: 'npm install -g <package>', desc: 'Install a package globally' },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">NPM Commands</h1>
      <div className="w-11/12 md:w-8/12 lg:w-6/12">
        {commands.map((command, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 mb-4 border-l-4 border-blue-500"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {command.cmd}
            </h2>
            <p className="text-gray-600">{command.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NpmTyped;
