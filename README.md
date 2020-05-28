# contestant_client
Пуснете powershell с администраторски права (въведете powershell в windows търсачката и натиснете ctrl+shift+enter или десен бутон `run as administrator`). След това извикайте следната команда, за да свалите скрипта, който ще конфигурира системата:

```
powershell -command "& { (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/pppepito86/contestant_client/master/scripts/block_internet.cmd', 'block_internet.cmd') }"
```
За да подготвите системата за състезанието изпълнете следната команда. След това запазете файла C:\rules.wfw.
```
block_internet.cmd block
```
Проверете дали запазания файл rules.wfw се намира в C:\rules.wfw. За да върнете оригиналното състояние на системата: 
```
block_internet.cmd unblock
```
