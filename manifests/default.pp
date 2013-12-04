$project_name = 'project'

# Default development root password (defaults to no password needed).
$mysql_root_password = 'synapse'

# Additional subdomains to resolve (separate additional domains with a space).
$hosts = "${project_name}.vm api.${project_name}.vm"

class apache {
  exec { 'apt-get update':
    command => '/usr/bin/apt-get update',
    returns => [0, 1],
  }

  exec { 'apt-get upgrade':
    command => '/usr/bin/apt-get -f upgrade',
    require => Exec['apt-get update'],
    returns => [0, 1],
  }

  package { "apache2":
    ensure => present,
  }

  package { "libxrender1":
    ensure => present,
  }

  service { "apache2":
    ensure  => running,
    require => Package["apache2"],
  }

  file { '/var/www':
    ensure  => link,
    target  => "/vagrant/public",
    notify  => Service['apache2'],
    force   => true,
    require => Package['apache2'],
  }

  file { '/etc/apache2/mods-enabled/ssl.conf':
    ensure  => link,
    target  => "/etc/apache2/mods-available/ssl.conf",
    notify  => Service['apache2'],
    force   => true,
    require => Package['apache2'],
  }

  file { '/etc/apache2/mods-enabled/ssl.load':
    ensure  => link,
    target  => "/etc/apache2/mods-available/ssl.load",
    notify  => Service['apache2'],
    force   => true,
    require => Package['apache2'],
  }

  file { '/etc/apache2/mods-enabled/rewrite.load':
    ensure  => link,
    target  => "/etc/apache2/mods-available/rewrite.load",
    notify  => Service['apache2'],
    force   => true,
    require => Package['apache2'],
  }

  exec { 'mysql-virtualhost-servername':
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/etc/apache2/sites-enabled",
    notify  => Service['apache2'],
    command => "sed -i -e 's/mysql.dev.vm/mysql.${project_name}.vm/g' 000-default",
    require => [ Package['apache2'] ],
  }

  exec { 'virtualhost-servername':
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/etc/apache2/sites-enabled",
    notify  => Service['apache2'],
    command => "sed -i -e 's/dev.vm/${project_name}.vm/g' 000-default",
    require => [ Package['apache2'] ],
  }

  exec { 'httpd-loglevel':
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/etc/apache2/sites-enabled",
    notify  => Service['apache2'],
    command => "sed -i 's/LogLevel debug/LogLevel warn/' 000-default",
  }

  exec { 'enablesendfile-off':
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/etc/apache2/sites-enabled",
    notify  => Service['apache2'],
    command => "sed -i '1i EnableSendfile off\n' 000-default",
    unless  => "grep EnableSendfile 000-default",
  }

  exec { 'environment-app-name':
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/etc/apache2/sites-enabled",
    notify  => Service['apache2'],
    command => "sed -i '1i SetEnv APP_NAME ${project_name}\n' 000-default",
    unless  => "grep 'SetEnv APP_NAME' 000-default",
  }
}

class php {
  package { "libapache2-mod-php5":
    ensure => present,
  }

  package { "php5-common":
    ensure => present,
  }

  package { "php5-cli":
    ensure => present,
  }

  package { "php5-curl":
    ensure => present,
  }

  package { "php5-gd":
    ensure => present,
  }

  package { "php5-imagick":
    ensure => present,
  }

  package { "php5-mcrypt":
    ensure => present,
  }

  package { "php5-mysql":
    ensure => present,
  }

  package { "libssh2-php":
    ensure => present,
  }

  package { "php5-xdebug":
    ensure => present,
  }

  package { "phpmyadmin":
    ensure => present,
  }
}

class mysql {
  package { "mysql-server":
    ensure => present,
  }

  service { "mysql":
    ensure  => running,
    require => Package["mysql-server"],
  }

  exec { "set-mysql-password":
    unless  => "mysql -uroot -p${mysql_root_password}",
    path    => ["/bin", "/usr/bin"],
    command => "mysqladmin -uroot password '${mysql_root_password}'",
    require => Service["mysql"],
  }

