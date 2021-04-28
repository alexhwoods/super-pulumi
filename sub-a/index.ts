import * as pulumi from '@pulumi/pulumi';
import * as random from '@pulumi/random';

new random.RandomString('monkey', { length: 15 });
