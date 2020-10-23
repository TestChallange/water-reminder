module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          containers: './src/containers',
          components: './src/components',
          navigation: './src/navigation',
          constants: './src/constants',
          types: './src/types',
          assets: './src/assets',
        },
      },
    ],
  ],
}
