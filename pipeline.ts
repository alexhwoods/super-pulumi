import * as pulumi from '@pulumi/pulumi';

export interface Ware2GoStack {
  directory: string;
  runOnHotfix: boolean;
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
export async function runPipeline(stacks: Ware2GoStack[], hotfix: boolean, environment: string) {
  const stacksToRun = 
    stacks
      .filter((stack) => !hotfix || stack.runOnHotfix)
      .map((s) =>
        pulumi.automation.LocalWorkspace.createOrSelectStack({
          stackName: environment,
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
