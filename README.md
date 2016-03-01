# VoteWise

### While transitioning...
- Be sure to leave the transitioning folder in the repo. That folder is for moving the assets from the front end back into the project properly.

## Generator
https://github.com/mcfly-io/generator-mcfly

## Development Caveats.
YO SERVICE CREATOR: If you use this command you'll have to delete the AuthInterceptor service
 from the index of the directory for reasons described below under AUTHINTERCEPTOR HTTP SERVICE

AUTHINTERCEPTOR HTTP SERVICE: The Auth HTTP service must not be included in the mcfly system for registering services,
 or else it will not push its behavior onto the HTTP protocol. I merely directly required it in index.js
 under the votewise module.

X-EDITABLE: I required this value as a global variable in MAIN.JS, since it was installed with BOWER,
 for which require was not behaving in same manner as for node modules in index.js under votewise module.
 I also just took all the CSS, which wasn't much, and threw it into the votewise main.scss styles file
 to solve that importing problem.

## Development
Install ``` npm install -g generator-mcfly ``` (along with Yeoman if you don't already have it)

Here are some of the Yo commands:
```
yo mcfly:module (module)
yo mcfly:controller (modulename) (controllername)
yo mcfly:directive (modulename) (directive)
▼▼▼▼▼▼ important error note ▼▼▼▼▼▼ See Development Caveats for YO SERVICE CREATOR ▼▼▼▼▼▼
yo mcfly:service (modulename) (servicename)
▲▲▲▲▲▲ important error note ▲▲▲▲▲▲  See Development Caveats for YO SERVICE CREATOR▲▲▲▲▲▲

```

For more commands, see:
https://github.com/mcfly-io/generator-mcfly/blob/master/README.md

## Gulp Tasks
```
gulp help           # List the main gulp tasks
gulp lint           # Run lint
gulp test           # Run lint, unit tests, and e2e tests
gulp unit           # Run lint and unit tests (karma for client + mocha for server)
gulp karma          # Run karma client unit tests
gulp mocha          # Run mocha server unit tests
gulp e2e            # Run protractor for end to end tests
gulp browserify     # Generate a distribution folder using browserify
gulp webpack:run    # Generate a distribution folder using webpack
gulp style          # Generate a main.css file
gulp browsersync    # Creates a browser-sync server, it will display its url, it watches for js / css / scss / html file changes and inject automatically the change in the browser
gulp dist           # Distribute the application
```

## Usage


## Testing


## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/spencersnygg/votewise/releases)

## License

## Question Type Requirements


