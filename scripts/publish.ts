import { execSync } from 'child_process'
import path from 'path'
// import { activePackages } from '../meta/packages'
import consola from 'consola'

execSync('npm run build', { stdio: 'inherit' })

const name = 'vite-srs-player'
// for (const { name } of activePackages) {
execSync('pnpm publish --access public', {
	stdio: 'inherit',
	// cwd: path.join('packages', name, 'dist'),
})
consola.success(`Published @sondh0127/${name}`)
// }
