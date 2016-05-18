## Setup
1. Install [nodejs](http://nodejs.org/)
2. Install gulp cli `npm install gulp -g`
3. cd into the root folder and run `npm install`

If you are running on Windows you will also need to install the following (to build socket.io):

- `npm install -g node-gyp`
- python 2.7.3 http://www.python.org/download/releases/2.7.3#download
- VS 2012 Express http://go.microsoft.com/?linkid=9816758

Then run `npm install --msvs_version=2012`

You can start the dev "server" by running `gulp refresh`, this will auto refresh the browser when any changes are made to the static resource files (js, css, html, etc).

You can then initialize a flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&flow-id=<flow-id>&flow-version-id=<flow-version-id>
```

Or join a flow with:
```
http://localhost:3000?tenant-id=<tenant-id>&join=<state-id>
```

If you don't have a state id you can get it entering `manywho.state.getState().id` in the browser console once the flow is running.