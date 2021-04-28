import * as pulumi from '@pulumi/pulumi';
import { LocalWorkspace } from '@pulumi/pulumi/automation';

import { executePipeline, Pipeline } from './pipeline';

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

const preview = false
executePipeline(pipeline, preview)
