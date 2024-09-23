module.exports = function(api) {
  api.cache(true);


  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@turing-app': './src',
        },
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],
  };
};
