# ПРЕДИ СЪСТЕЗАНИЕТО
Пуснете конзала с администраторски права. Натиснете `start` бутона и в търсачката напишете `cmd`. Отидете на `Command Prompt` дайте десен бутон `run as administrator`, както е показано на картинката.

![Cmd1](https://github.com/pppepito86/contestant_client/raw/master/scripts/cmd1.png)

Когато се покаже долния прозорец и ви попита дали сте съгласни да правите промени по системата изберете `Yes`.

![Cmd2](https://github.com/pppepito86/contestant_client/raw/master/scripts/cmd2.png)

След като конзолата е отворена изпълнете следната команда, за да свалите скрипта, който ще конфигурира системата:
```
powershell -command "& { (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/pppepito86/contestant_client/master/scripts/block_internet.cmd', 'block_internet.cmd') }"
```
За да подготвите системата за състезанието изпълнете следната команда. След това запазете файла C:\rules.wfw.
```
block_internet.cmd block
```
След изпълнението на командата системата трябва да е готова за състезанието. Проверете, че няма достъп до интернет, например [https://google.org](https://google.org) не трябва да е достъпен. Трябва да има достъп само до един сайт - [https://pesho.org](https://pesho.org).

# СЛЕД СЪСТЕЗАНИЕТО
Проверете дали запазания файл rules.wfw се намира в C:\rules.wfw. За да върнете оригиналното състояние на системата: 
```
block_internet.cmd unblock
```
