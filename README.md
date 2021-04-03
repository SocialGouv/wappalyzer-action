# wappalyser-action

Run a [Wappalyser](https://github.com/AliasIO/wappalyzer) scan and report results as JSON.

## Usage

```yaml
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: "socialgouv/wappalyser-action@master"
        with:
          url: http://www.free.fr
          output: report.json
```
