const Wappalyzer = require("wappalyzer");

const options = {
  debug: false,
  delay: 1000,
  headers: {},
  maxDepth: 1,
  maxUrls: 10,
  maxWait: 10000,
  recursive: true,
  probe: true,
  userAgent: "Wappalyzer",
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
  noRedirect: true
};

const scan = async (url) => {
  const wappalyzer = new Wappalyzer(options);

  try {
    await wappalyzer.init();

    const headers = {};

    const site = await wappalyzer.open(url, headers);

    site.on("error", console.error);

    const results = await site.analyze();

    await wappalyzer.destroy();

    return results;
  } catch (error) {
    await wappalyzer.destroy();
    console.error(error);
  }
};

if (require.main === module) {
  const url = process.argv[process.argv.length - 1];
  scan(url)
    .then((d) => console.log(JSON.stringify(d)))
    .catch(console.log);
}

module.exports = scan;
