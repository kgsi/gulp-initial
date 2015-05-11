# gulp-initial

##About
gulp-initial は、gulpの使用を前提とした、フロントエンドテンプレートプロジェクトです。プロジェクトをダウンロードしてすぐに設定、構築が可能にできることを目的としています。

## Spec

* BrowserSync
* ejs (Template Engine)
* Sass(Compass)
* CSS Autoprefixer
* JavaScript Concat&Uglify
* Imagefile Minify
* SVG Sprites
* gulp-styledocco

## Usage

### npm,RubyGem,sass,compassのアップデート

    $ sudo npm update
    $ sudo gem update --system 
    $ sudo gem update sass
    $ sudo gem update compass

### gulpのグローバルインストール

    $ npm install --global gulp

### bowerの設定（Option）

    $ sudo npm install -g bower
    $ sudo npm update -g bower

### gulpの初期設定

    $ sudo npm install
    $ gulp

* 注釈挿入予定

### gulpのコマンド

    $ gulp

Sass/jsのコンパイルおよびHTML/CSS/JSの監視

    $ gulp critical

critical cssの出力

    $ gulp styleguide

styleguide css（styledocco）の出力

## Option

### bootstrap3のGrid Systemのみ使う
レスポンシブサイトを作る際、フレームワークを使って組む場合があります。
その際、BootstrapのGrid Systemのみ使いたい場合があるため、オプションとして記載。

#####必要なモジュールをimport
grid systemを使うために必要な以下のモジュールを、任意のsassファイルに記述する。

    @import 'bootstrap-sass/assets/stylesheets/bootstrap-sprockets';
    @import 'bootstrap-sass/assets/stylesheets/bootstrap/variables';
    @import 'bootstrap-sass/assets/stylesheets/bootstrap/mixins";
    @import 'bootstrap-sass/assets/stylesheets/bootstrap/grid';
    @import 'bootstrap-sass/assets/stylesheets/bootstrap/scaffolding';
    @import 'bootstrap-sass/assets/stylesheets/bootstrap/responsive-utilities';

* ディレクトリ指定は格納先に合わせ、適時変更

### 空フォルダに.gitkeepを配置するコマンドラインツール
git-empry-dir.pyファイルを使って下記コマンドを実行する。実行すると空ディレクトリに.gitkeepファイルが配置される。

    git-empry-dir.py keep

詳しくは[空のディレクトリに.gitkeepを配置するコマンドラインツール](http://qiita.com/suin/items/2814e91ed9c29c0f9287)を参照してください。

## Author

### kgsi

## Log

### 2015.05.11

* リポジトリ化