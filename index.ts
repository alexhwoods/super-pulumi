import * as pulumi from '@pulumi/pulumi';
import { LocalWorkspace } from '@pulumi/pulumi/automation';

import { Ware2GoStack, pipeline } from './pipeline';

// async function main() {
// const subA = await LocalWorkspace.createOrSelectStack({
//   stackName: 'dev',
//   workDir: `${__dirname}/sub-a`
// })

//   // const subB = await LocalWorkspace.createOrSelectStack({
//   //   stackName: 'dev',
//   //   workDir: `${__dirname}/sub-b`
//   // })

//   // console.log('Running `pulumi up` for sub-a')
//   // const a = await subA.up()
//   // console.log(a.stdout)

//   // console.log('Running `pulumi up` for sub-b')
//   // const b = await subB.up()
//   // console.log(b.stdout)

//   // pipeline

// }

// main().catch(console.error)

const stacks: Ware2GoStack[] = [
  {
    directory: `${__dirname}/sub-a`,
    runOnHotfix: true,
  },
  {
    directory: `${__dirname}/sub-b`,
    runOnHotfix: false,
  },
];

const hotfix = false;
const environment = 'dev';

export default pipeline(stacks, hotfix, environment);
