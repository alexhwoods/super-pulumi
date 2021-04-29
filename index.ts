import * as pulumi from "@pulumi/pulumi"
import { LocalWorkspace } from "@pulumi/pulumi/automation"

async function main() {
  const stack = await LocalWorkspace.createOrSelectStack({
    stackName: 'dev',
    workDir: `${__dirname}/sub-a`
  })

  await stack.preview()
}

main().catch(console.error)
