import * as pulumi from '@pulumi/pulumi';

export interface Ware2GoStack {
  directory: string;
  runOnHotfix: boolean;
}

async function runPipeline(stacks: Ware2GoStack[], hotfix: boolean, environment: string) {
  console.log(stacks);

  const stacksToRun = await Promise.all([
    stacks
      .filter((stack) => !hotfix || stack.runOnHotfix)
      .map((s) =>
        pulumi.automation.LocalWorkspace.createOrSelectStack({
          stackName: 'dev', // Should be environment
          workDir: s.directory,
        }),
      ),
  ]);

  console.log(stacksToRun);
}

export const pipeline = runPipeline;
