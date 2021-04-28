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

/**
 * You can similarly have a previewPipeline step
 */

/**
 *
 * TODO: This needs to be a DAG.
 *
 * That gets more complicated when you think about skipping steps though.
 * 
 * @param stacks The array of stacks to run
 * @param hotfix Is this a hotfix?
 * @param environment 
 */
export async function runPipeline(pipeline: Pipeline) {
  const stacksToRun = 
    pipeline.stacks
      .filter((stack) => !pipeline.hotfix || stack.runOnHotfix)
      .map((s) =>
        pulumi.automation.LocalWorkspace.createOrSelectStack({
          stackName: pipeline.environment,
          workDir: s.directory,
        }),
      )

  const resolvedStacks = await Promise.all(stacksToRun)

  // TODO: Log about execution order

  const executions: Promise<pulumi.automation.UpResult>[] = resolvedStacks.map(async s => {
    const result = await s.up()

    console.log(result.stdout)

    return result
  })

  Promise.all(executions)
}

export async function previewPipeline(pipeline: Pipeline) {
  const stacksToRun = 
    pipeline.stacks
      .filter((stack) => !pipeline.hotfix || stack.runOnHotfix)
      .map((s) =>
        pulumi.automation.LocalWorkspace.createOrSelectStack({
          stackName: pipeline.environment,
          workDir: s.directory,
        }),
      )

  const resolvedStacks = await Promise.all(stacksToRun)

  // TODO: Log about execution order

  const executions: Promise<pulumi.automation.PreviewResult>[] = resolvedStacks.map(async s => {
    const result = await s.preview()

    console.log(result.changeSummary)

    return result
  })

  Promise.all(executions).catch(err => { throw err })
}
