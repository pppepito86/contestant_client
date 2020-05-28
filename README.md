# contestant_client
Run powershell with administrator privileges(type powershell in search and press ctrl+shift+enter). Download the script with the following command:

```
PS C:\WINDOWS\system32> powershell -command "& { (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/pppepito86/contestant_client/master/scripts/block_internet.cmd', 'block_internet.cmd') }"
```
To prepare the system for the contest execute the following line and make sure you keep this file -> C:\rules.wfw:
```
PS C:\WINDOWS\system32> block_internet.cmd block
```
To revert the original state 
```
PS C:\WINDOWS\system32> block_internet.cmd unblock
```
