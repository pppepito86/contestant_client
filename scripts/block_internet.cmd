@echo off

if "%1"=="block" (
	if exist "C:\Windows\System32\drivers\etc\rules.wfw" (
		echo alredy blocked
	) else (
		echo blocking
		netsh advfirewall export "C:\Windows\System32\drivers\etc\rules.wfw"
		netsh advfirewall firewall set rule all new enable=no
		netsh advfirewall firewall set rule group="Core Networking" new enable=yes
		netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
		netsh advfirewall firewall add rule name="AllowDNS" program="%SystemRoot%\system32\svchost.exe" dir=out action=allow protocol=UDP remoteport=53
		netsh advfirewall firewall add rule name="AllowIP1" dir=out action=allow remoteip=3.64.93.33
		netsh advfirewall firewall add rule name="AllowIP2" dir=out action=allow remoteip=3.121.57.200
		netsh advfirewall firewall add rule name="AllowIP3" dir=out action=allow remoteip=3.64.156.83
		netsh advfirewall firewall add rule name="AllowIP4" dir=out action=allow remoteip=3.69.12.158
	)
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
			netsh advfirewall firewall del rule name="AllowIP1"
			netsh advfirewall firewall del rule name="AllowIP2"
			netsh advfirewall firewall del rule name="AllowIP3"
			netsh advfirewall firewall del rule name="AllowIP4"
			netsh advfirewall firewall set rule all new enable=yes
		)
	) else (
		echo Call 'block_internet.cmd [block^|unblock]'
	)
)
