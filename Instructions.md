
# Running site for development when using Windows

Some of the html used in this project have features that MUST be run from a web server rather than from the file system.  You can use any web server and do it your own way.

This is how we do it. We use the SimpleHttpServer available in Python 2.7.  We only need to serve static files.

There are a couple command files the help.  To use these, you must first install a recent version of Python 2.7.

<a href="https://www.python.org/download/releases/2.7/" target="_blank">Python 2.7 download site</a>

Then run (just double-click):
```
  _startServer8001.cmd
```
which starts a server in the currect directory on port 8001.
This remains running in a command window.  To stop it, switch to that window and press `ctl-C` one or more times.

And to start the index.html file (just double-click):
```
  _start.cmd
```


