import { foo } from './foo'
import { bar } from './bar'

const sdk: any = {
  hello: foo,
  name: 'sdk',
  pro: new Promise((resolve) => { resolve('res') })
}

export { sdk, bar }
