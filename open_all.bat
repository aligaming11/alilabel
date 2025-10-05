@echo off
title AliSS System
echo Opening AliSS Studio Programming System...
echo.
echo Opening Main Page...
start "" "index.html"
timeout /t 2 /nobreak >nul
echo Opening Access Page...
start "" "access.html"
timeout /t 2 /nobreak >nul
echo Opening Loading Page...
start "" "loading.html"
echo.
echo All pages opened successfully!
echo Main Page: index.html
echo Access Page: access.html
echo Loading Page: loading.html
pause