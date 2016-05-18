# ManyWHo HTML5 Player

HTML5 framework that renders [ManyWho](https://manywho.com) Flows in the browser.

## Usage

### Building

To build the HTML5 player you will need to have [nodejs](http://nodejs.org/) and [gulp](http://gulpjs.com/) installed.

Then install dependencies:

```
npm install
```

### Running

You can start the dev server by running `gulp refresh`, this will auto refresh the browser when any changes are made to the static resource files (js, css, html, etc).

You can then initialize a flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&flow-id=<flow-id>&flow-version-id=<flow-version-id>
```

Or join a flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&join=<state-id>
```

If you don't have a state id you can get it entering `manywho.state.getState().id` in the browser console once the flow is running.

## Contributing

Contribution are welcome to the project - whether they are feature requests, improvements or bug fixes! Refer to 
[CONTRIBUTING.md](CONTRIBUTING.md) for our contribution requirements.

## License

The HTML5 player is released under our shared source license: [https://manywho.com/sharedsource](https://manywho.com/sharedsource)