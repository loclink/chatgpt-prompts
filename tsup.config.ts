import { defineConfig } from 'tsup';
import { resolve } from 'path';
export default defineConfig({
  entry: ['lib/main.ts'],
  format: ['cjs'],
  target: 'node14',
  platform: 'node',
  bundle: true,
  clean: true,
  esbuildPlugins: [
    // {
    //   name: 'CopyTemplate',
    //   setup(build) {
    //     build.onEnd(() => {
    //       fs.copySync(resolve(__dirname, './lib/template'), resolve(__dirname, 'dist/template'));
    //     });
    //   }
    // }
  ]
  // dts: true,
  // watch: true,
  // treeshake: true,
});
