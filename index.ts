import * as pulumi from "@pulumi/pulumi"
import { LocalWorkspace } from "@pulumi/pulumi/automation"

async function main() {
  const stack = await LocalWorkspace.createOrSelectStack({
    stackName: 'dev',
    workDir: `${__dirname}/sub-a`
  })

  try {
    const x = await stack.preview()
  } catch (err) {
    console.log(err)
  }
}

main()
