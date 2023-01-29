export default (name: string) => console.log(
  `${name}`,
  `${Math.round(process.memoryUsage.rss() / 1024 / 1024)} MB`
);
