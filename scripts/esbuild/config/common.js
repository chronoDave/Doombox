module.exports = options => ({
  bundle: true,
  minify: !options.dev,
  keepNames: options.dev,
  sourcemap: !!options.w,
  define: {
    'process.env.NODE_ENV': options.w ?
      '"development"' :
      '"production"',
    'process.env.DOM': options.dev ?
      '"development"' :
      '"production"'
  }
});
