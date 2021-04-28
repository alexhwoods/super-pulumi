import * as pulumi from "@pulumi/pulumi"
import { LocalWorkspace } from "@pulumi/pulumi/automation"

const main = async () => {
  console.log('called')
  const stack = await LocalWorkspace.createOrSelectStack({
    stackName: 'dev',
    workDir: `${__dirname}/sub-a`
  })

  console.log('called 2')

  const x = await stack.up()
  console.log('hello')
  console.log(x)
  console.log(`foo: ${x.stdout}`)
}

main()
