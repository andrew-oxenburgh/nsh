###global require process###

'use strict'

spawn = require('child_process').spawn
readline = require('readline')

rl = readline.createInterface(
  input: process.stdin
  output: process.stdout)

rl.setPrompt '>> : '

out = (str) -> process.stdout.write str

run = (args) ->
  child = spawn(args[0], args.slice(1))
  child.stdout.on 'data', (data) -> out '\n' + data
  child.stderr.on 'data', (data) -> out data + '\n'
  child.on 'error', (code) -> out 'error: ' + code + '\n'
  child.on 'close', -> rl.prompt true

out '>> '

isQuit = (input) -> ['exit', 'bye', 'quit'].indexOf(input) >= 0

quit = ->
  out '>> bye bye <<\n'
  rl.close()

rl.on 'line', (input) ->
  input = if input then input.trim() else ''
  if input
    if isQuit(input)
      quit()
      return
    else
      run input.split(/\s+/)
  rl.prompt true
