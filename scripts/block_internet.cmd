@echo off

if "%1"=="block" (
	echo blocking
	netsh advfirewall export "C:\Windows\System32\drivers\etc\rules.wfw"
	netsh advfirewall firewall set rule all new enable=no
	netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
	netsh advfirewall firewall add rule name="AllowDNS" program="%SystemRoot%\system32\svchost.exe" dir=out action=allow protocol=UDP remoteport=53
	netsh advfirewall firewall add rule name="AllowDay1" dir=out action=allow remoteip=18.158.232.212
	netsh advfirewall firewall add rule name="AllowDay2" dir=out action=allow remoteip=18.159.46.227
) else (
	if "%1"=="unblock" (
		echo unblocking
		netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound
		if exist "C:\Windows\System32\drivers\etc\rules.wfw" (
			netsh advfirewall firewall del rule all
			netsh advfirewall import "C:\Windows\System32\drivers\etc\rules.wfw"
			del /f "C:\Windows\System32\drivers\etc\rules.wfw"
		) else (
			netsh advfirewall firewall del rule name="AllowDNS"
			netsh advfirewall firewall del rule name="AllowDay1"
			netsh advfirewall firewall del rule name="AllowDay2"
			netsh advfirewall firewall set rule all new enable=yes
		)
	) else (
		echo Call 'block_internet.cmd [block^|unblock]'
	)
)
