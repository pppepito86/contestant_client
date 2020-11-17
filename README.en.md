# BEFORE THE COMPETITION
Run command prompt with administrator privilleges. Press the `start` button and type `cmd`. Go to `Command Prompt` right click and select `Run as administrator` as shown on the picture.

![Cmd1](https://github.com/pppepito86/contestant_client/raw/master/scripts/cmd1.png)

When the window shown below opens and asks if you agree to make changes to your device choose `Yes`.

![Cmd2](https://github.com/pppepito86/contestant_client/raw/master/scripts/cmd2.png)

After the command prompt opens you can download the script that will configure your system. In order to download run the following command:
```
powershell -command "& { (New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/pppepito86/contestant_client/master/scripts/block_internet.cmd', 'block_internet.cmd') }"
```
In order to prepare the system for the olympiad execute the following command:
```
block_internet.cmd block
```
After the execution of the commmand the system should be prepared. You can check that there is no internet access, for example [google](https://google.com) should not be accessible. There should be only access to the competition system. You can open the competition system [here](http://18.158.226.30/) and login with the following credentials - test / test

# AFTER THE COMPETITION
In order to restore the original state of your system open the command prompt and execute the following command: 
```
block_internet.cmd unblock
```
