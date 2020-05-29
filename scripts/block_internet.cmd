@echo off

if "%1"=="block" (
	echo blocking
	netsh advfirewall export "C:\Windows\System32\drivers\etc\rules.wfw"
	netsh advfirewall firewall set rule all new enable=no
	netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
	netsh advfirewall firewall add rule name="AllowDNS" program="%SystemRoot%\system32\svchost.exe" dir=out action=allow protocol=UDP remoteport=53
	netsh advfirewall firewall add rule name="AllowPeshoorg" dir=out action=allow remoteip=85.130.26.176	
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
			netsh advfirewall firewall del rule name="AllowPeshoorg"
			netsh advfirewall firewall set rule all new enable=yes
		)
	) else (
		echo Call 'block_internet.cmd [block^|unblock]'
	)
)
