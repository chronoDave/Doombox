module.exports = filters => ({
  name: 'ignore',
  setup: build => filters.forEach(filter => {
    build.onResolve({ filter }, args => ({
      path: args.path,
      namespace: 'ignored'
    }));

    build.onLoad({ filter: /.*/, namespace: 'ignored' }, () => ({ contents: '' }));
  })
});
