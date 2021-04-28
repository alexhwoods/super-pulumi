import * as pulumi from "@pulumi/pulumi";
import * as random from '@pulumi/random';

// export default async function main() {
//   const foo = new random.RandomString('sub-a', { length: 15 });

//   foo.result.apply(console.log)


//   return {
//     result: foo.result
//   }
// }
new random.RandomString('monkey', { length: 15 });