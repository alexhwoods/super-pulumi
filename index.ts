import * as pulumi from "@pulumi/pulumi"
import { LocalWorkspace } from "@pulumi/pulumi/automation"

async function main() {
  const temp = await LocalWorkspace.createOrSelectStack({
    stackName: 'dev',
    workDir: `${__dirname}/sub-a`
  })


  await temp.up()
}

export default main()
