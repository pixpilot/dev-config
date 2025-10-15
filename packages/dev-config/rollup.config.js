import rollupConfig from '@internal/rollup-config';

export default rollupConfig({
  minify: false,
  multiEntry: true,
  copy: {
    targets: [
      { src: 'src/tsconfig-base.json', dest: 'dist' },
      { src: 'src/markdownlint.json', dest: 'dist' },
    ],
  },
});
