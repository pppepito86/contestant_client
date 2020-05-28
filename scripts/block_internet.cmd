@echo off

if "%1"=="block" (
	echo blocking
	netsh advfirewall export "C:\rules.wfw"
	netsh advfirewall firewall del rule all
	netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
	netsh advfirewall firewall add rule name="AllowDNS" program="%SystemRoot%\system32\svchost.exe" dir=out action=allow protocol=UDP remoteport=53
	netsh advfirewall firewall add rule name="AllowPeshoorg" dir=out action=allow remoteip=85.130.26.176	
) else (
	if "%1"=="unblock" (
		echo unblocking
		netsh advfirewall firewall del rule all
		netsh advfirewall import "C:\rules.wfw"
		netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound
	) else (
		echo "Call 'block_internet.cmd [block|unblock]'"
	)
)
