/* Modernizr 3.0 - Minimal secure build with only required features */
!function(window,document,undefined){
  var Modernizr = {
    _version: '3.0.0-custom',
    _prefixes: ' -webkit- -moz- -o- -ms- '.split(' '),
    _domPrefixes: 'Webkit Moz O ms'.split(' ')
  };
  
  var docElement = document.documentElement;
  var tests = {};
  
  function is(obj, type) {
    return typeof obj === type;
  }
  
  function testProps(props) {
    var i, prop;
    for (i in props) {
      prop = props[i];
      if (docElement.style[prop] !== undefined) {
        return true;
      }
    }
    return false;
  }
  
  function testPropsAll(prop) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
    var props = (prop + ' ' + Modernizr._domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
    return testProps(props);
  }
  
  tests.cssanimations = function() {
    return testPropsAll('animationName');
  };
  
  tests.csstransforms = function() {
    return testPropsAll('transform');
  };
  
  tests.csstransforms3d = function() {
    return testPropsAll('perspective');
  };
  
  tests.csstransitions = function() {
    return testPropsAll('transition');
  };
  
  tests.touch = function() {
    return 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
  };
  
  for (var feature in tests) {
    if (tests.hasOwnProperty(feature)) {
      var result = tests[feature]();
      Modernizr[feature] = result;
      docElement.className += ' ' + (result ? '' : 'no-') + feature;
    }
  }
  
  Modernizr.prefixed = function(prop) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
    var prefixes = ['', 'webkit', 'moz', 'o', 'ms'];
    var i, prefixedProp;
    
    for (i = 0; i < prefixes.length; i++) {
      prefixedProp = prefixes[i] ? prefixes[i] + ucProp : prop;
      if (docElement.style[prefixedProp] !== undefined) {
        return prefixedProp;
      }
    }
    return prop;
  };
  
  docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2');
  
  window.Modernizr = Modernizr;
}(window, document);
