# Site Builder

This site needs a server to be able to perform AJAX requests. Please run it from a VM install. Instructions below.

## Running

1. Install [Vagrant](http://vagrantup.com)
2. Download or clone this repo.
3. Navigate to the repo folder.
4. Run `vagrant up`
5. Navigate to [192.168.50.4](http://192.168.50.4/) in the browser.

## Hacking

Make sure the latest version of node and browsersync are installed.

1. Install [Vagrant](http://vagrantup.com)
2. Download or clone this repo.
3. Navigate to the repo folder.
4. Run `vagrant up`
5. Navigate to http_docs in the repo folder.
6. Run `npm install` and `bower install`.
7. Run `grunt` to build files and refresh browser automatically.
8. Navigate to [192.168.50.4](http://192.168.50.4/) in the browser.
9. Open in your favorite editor to hack.

Copyleft under the MIT License.
