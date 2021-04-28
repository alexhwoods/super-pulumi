import * as pulumi from '@pulumi/pulumi';
import { LocalWorkspace } from '@pulumi/pulumi/automation';

import { Ware2GoStack, runPipeline } from './pipeline';

const stacks: Ware2GoStack[] = [
  {
    directory: `${__dirname}/sub-a`,
    runOnHotfix: true,
  },
  {
    directory: `${__dirname}/sub-b`,
    runOnHotfix: false,
  },
];

const hotfix = false;
const environment = 'dev';

runPipeline(stacks, hotfix, environment).catch(console.error);
