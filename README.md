# ManyWho UI HTML5

The HTML5 framework bundles the ui-core & ui-bootstrap to render [ManyWho](https://manywho.com) Flows in the browser. The framework is built upon some standard 
front end technologies including:

| Library ||
| ---- | --- |
| [React](https://facebook.github.io/react/) | Rendering of the various UI components & containers |
| [Bootstrap](https://getbootstrap.com/) | Styling and some component behavior e.g. tabs |
| [Bootswatch](https://bootswatch.com/) | Themes |
| [LogLevel](https://github.com/pimterry/loglevel) | Logging |
| [Moment](https://momentjs.com/) | Date & Time manipulation |
| [Numbro](https://numbrojs.com/) | Number formatting |
| [Socket.io](http://socket.io/) | Real-time collaboration |

## Usage

### Building

To build the HTML5 player you will need to have [nodejs](http://nodejs.org/), [gulp](http://gulpjs.com/) and [typings](https://github.com/typings/typings) installed.

Install Dependecies:

```
npm install
cd ../ui-core
npm install
cd ../ui-bootstrap
npm install
```

### Running

You will need to start the watchers in the `ui-core` & `ui-bootstrap` directories with:


ui-core:
```
npm start -- --env.build="../ui-html5/build"
```
ui-bootstrap
```
npm start
```
or to start ui-core, ui-bootstrap and ui-html5 and watch for changes
```
npm run dev
```


Alternatively if you don't require the UI to listen for changes to the assets but want to build them you can run:
```
npm run build
```

You can start the dev server alone by running:

```
npm start
```

This will auto refresh the browser when any changes are made to the static resource files (JS, CSS, HTML, etc).

You can then initialize a Flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&flow-id=<flow-id>&flow-version-id=<flow-version-id>
```

Or join a Flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&join=<state-id>
```

If you don't have a State ID you can get it entering `manywho.state.getState().id` in the browser console once the Flow is running.

## Contributing

Contributions are welcome to the project - whether they are feature requests, improvements or bug fixes! Refer to 
[CONTRIBUTING.md](CONTRIBUTING.md) for our contribution requirements.

## License

The UI framework is released under our shared source license: https://manywho.com/sharedsource
