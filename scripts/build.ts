import { execSync } from 'child_process'
import consola from 'consola'

execSync('pnpm prebuild-vue', { stdio: 'inherit' })
execSync('pnpm prebuild-react', { stdio: 'inherit' })
execSync('NODE_ENV=production pnpx vite build', { stdio: 'inherit' })

const name = 'vite-srs-player'

consola.success(`Builded @sondh0127/${name}`)
