Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu-precise12042-x64-vbox43"
  config.vm.box_url = "http://box.puphpet.com/ubuntu-precise12042-x64-vbox43.box"

  static_ip = ENV['STATIC_IP'] || "192.168.50.50"
  config.vm.network "private_network", ip: static_ip

  config.vm.synced_folder "./", "/vagrant", id: "vagrant-root", type: "nfs"

  config.vm.usable_port_range = (2200..2250)
  config.vm.provider :virtualbox do |virtualbox|
    virtualbox.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    virtualbox.customize ["modifyvm", :id, "--memory", "2048"]
    virtualbox.customize ["setextradata", :id, "--VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  config.vm.provision :shell, :path => "puppet/shell/initial-setup.sh"
  config.vm.provision :shell, :path => "puppet/shell/update-puppet.sh"
  config.vm.provision :shell, :path => "puppet/shell/librarian-puppet-vagrant.sh"

  config.vm.provision :puppet do |puppet|
    puppet.facter = {
      "ssh_username" => "vagrant"
    }

    puppet.manifests_path = "puppet/manifests"
    puppet.options = ["--verbose", "--hiera_config /vagrant/puppet/hiera.yaml", "--parser future"]
  end

  config.ssh.username = "vagrant"

  config.ssh.shell = "bash -l"

  config.ssh.keep_alive = true
  config.ssh.forward_agent = false
  config.ssh.forward_x11 = false
  config.vagrant.host = :detect

  if File.exists?("Vagrantfile.local")
    external = File.read "Vagrantfile.local"
    eval external
  end
end