  exec { "create-mysql-users":
    unless  => "mysql -uroot -p${mysql_root_password}",
    path    => ["/bin", "/usr/bin"],
    command => "mysql -u root -p${mysql_root_password} -e \"GRANT USAGE ON *.* TO 'root'@'%' IDENTIFIED BY '${mysql_root_password}'\"",
    require => Exec["set-mysql-password"],
  }

  exec { "mysql-bind-address":
    unless  => "grep \"0.0.0.0\" /etc/mysql/my.cnf",
    path    => ["/bin", "/usr/bin"],
    command => "sed -i -r -e \"s/bind-address\\\\s{0,}=\\\\s{0,}127\\\\.0\\\\.0\\\\.1/bind-address = 0.0.0.0/\" /etc/mysql/my.cnf",
    notify  => Service["mysql"],
  }
}

class gems {
  package { "redis":
    ensure   => present,
    provider => 'gem',
  }

  package { "resque":
    ensure   => present,
    provider => 'gem',
  }

  package { "resque-scheduler" :
    ensure   => present,
    provider => 'gem',
  }

  package { "resque-status" :
    ensure   => present,
    provider => 'gem',
  }

  package { "fssm" :
    ensure   => present,
    provider => 'gem',
  }

  package { "sass":
    ensure   => '3.2.9',
    provider => 'gem',
  }

  package { "compass":
    ensure   => '0.12.2',
    provider => 'gem',
  }

  package { "redis-server" :
    ensure => present,
  }
}

class npm {
  exec { "bless" :
    path    => ["/usr/local/bin", "/usr/bin", "/bin"],
    cwd     => "/home/vagrant",
    command => "npm install -g bless@3.0.2",
    unless  => "npm list -g | grep bless",
  }
}

class setup {
  exec { "create-database":
    unless  => "/usr/bin/mysql -uroot -p${mysql_root_password} ${project_name}_vm",
    command => "/usr/bin/mysql -uroot -p${mysql_root_password} -e 'create database ${project_name}_vm;'",
    require => Class["mysql"],
  }

  exec { "pma-config":
    unless => "grep ${mysql_root_password} /etc/phpmyadmin/config.inc.php",
    path => ["/bin", "/usr/bin"],
    cwd => "/etc/phpmyadmin",
    command => "echo -n \"\n\\\$cfg['Servers'][\\\$i]['auth_type'] = 'config';\n\\\$cfg['Servers'][\\\$i]['user'] = 'root';\n\\\$cfg['Servers'][\\\$i]['password'] = '${mysql_root_password}';\n\" >> /etc/phpmyadmin/config.inc.php",
  }

  exec { "hosts-file":
    unless  => "grep bodetree.vm /etc/hosts",
    path    => ["/bin", "/usr/bin"],
    cwd     => "/etc/",
    command => "echo -n \"\n\n127.0.0.1 ${hosts}\n\" >> /etc/hosts",
  }

  exec { "envrionment-app-name":
    unless  => "grep ${project_name} /etc/environment",
    path    => ["/bin", "/usr/bin"],
    cwd     => "/etc",
    command => "echo 'APP_NAME=${project_name}' >> /etc/environment"
  }

  exec { "resque-web":
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/vagrant",
    environment => ["APP_NAME=${project_name}"],
    command => "nohup resque-web -L -p 8282 > /dev/null &",
    require => [ Class["php"], Class["gems"] ],
  }

  exec { "download-php-ini" :
    path    => ["/usr/local/bin", "/bin", "/usr/bin"],
    cwd     => "/home/vagrant",
    command => "wget https://gist.github.com/bjyoungblood/a40ed5b55ece23334a95/raw/php.ini",
    require => [ Class["php"], Class["apache"] ],
    unless  => "ls | grep php.ini",
  }

  file { "/etc/php5/apache2/php.ini" :
    source  => "/home/vagrant/php.ini",
    require => [ Exec['download-php-ini'] ],
  }

  file { "/etc/php5/cli/php.ini" :
    source  => "/home/vagrant/php.ini",
    require => [ Exec['download-php-ini'] ],
  }
}

class git {
  package { "git":
    ensure => present,
  }
}

include apache
include php
include mysql
include gems
include npm
include setup
include git