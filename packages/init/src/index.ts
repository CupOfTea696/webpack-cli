import { initGenerator, modifyHelperUtil, npmPackagesExists } from '@webpack-cli/generators';

class InitCommand {
    async apply(cli): Promise<void> {
        await cli.makeCommand(
            {
                name: 'init [scaffold...]',
                alias: 'c',
                description: 'Initialize a new webpack configuration.',
                usage: '[scaffold...] [options]',
                pkg: '@webpack-cli/init',
            },
            [
                {
                    name: 'auto',
                    type: Boolean,
                    description: 'To generate default config',
                },
                {
                    name: 'force',
                    type: Boolean,
                    description: 'To force config generation',
                },
                {
                    name: 'generation-path',
                    type: String,
                    description: 'To scaffold in a specified path',
                },
            ],
            async (scaffold, options) => {
                if (scaffold && scaffold.length > 0) {
                    await npmPackagesExists(scaffold);

                    return;
                }

                modifyHelperUtil(initGenerator, null, null, options.auto, options.force, options.generationPath);
            },
        );
    }
}

export default InitCommand;
