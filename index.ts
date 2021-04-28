import * as pulumi from "@pulumi/pulumi"
import { LocalWorkspace } from "@pulumi/pulumi/automation"

console.log('foo')

async function main() {
  const temp = await LocalWorkspace.createOrSelectStack({
    stackName: 'dev',
    workDir: `${__dirname}/sub-a`
  })

  const x = await temp.up()
  console.log('completed')
  console.log(`x.stdout: ${x.stdout}`)
  console.log(x.outputs)
}

main()
