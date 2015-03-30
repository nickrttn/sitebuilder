Vagrant.configure("2") do |config|
  config.vm.box = 'ubuntu/trusty64'
  config.vm.synced_folder './http_docs', '/vagrant', type: 'nfs'
  config.vm.network 'private_network', ip: '192.168.50.4'
  config.vm.provision :shell, path: 'bootstrap.sh'
end