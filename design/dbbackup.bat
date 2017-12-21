@echo off
set dt=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%
set /a month=%date:~5,2%
set /a lastMonth=(%date:~5,2%-1+11)%%12+1
set day=%date:~8,2%
echo %dt% 
echo %month%
echo %lastMonth%
echo %day%
echo "d:\%lastMonth%月"
if "%day%"=="01" (rd /s/q "d:\%lastMonth%月")
md d:\%month%月
cd "C:\Program Files\MySQL\MySQL Server 5.7\bin"
mysqldump -uroot -proot collection > d:\%month%月\db_%dt%.sql
pause