// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

// Find all TypeScript files in 'src', excluding declaration files.
const entryPoints = globSync('src/**/*.ts', {
  ignore: ['src/**/*.d.ts', 'src/**/__tests__/**'], // Ignore declaration files and all __tests__ folders
});

export default {
  input: entryPoints,
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'named',
      // Preserve the original module structure.
      preserveModules: true,
      // Set 'src' as the root. This strips 'src/' from the output path.
      // e.g., 'src/configs/main.ts' becomes 'dist/configs/main.cjs'
      preserveModulesRoot: 'src',
    },
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
      // Ensure declaration files also respect the directory structure.
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
    terser(),
    copy({
      targets: [
        { src: 'src/tsconfig-base.json', dest: 'dist' },
        { src: 'src/markdownlint.json', dest: 'dist' },
      ],
    }),
  ],
};
