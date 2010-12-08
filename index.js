//logger

var parse = require('style/error').parseError
  , style = require('style')
  , inspect = require('inspect')
module.exports = log

var currFunction = null;
var currFile = null;


function log(m){
  var err = new Error()
  var l = Error.stackTraceLimit
  Error.stackTraceLimit = 1
  var trace = Error.captureStackTrace(err, arguments.callee)
  Error.stackTraceLimit = l

  var ln = parse(err).stack[1]

  var location = ''

  if(currFile != ln.file || currFunction != ln.function){
    currFile = ln.file
    var s = currFile.replace(process.ENV.PWD,'.')

    currFunction = ln.function
    location = style(s).blue + ' - ' + style(currFunction).green
  }
  if(location)
    console.log(location)
    
  var p = [] 
  for (i in arguments){
    var l 
    if('string' === typeof arguments[i])
      l = arguments[i]
    else 
      l = inspect(arguments[i])
    p.push(l)
  }
  //if(p.length)
  console.log.apply(null,p)
}
