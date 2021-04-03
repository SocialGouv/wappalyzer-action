const Wappalyzer = require("wappalyzer");

const options = {
  debug: true,
  delay: 1000,
  headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 10000,
  recursive: true,
  probe: true,
  userAgent: "Wappalyzer",
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
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
  scan("http://www.free.fr").then(console.log).catch(console.log);
}

module.exports = scan;
