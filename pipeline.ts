import * as pulumi from '@pulumi/pulumi';

export interface Stack {
  directory: string;
  runOnHotfix: boolean;
}

export interface Pipeline {
  stacks: Stack[];
  hotfix: boolean;
  environment: string;
}

export async function runPipeline(pipeline: Pipeline) {
  const stacksToRun = pipeline.stacks
    .filter((stack) => !pipeline.hotfix || stack.runOnHotfix)
    .map((s) =>
      pulumi.automation.LocalWorkspace.createOrSelectStack({
        stackName: pipeline.environment,
        workDir: s.directory,
      }),
    );

  const resolvedStacks = await Promise.all(stacksToRun);

  const executions: Promise<pulumi.automation.UpResult>[] = resolvedStacks.map(async (s) => {
    const result = await s.up();

    console.log(result.stdout);

    return result;
  });

  await Promise.all(executions);
}

export async function previewPipeline(pipeline: Pipeline) {
  const stacksToRun = pipeline.stacks
    .filter((stack) => !pipeline.hotfix || stack.runOnHotfix)
    .map((s) =>
      pulumi.automation.LocalWorkspace.createOrSelectStack({
        stackName: pipeline.environment,
        workDir: s.directory,
      }),
    );

  const resolvedStacks = await Promise.all(stacksToRun);

  const executions: Promise<pulumi.automation.PreviewResult>[] = resolvedStacks.map(async (s) => {
    const result = await s.preview();

    console.log(result.changeSummary);

    return result;
  });

  await Promise.all(executions);
}

export async function executePipeline(pipeline: Pipeline, preview: boolean) {
  if (preview) {
    return previewPipeline(pipeline).catch(console.error);
  } else {
    return runPipeline(pipeline).catch(console.error);
  }
}
