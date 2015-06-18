# gulp-initial

##About
gulp-initial は、gulpの使用を前提としたWEBアプリ・サイト向けテンプレートプロジェクトです。プロジェクトをダウンロードしてすぐに設定・構築が可能にできることを目的としています。

##Directory

    src
      └─ ejs
        ├─ ***.ejs（各ページのテンプレート）
        └─ _partial
              └─ _***.ejs（各ページの共通パーツ）
      └─ js
        └─ libs
              └─ ライブラリ（/app/assets/js/にconcat&ugilty後出力）
      └─ sass
    node_modules
    app（開発用ディレクトリ）
    dest（公開ファイル書き出し用ディレクトリ）
    package.json
    config.rb
    gulpfile.js
    bower.json

## Spec

 * SASS(Compass)
 * EJS
 * JS,CSS Minify & Concat
 * Autoprefix(pleeease)
 * Image Minify(pngquant,jpegtran)
 * BrowserSync
 * Crtitical CSS
 * StyleGuide(Styledocco)
 * ftp-upload(gulp-ftp)

## Usage
このリポジトリはgulpによるビルドを前提に作成しています。
以下はgulpの初期設定から実行方法までを説明します。
※パッケージをインストールする際の"sudo"コマンドは省略しています。

### npm,gem,sass,compassの設定・最新化（グローバル）
Node.jsインストールが済んでいる前提です。また、CompassとSassを使うため、
それぞれモジュールのインストールが必要です。

    $ npm update
    $ gem update --system 
    $ gem install sass
    $ gem install compass
    $ gem update sass
    $ gem update compass

### gulpのインストール（グローバル）

    $ npm install --global gulp

### bowerの設定（オプション）

    $ npm install -g bower
    $ npm update -g bower
    $ cd ** //リポジトリ設置ディレクトリに移動
    $ bower install

####bower登録済みライブラリ
 * jQuery
 * modernizr.js
 * bootstrap-sass
 * velocity.js
 * Underscore.js

####初期設定
設定したい任意のディレクトリに移動後、下記コマンドを実行。package.jsonに登録されているツール・ライブラリがダウンロードされます。

    $ cd ** //リポジトリ設置ディレクトリに移動
    $ sudo npm install

### gulpのコマンド

#### SASS/JS/EJSのコンパイル、およびHTML/CSS/JS/EJSの監視

    $ gulp

#### library(js)の圧縮

    $ gulp libsmin

※libsminのsrc配列に、圧縮したいlibraryを記述する（jquery.js,velocity.jsは設定済み）

#### critical cssの出力

    $ gulp critical

#### styleguide css（styledocco）の出力

    $ gulp styleguide

※app/styleguide/へ出力される

#### SASS/JS/IMAGEの圧縮

    $ gulp min

#### タスク終了

    ^（Ctrl）+C

## Option

### 空フォルダに.gitkeepを配置するコマンドラインツール
git-empry-dir.pyファイルを使って下記コマンドを実行してください。実行すると空ディレクトリに.gitkeepファイルが配置されます。

    git-empry-dir.py keep

詳しくは[空のディレクトリに.gitkeepを配置するコマンドラインツール](http://qiita.com/suin/items/2814e91ed9c29c0f9287)を参照

### PHPを使う場合
gulpfile.jsのbrowserSync項目を参照。proxyを有効にし、appディレクトリをMAMPなどを使って有効化します。MAMPとBrowserSyncの紐付けが行われます。

## Author

### kgsi

* [Personal site](http://aircolor.org)
* [twitter](https://twitter.com/kgsi)
* [Facebook](https://www.facebook.com/shinichi.kogiso)

## Log

### 2015.06.05

* gulpの書き直し
* watchをgulp-watchに切り替え
* ejsフォルダにejsテンプレートを設置

### 2015.05.12

* bowerにunderscore.jsの追加

### 2015.05.11

* リポジトリ化
