# gulp-initial-php

##About
GulpベースのPHPの使用を想定したWEBアプリ・サイト向けテンプレートプロジェクトです。

##Directory

    dist  //Dist directory
     └ assets
        └ sass   
        └ app      // program file 
        └ include  // common parts
        └ js
        └ images
    package.json
    gulpfile.js
    bower.json
    gulp
     └ tasks       
	  config.js

## Spec
 * SASS
 * Minify & Concat JS,CSS 
 * Autoprefix(pleeease)
 * Image Minify(pngquant, jpegtran)
 * BrowserSync
 
 <!--* Crtitical CSS
 * StyleGuide(Styledocco)
-->

## bower
bowerに登録済みのファイルは、watchコマンドを実行した際に
自動的にlibs.jsとして出力されます。

### Default library
 * jQuery
 * Tween Max

## Usage

### gulp Command

#### watch

    $ gulp

#### dest

    $ gulp dest

<!--#### critical css

    $ gulp critical

#### styleguide css

    $ gulp styleguide
-->
## Author

### kgsi

* [Personal site](http://aircolor.org)
* [twitter](https://twitter.com/kgsi)
* [Facebook](https://www.facebook.com/shinichi.kogiso)
