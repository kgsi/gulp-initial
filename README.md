# gulp-initial

##About
gulp-initialは、gulpの使用を前提としたWEBアプリ・サイト向けテンプレートプロジェクトです。  
プロジェクトをダウンロードしてすぐに設定・構築が可能にできることを目的としています。

##Directory

    dest           //開発・公開用ファイルの出力ディレクトリ
    package.json
    gulpfile.js
    bower.json
    gulp           
     └ tasks       //gulpタスク
	  config.js    //ディレクトリ・圧縮等の設定ファイル
    src            //ソースファイルディレクトリ
     └ assets
        └ sass     //sass(scss)格納
        └ partial  //header,footerなどの共通パーツ格納
        └ js
           └ libs  //ライブラリファイル格納
        └ images

 * watch, destをすると、srcフォルダ構造を維持しつつ、destへ出力されます。
 * partial,sassディレクトリはdestディレクトリにコピーされません。
 * libsの圧縮設定はconfig.jsのlibs項目で行います。

## Spec
### Main
 * SASS
 * EJS
 * JS,CSS Minify & Concat
 * Autoprefix(pleeease)
 * Image Minify(pngquant, jpegtran)
 * BrowserSync

### Option
 * Crtitical CSS
 * StyleGuide(Styledocco)

###bower登録済みライブラリ
 * jQuery
 * modernizr.js
 * bootstrap-sass
 * velocity.js
 * Underscore.js


## Usage

### Command

#### watch(SASS,JS,EJSのコンパイル、およびHTML/CSS/JS/EJSの監視)

    $ gulp

#### dest (リリースファイル書き出し)

    $ gulp dest

#### critical cssの出力

    $ gulp critical

#### styleguide css（styledocco）の出力

    $ gulp styleguide

### Option

#### PHPを使う場合
gulpfile.jsのbrowserSync項目を参照。  
proxyを有効にし、appディレクトリをMAMPなどを使って有効化します。  
MAMPとBrowserSyncの紐付けが行われます。

## Author

### kgsi

* [Personal site](http://aircolor.org)
* [twitter](https://twitter.com/kgsi)
* [Facebook](https://www.facebook.com/shinichi.kogiso)

## Log

####2015.10.03
* ES6(babel)コンパイル機能追加
* CSSのコンパイルをCompassからgulp-sassへ変更

####2015.08.06
リポジトリ再アップと整理

####2015.06.25
リポジトリ化
