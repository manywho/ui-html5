ManyWho HTML5 Players (Pre-Release)
===================================

First thing. What's an HTML5 Player?

When you build an app on the ManyWho platform (http://manywho.com), it doesn't actually have any user interface. Yes, despite you seeing a user interface, this is not being generated by our platform directly.  The platform only describes the UI and it's up to the "player" to turn that description into something a user can actually see!  It's a bit like a content management system.  You have your content (or in our case, the app) and then you have templates that make that content look awesome.  ManyWho works in a similar way - except in our case - the templates sit on the device, not on the server.  We call these templates "players".

All of our players are share source.  You can read our shared source agreement here:

http://manywho.com/sharedsource

All that basically says is that if you want to use this code, make sure you use it with our platform.

All of the code in this project is the code that we actually use for our tooling - and it breaks out like this:

- run: the code that's used when you run your flow. This is the most important code for most customers as it's the code that allows end users to interact with your flows.

- draw: this is our designer tooling.  Yes, that's a player too! We built our point-and-click tooling using our own platform. The draw folder shows how you can embed flows into existing applications - in this case - a design tool.

- build: this is our developer tooling.  While not technically a player, it also embeds a flow (the login flow) - again, to illustrate how you can embed flows into existing applications and tools.

We'll be providing more information over time.  Please stay tuned as we develop this project out!

##Development Setup
1. Install [nodejs](http://nodejs.org/)
2. Install gulp cli `npm install gulp -g`
3. cd into the HTML5 Players folder and `npm install`

You can start the dev "server" by running `gulp refresh`, this will auto refresh the browser when any changes are made to the static resource files (js, css, html, etc)
