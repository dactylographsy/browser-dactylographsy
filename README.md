# browser-dactylographsy

[![Build Status](https://travis-ci.org/dactylographsy/browser-dactylographsy.svg?branch=master)](https://travis-ci.org/dactylographsy/browser-dactylographsy) ♦️
[![Dependency Status](https://david-dm.org/dactylographsy/browser-dactylographsy.svg?style=flat)](https://david-dm.org/dactylographsy/browser-dactylographsy) ♦️
[![devDependency Status](https://david-dm.org/dactylographsy/browser-dactylographsy/dev-status.svg)](https://david-dm.org/dactylographsy/browser-dactylographsy#info=devDependencies) ♦️
[![Bower version](https://badge.fury.io/bo/dactylographsy.svg)](http://badge.fury.io/bo/dactylographsy)

> Front end components for consuming manifests produced by grunt-dactylographsy.

## The Idea & Concepts

Complex web applications usually consist of various assets being served from one or multiple hosts. This slows down the user experience while normal browser caching usually is not able to tackle all the resulting load retardations.

Imagine JavaScript und CSS files being cached in the client via localstorage by their fingerprints making the application load instantly while new versions are automatically swapped (cache invalidation) in the background during runtime of the application is running - resulting in an updated application after a refresh.

With dactylographsy every unit of an application can create a custom manifest listing all assets it consists of. These assets will be injected into the page while their contents will be cached when they are once loaded. After the cache is filled it serves all files on any subsequent page load to speed up the initial load time. As mentioned, the caches might be invalidated at runtime by making a comparison between old and eventually new manifest(s).

![Architecture Overview](https://raw.githubusercontent.com/dactylographsy/browser-dactylographsy/master/docs/overview.png)

A running example can be found [here](https://github.com/dactylographsy/browser-dactylographsy/blob/master/example).

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

### Install via bower

```shell
bower dactylographsy --save
```

## The client-side application

### Embedding as `<script />`-tag

```html
<script
  id="dactylographsy"
  charset="utf-8"
  src="../dist/dactylographsy.js"
  data-config='{"order":["vertical-1", "vertical-2"], "ttl": 1, "appPrefix": "example", "refreshDelay": 1000, "enableLogging": true}'
  data-manifests='["vertical-1/dactylographsy.json", "vertical-2/dactylographsy.json"]'>
</script>
```

More examples can be found in `/examples`.

### Options

```js
// Manifests in order of which their assets will be injected
order: []
// Time to live when exceeded causes whole cache (local storage) to be flushed
ttl: null
// Prefix for the application prepended to all assets' paths
appPrefix: null
// Delay in ms when exceeded performs reqeusts to check if assets are outdated
refreshDelay: null
// Delay in ms when exceeded performing caching requests to assets as XHRs
cacheDelay: null
// Boolean indicating if manifests shall be cached - if false app always resolves to
// current version but slows down launch
cacheManifests: true
// Enable logging as opt-in giving output of what dactylographsy is doing
enableLogging: false
```

## Developing & Contributing

### Install npm dependencies

```bash
npm install
```

Developing on the task alone is fairly easy just `git clone https://github.com/dactylographsy/browser-dactylographsy.git` then `cd browser-dactylographsy`. Now just work the `src/**.js` run tests with `grunt karma:local` and check results - feel free to submit a pull-request!

## Release History

- 1.13.0/1.0.0 Initial release after migrating sources from `grunt-dactylographsy`
- 1.0.1 Fix typo in when logging
- 1.0.2 Update major set of dependencies among them babel@6.0.x
- 1.0.3 Reduce amount of polyfills to just es6-promises

## Acknowledgements

- ...to [BrowerStack](https://browerstack.com) for supporting this project with their awesome services for free!
- ...to great people around me supporting me with ideas and feedback!
