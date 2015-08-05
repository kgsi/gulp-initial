# gulp-initial

##About
gulp-initialは、gulpの使用を前提としたWEBアプリ・サイト向けテンプレートプロジェクトです。  
プロジェクトをダウンロードしてすぐに設定・構築が可能にできることを目的としています。

##Directory

    gulp
      config.js // ディレクトリ・圧縮等の設定記述ファイル
      └─ tasks // gulpタスクディレクトリ
    src //ソースディレクトリ
    dest //開発用・公開ファイル・ディレクトリ
    node_modules
    package.json
    gulpfile.js
    bower.json

## Spec
### Main
 * SASS(Compass)
 * EJS
 * JS,CSS Minify & Concat
 * Autoprefix(pleeease)
 * Image Minify(pngquant, jpegtran)
 * BrowserSync

### Option
 * Crtitical CSS
 * StyleGuide(Styledocco)
 * ftp-upload(gulp-ftp)

###bower登録済みライブラリ
 * jQuery
 * modernizr.js
 * bootstrap-sass
 * velocity.js
 * Underscore.js


## Usage

### Command

#### SASS,JS,EJSのコンパイル、およびHTML/CSS/JS/EJSの監視

    $ gulp

#### dest (リリースファイル書き出し)

    $ gulp dest

#### critical cssの出力

    $ gulp critical

#### styleguide css（styledocco）の出力

    $ gulp styleguide

### Option

#### PHPを使う場合
gulpfile.jsのbrowserSync項目を参照。proxyを有効にし、appディレクトリをMAMPなどを使って有効化します。MAMPとBrowserSyncの紐付けが行われます。

## Author

### kgsi

* [Personal site](http://aircolor.org)
* [twitter](https://twitter.com/kgsi)
* [Facebook](https://www.facebook.com/shinichi.kogiso)

## Log

####2015.08.06
リポジトリ再アップと整理

####2015.06.25

リポジトリ化
