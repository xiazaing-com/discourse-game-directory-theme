# Discourse Game Directory

第一版 Theme Component，用于为约定好的游戏话题 HTML 提供卡片和详情页样式。

## 安装

在 Discourse 管理后台打开 **外观 -> 主题 -> 组件 -> 添加 -> 从 Git 添加**，填入：

```text
https://github.com/xiazaing-com/discourse-game-directory-theme.git
```

## 约定标记

```html
<article class="game-detail">
  <img class="game-detail__cover" src="https://cdn.example/cover.webp" alt="游戏名称封面" loading="lazy">
  <div class="game-download" aria-label="下载信息">
    <img class="game-download__qr" src="https://cdn.example/qr.webp" alt="网盘下载二维码" loading="lazy">
    <a class="game-download__link" href="https://pan.example/xxx" target="_blank" rel="noopener noreferrer">打开网盘</a>
  </div>
</article>
```

当前版本只提供稳定的展示层，不覆盖 Discourse 核心 Ember 模板。卡片列表的数据接入和游戏字段结构化将在下一步实现。
