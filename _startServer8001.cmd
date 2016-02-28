@ECHO OFF

REM Starts web server from the current directory
REM -- NOTE: Requires python 2.7

python -m SimpleHTTPServer 8001

ECHO errorlevel: %ERRORLEVEL%
IF ERRORLEVEL 1 GOTO FAILED
GOTO EOF

:FAILED
ECHO ### Failed to start the python SimpleHTTPServer
ECHO ### You may need to install python 2.7
ECHO. 
PAUSE
