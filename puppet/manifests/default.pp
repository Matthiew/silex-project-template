group {
  'puppet': ensure => present
}

Exec {
  path => [ '/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/' ]
}

File {
  owner => 0,
  group => 0,
  mode  => 0644
}

class {'apt':
  always_apt_update => true,
}

Class['::apt::update'] -> Package <|
    title != 'python-software-properties'
and title != 'software-properties-common'
|>

class {
  'puphpet::dotfiles':
}

package { [
    'build-essential',
    'curl',
  ]:
  ensure  => 'installed',
}

class { 'nodejs':}

class { 'nginx':}

nginx::resource::vhost {
  'api.project.vm':
    ensure       => present,
    server_name  => [
      'api.project.vm'
    ],
    listen_port  => 80,
    index_files  => [
      'index.php'
    ],
    www_root     => '/vagrant/public/',
    try_files    => ['$uri', '$uri/', '/index.html'],
}

package { [
    'grunt-cli'
  ]:
  ensure   => present,
  provider => 'npm',
  require  => Package['nodejs'],
}

package { [
    'compass'
  ]:
  ensure => present,
  provider => 'gem'
}