# プロジェクトについて

このプロジェクトは、シングルページアプリケーション（SPA）として構築されたToDoアプリケーションです。Vue.js、Vuetify、Viteを使用して開発されています。また、バックエンドAPIとしてmore-dockerを使用しています。

## 使用技術

- Vue.js
- Vuetify
- Vite
- Axios
- more-docker

## 実行方法

1. 必要な依存関係をインストールします。
```shell
  npm install
```

2. 環境ファイル作成
   - 環境変数ファイル（`.env`）を作成します。
   - 以下の内容を含む.envファイルをプロジェクトのルートディレクトリに作成してください。
   - `VITE_API_URL`には、バックエンドAPIのURLを指定してください。
3. More-dockerの起動
   - More-dockerを起動してください。
4. アプリケーションを起動します。
```shell
  npm run dev
```

## 注意事項
このリポジトリは一時的なものであり、フロントエンドをDockerに追加した後、このリポジトリは削除されます