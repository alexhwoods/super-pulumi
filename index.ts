import * as pulumi from '@pulumi/pulumi';
import { LocalWorkspace } from '@pulumi/pulumi/automation';

import { runPipeline, Pipeline, previewPipeline } from './pipeline';

const pipeline: Pipeline = {
  stacks: [
    {
      directory: `${__dirname}/sub-a`,
      runOnHotfix: true,
    },
    {
      directory: `${__dirname}/sub-b`,
      runOnHotfix: false,
    },
  ],
  hotfix: false,
  environment: 'dev',
};

previewPipeline(pipeline).catch(console.error);
// runPipeline(pipeline).catch(console.error);
