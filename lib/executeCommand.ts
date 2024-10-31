export async function executeCommand(command: string): Promise<string> {
  if (!command) {
    throw new Error('No command provided');
  }

  // Handle Python scripts
  if (command.startsWith('python3 .mail_064.py')) {
    return `Checking mail...\nNo new messages.\n`;
  }

  // Handle open command
  if (command.startsWith('open ')) {
    const app = command.split(' ')[1];
    try {
      await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: `xdg-open ${app}` }),
      });
      return `Opening ${app}...\n`;
    } catch (error) {
      throw new Error(`Failed to open ${app}`);
    }
  }

  // Handle import command
  if (command.startsWith('import ')) {
    const appName = command.split(' ')[1];
    return `Importing ${appName}...\nApplication imported successfully.\n`;
  }

  // Handle specific commands
  switch (command) {
    case 'node':
      return `Welcome to Node.js v18.x.x\nType ".help" for more information.\n> `;
    case 'npm':
      return `npm <command>\n\nUsage:\n  npm install\n  npm start\n  npm test\n  npm run <script>\n\nFor more information, see 'npm help'.\n`;
    case 'jq':
      return `jq - commandline JSON processor [version 1.6]\n\nUsage: jq [options] <jq filter> [file...]\n\nFor more information, see 'jq --help'.\n`;
    default:
      try {
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command }),
        });

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.output || '';
      } catch (error) {
        console.error('Command execution error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(errorMessage);
      }
  }
}