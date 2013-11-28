Vagrant.configure("2") do |config|

  config.vm.box = "synapse-quantal64"
  config.vm.box_url = "https://synvm.s3.amazonaws.com/synapse-quantal64.box"

  static_ip = ENV['STATIC_IP'] || "192.168.50.99"
  config.vm.network "private_network", ip: static_ip

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  config.librarian_puppet.puppetfile_dir = "puppet"

  config.vm.provision "puppet" do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.module_path = "puppet/modules"
  end

  if File.exists?("../syn-vagrant.sh")
    config.vm.provision "shell", path: "../syn-vagrant.sh"
  else
    print "WARNING: ../syn-vagrant.sh not found: please read the wiki\n\n"
  end

  config.vm.synced_folder ".", "/vagrant", owner: "www-data", group: "www-data", mount_options: ["dmode=777","fmode=777"]

  if File.exists?("Vagrantfile.local")
    external = File.read "Vagrantfile.local"
    eval external
  end

end