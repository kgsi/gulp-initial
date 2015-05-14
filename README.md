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
              └─ ライブラリ（concat後、/app/assets/js/ディレクトリにdistされる）
      └─ sass
    node_modules
    app
      └─ distディレクトリ
    package.json
    config.rb
    gulpfile.js
    bower.json

## Spec

 * SASS(Compass)
 * EJS
 * JS,CSS Minify & Concat
 * Autoprefix(pleeease)
 * Image Minify
 * BrowserSync
 * Crtitical CSS
 * Style guide(Styledocco)

## Usage
このリポジトリはgulpによるビルドを前提に作成しています。
以下はgulpの初期設定から実行方法までを説明します。

### npm,gem,sass,compassのアップデート
※各ツールのインストールが済んでいる前提です。

    $ sudo npm update
    $ sudo gem update --system 
    $ sudo gem update sass
    $ sudo gem update compass

### gulpのグローバルインストール

    $ npm install --global gulp

### bowerの設定（Option）

    $ sudo npm install -g bower
    $ sudo npm update -g bower
    $ bower install

####bower登録済みライブラリ
 * jQuery
 * modernizr.js
 * bootstrap-sass
 * velocity.js
 * Underscore.js

####初期設定
設定したい任意のディレクトリに移動後、下記コマンドを実行してください。package.jsonに登録されているツール・ライブラリがダウンロードされます。

    $ sudo npm install

### gulpのコマンド

#### SASS/JS/EJSのコンパイル、およびHTML/CSS/JS/EJSの監視

    $ gulp

#### critical cssの出力

    $ gulp critical

#### styleguide css（styledocco）の出力

    $ gulp styleguide

※app/styleguide/へ出力される

#### SASS/JS/IMAGEの圧縮

    $ gulp min

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

### 2015.05.12

* bowerにunderscore.jsの追加

### 2015.05.11

* リポジトリ化
