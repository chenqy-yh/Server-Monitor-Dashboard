# Details

Date : 2024-03-15 17:17:45

Directory e:\\MyDrive\\server-monitor

Total : 113 files,  9091 codes, 714 comments, 1317 blanks, all 11122 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.cjs](/.eslintrc.cjs) | JavaScript | 15 | 1 | 2 | 18 |
| [.prettierignore](/.prettierignore) | Ignore | 6 | 0 | 1 | 7 |
| [.prettierrc.yaml](/.prettierrc.yaml) | YAML | 4 | 0 | 1 | 5 |
| [README.md](/README.md) | Markdown | 22 | 0 | 13 | 35 |
| [demo1.js](/demo1.js) | JavaScript | 0 | 0 | 2 | 2 |
| [dev-app-update.yml](/dev-app-update.yml) | YAML | 3 | 0 | 1 | 4 |
| [electron-builder.yml](/electron-builder.yml) | YAML | 43 | 0 | 1 | 44 |
| [electron.vite.config.ts](/electron.vite.config.ts) | TypeScript | 25 | 0 | 2 | 27 |
| [package.json](/package.json) | JSON | 74 | 0 | 1 | 75 |
| [pnpm-lock.yaml](/pnpm-lock.yaml) | YAML | 4,136 | 0 | 623 | 4,759 |
| [src/main/index.ts](/src/main/index.ts) | TypeScript | 40 | 20 | 12 | 72 |
| [src/main/ipc/handle.ts](/src/main/ipc/handle.ts) | TypeScript | 56 | 10 | 12 | 78 |
| [src/main/ipc/index.ts](/src/main/ipc/index.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/main/ipc/on.ts](/src/main/ipc/on.ts) | TypeScript | 98 | 16 | 12 | 126 |
| [src/main/model/menu/index.ts](/src/main/model/menu/index.ts) | TypeScript | 21 | 1 | 9 | 31 |
| [src/main/plugins/auto-import.ts](/src/main/plugins/auto-import.ts) | TypeScript | 8 | 0 | 3 | 11 |
| [src/main/plugins/componets.ts](/src/main/plugins/componets.ts) | TypeScript | 8 | 0 | 3 | 11 |
| [src/main/plugins/index.ts](/src/main/plugins/index.ts) | TypeScript | 6 | 0 | 3 | 9 |
| [src/main/store/index.ts](/src/main/store/index.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [src/main/typings/env.d.ts](/src/main/typings/env.d.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [src/main/typings/ipc.d.ts](/src/main/typings/ipc.d.ts) | TypeScript | 24 | 1 | 4 | 29 |
| [src/main/typings/menu.d.ts](/src/main/typings/menu.d.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/main/utils/api/common/index.ts](/src/main/utils/api/common/index.ts) | TypeScript | 6 | 0 | 3 | 9 |
| [src/main/utils/api/index.ts](/src/main/utils/api/index.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/main/utils/api/log/index.ts](/src/main/utils/api/log/index.ts) | TypeScript | 11 | 4 | 3 | 18 |
| [src/main/utils/api/os/index.ts](/src/main/utils/api/os/index.ts) | TypeScript | 5 | 4 | 3 | 12 |
| [src/main/utils/api/ws/index.ts](/src/main/utils/api/ws/index.ts) | TypeScript | 15 | 8 | 4 | 27 |
| [src/main/utils/http/index.ts](/src/main/utils/http/index.ts) | TypeScript | 27 | 0 | 9 | 36 |
| [src/main/utils/tencent/api.ts](/src/main/utils/tencent/api.ts) | TypeScript | 35 | 24 | 7 | 66 |
| [src/main/utils/tencent/index.ts](/src/main/utils/tencent/index.ts) | TypeScript | 23 | 0 | 7 | 30 |
| [src/main/windows/index.ts](/src/main/windows/index.ts) | TypeScript | 26 | 2 | 5 | 33 |
| [src/preload/api/handle/index.ts](/src/preload/api/handle/index.ts) | TypeScript | 26 | 57 | 16 | 99 |
| [src/preload/api/index.ts](/src/preload/api/index.ts) | TypeScript | 9 | 0 | 4 | 13 |
| [src/preload/api/on/index.ts](/src/preload/api/on/index.ts) | TypeScript | 49 | 81 | 15 | 145 |
| [src/preload/index.d.ts](/src/preload/index.d.ts) | TypeScript | 36 | 0 | 4 | 40 |
| [src/preload/index.ts](/src/preload/index.ts) | TypeScript | 15 | 6 | 3 | 24 |
| [src/preload/typings/common.d.ts](/src/preload/typings/common.d.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [src/preload/typings/menu.d.ts](/src/preload/typings/menu.d.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/renderer/auto-imports.d.ts](/src/renderer/auto-imports.d.ts) | TypeScript | 3 | 5 | 2 | 10 |
| [src/renderer/components.d.ts](/src/renderer/components.d.ts) | TypeScript | 50 | 5 | 2 | 57 |
| [src/renderer/index.html](/src/renderer/index.html) | HTML | 15 | 2 | 2 | 19 |
| [src/renderer/src/App.vue](/src/renderer/src/App.vue) | Vue | 7 | 0 | 3 | 10 |
| [src/renderer/src/assets/css/element-plus.scss](/src/renderer/src/assets/css/element-plus.scss) | SCSS | 100 | 8 | 15 | 123 |
| [src/renderer/src/assets/css/font.css](/src/renderer/src/assets/css/font.css) | CSS | 10 | 1 | 2 | 13 |
| [src/renderer/src/assets/css/scrollbar.scss](/src/renderer/src/assets/css/scrollbar.scss) | SCSS | 21 | 0 | 4 | 25 |
| [src/renderer/src/assets/css/styles.css](/src/renderer/src/assets/css/styles.css) | CSS | 9 | 3 | 6 | 18 |
| [src/renderer/src/assets/css/theme.css](/src/renderer/src/assets/css/theme.css) | CSS | 67 | 19 | 9 | 95 |
| [src/renderer/src/assets/css/transition.css](/src/renderer/src/assets/css/transition.css) | CSS | 8 | 0 | 2 | 10 |
| [src/renderer/src/assets/icons.svg](/src/renderer/src/assets/icons.svg) | SVG | 34 | 0 | 1 | 35 |
| [src/renderer/src/components/Versions.vue](/src/renderer/src/components/Versions.vue) | Vue | 12 | 0 | 3 | 15 |
| [src/renderer/src/components/card/card.vue](/src/renderer/src/components/card/card.vue) | Vue | 43 | 0 | 3 | 46 |
| [src/renderer/src/components/checkbox/checkbox-1.vue](/src/renderer/src/components/checkbox/checkbox-1.vue) | Vue | 48 | 0 | 7 | 55 |
| [src/renderer/src/components/menu/left-menu.vue](/src/renderer/src/components/menu/left-menu.vue) | Vue | 63 | 0 | 7 | 70 |
| [src/renderer/src/components/menu/menu-item.vue](/src/renderer/src/components/menu/menu-item.vue) | Vue | 69 | 0 | 6 | 75 |
| [src/renderer/src/components/menu/menu.vue](/src/renderer/src/components/menu/menu.vue) | Vue | 14 | 0 | 3 | 17 |
| [src/renderer/src/components/pagination/pagination-1.vue](/src/renderer/src/components/pagination/pagination-1.vue) | Vue | 139 | 0 | 16 | 155 |
| [src/renderer/src/components/progress/circle-progress.vue](/src/renderer/src/components/progress/circle-progress.vue) | Vue | 28 | 0 | 3 | 31 |
| [src/renderer/src/components/tabbed/tabbed.vue](/src/renderer/src/components/tabbed/tabbed.vue) | Vue | 165 | 0 | 18 | 183 |
| [src/renderer/src/composables/common/drag.ts](/src/renderer/src/composables/common/drag.ts) | TypeScript | 42 | 0 | 6 | 48 |
| [src/renderer/src/composables/common/navigate-to-view.ts](/src/renderer/src/composables/common/navigate-to-view.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [src/renderer/src/composables/event-listener.ts](/src/renderer/src/composables/event-listener.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/renderer/src/composables/menu/index.ts](/src/renderer/src/composables/menu/index.ts) | TypeScript | 23 | 0 | 5 | 28 |
| [src/renderer/src/composables/mouse.ts](/src/renderer/src/composables/mouse.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/renderer/src/composables/server/index.ts](/src/renderer/src/composables/server/index.ts) | TypeScript | 0 | 49 | 10 | 59 |
| [src/renderer/src/directive/code-line.ts](/src/renderer/src/directive/code-line.ts) | TypeScript | 39 | 12 | 10 | 61 |
| [src/renderer/src/layouts/common/common-layouts.vue](/src/renderer/src/layouts/common/common-layouts.vue) | Vue | 5 | 0 | 3 | 8 |
| [src/renderer/src/main.ts](/src/renderer/src/main.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/renderer/src/plugins/i18n/index.json](/src/renderer/src/plugins/i18n/index.json) | JSON | 268 | 0 | 1 | 269 |
| [src/renderer/src/plugins/i18n/index.ts](/src/renderer/src/plugins/i18n/index.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/renderer/src/plugins/index.ts](/src/renderer/src/plugins/index.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/renderer/src/plugins/pinia/index.ts](/src/renderer/src/plugins/pinia/index.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/renderer/src/plugins/style/index.ts](/src/renderer/src/plugins/style/index.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/renderer/src/plugins/terminal/index.ts](/src/renderer/src/plugins/terminal/index.ts) | TypeScript | 2 | 3 | 2 | 7 |
| [src/renderer/src/router/index.ts](/src/renderer/src/router/index.ts) | TypeScript | 83 | 6 | 4 | 93 |
| [src/renderer/src/store/config/index.ts](/src/renderer/src/store/config/index.ts) | TypeScript | 86 | 51 | 21 | 158 |
| [src/renderer/src/store/config/tencent.ts](/src/renderer/src/store/config/tencent.ts) | TypeScript | 48 | 24 | 11 | 83 |
| [src/renderer/src/store/firewall/index.ts](/src/renderer/src/store/firewall/index.ts) | TypeScript | 112 | 30 | 13 | 155 |
| [src/renderer/src/store/index.ts](/src/renderer/src/store/index.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/renderer/src/store/server/server-info.ts](/src/renderer/src/store/server/server-info.ts) | TypeScript | 78 | 16 | 20 | 114 |
| [src/renderer/src/typings/env.d.ts](/src/renderer/src/typings/env.d.ts) | TypeScript | 13 | 2 | 4 | 19 |
| [src/renderer/src/typings/menu.d.ts](/src/renderer/src/typings/menu.d.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [src/renderer/src/typings/os.d.ts](/src/renderer/src/typings/os.d.ts) | TypeScript | 46 | 0 | 6 | 52 |
| [src/renderer/src/typings/setting.d.ts](/src/renderer/src/typings/setting.d.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [src/renderer/src/typings/tencent.d.ts](/src/renderer/src/typings/tencent.d.ts) | TypeScript | 41 | 1 | 6 | 48 |
| [src/renderer/src/typings/vue-router.d.ts](/src/renderer/src/typings/vue-router.d.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/renderer/src/utils/img/img.ts](/src/renderer/src/utils/img/img.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/renderer/src/utils/img/index.ts](/src/renderer/src/utils/img/index.ts) | TypeScript | 16 | 1 | 6 | 23 |
| [src/renderer/src/utils/os/index.ts](/src/renderer/src/utils/os/index.ts) | TypeScript | 17 | 1 | 3 | 21 |
| [src/renderer/src/utils/size/index.ts](/src/renderer/src/utils/size/index.ts) | TypeScript | 12 | 3 | 2 | 17 |
| [src/renderer/src/utils/store/index.ts](/src/renderer/src/utils/store/index.ts) | TypeScript | 10 | 1 | 3 | 14 |
| [src/renderer/src/utils/time/index.ts](/src/renderer/src/utils/time/index.ts) | TypeScript | 29 | 5 | 5 | 39 |
| [src/renderer/src/views/firewall/components/add-rules.vue](/src/renderer/src/views/firewall/components/add-rules.vue) | Vue | 191 | 0 | 21 | 212 |
| [src/renderer/src/views/firewall/components/edit-rules.vue](/src/renderer/src/views/firewall/components/edit-rules.vue) | Vue | 202 | 0 | 24 | 226 |
| [src/renderer/src/views/firewall/firewall.vue](/src/renderer/src/views/firewall/firewall.vue) | Vue | 228 | 0 | 22 | 250 |
| [src/renderer/src/views/home/components/header.vue](/src/renderer/src/views/home/components/header.vue) | Vue | 116 | 0 | 14 | 130 |
| [src/renderer/src/views/home/home.vue](/src/renderer/src/views/home/home.vue) | Vue | 77 | 1 | 8 | 86 |
| [src/renderer/src/views/index/components/network-chart.vue](/src/renderer/src/views/index/components/network-chart.vue) | Vue | 188 | 0 | 17 | 205 |
| [src/renderer/src/views/index/index.vue](/src/renderer/src/views/index/index.vue) | Vue | 197 | 0 | 13 | 210 |
| [src/renderer/src/views/log/components/mysql-log.vue](/src/renderer/src/views/log/components/mysql-log.vue) | Vue | 108 | 0 | 12 | 120 |
| [src/renderer/src/views/log/components/nginx-log.vue](/src/renderer/src/views/log/components/nginx-log.vue) | Vue | 172 | 0 | 15 | 187 |
| [src/renderer/src/views/log/components/redis-log.vue](/src/renderer/src/views/log/components/redis-log.vue) | Vue | 5 | 0 | 3 | 8 |
| [src/renderer/src/views/log/log.vue](/src/renderer/src/views/log/log.vue) | Vue | 61 | 1 | 6 | 68 |
| [src/renderer/src/views/setting/components/common.vue](/src/renderer/src/views/setting/components/common.vue) | Vue | 66 | 0 | 6 | 72 |
| [src/renderer/src/views/setting/components/personal.vue](/src/renderer/src/views/setting/components/personal.vue) | Vue | 125 | 0 | 9 | 134 |
| [src/renderer/src/views/setting/components/tencent.vue](/src/renderer/src/views/setting/components/tencent.vue) | Vue | 89 | 0 | 11 | 100 |
| [src/renderer/src/views/setting/setting.vue](/src/renderer/src/views/setting/setting.vue) | Vue | 63 | 0 | 11 | 74 |
| [src/renderer/src/views/terminal/components/terminal-item.vue](/src/renderer/src/views/terminal/components/terminal-item.vue) | Vue | 150 | 1 | 10 | 161 |
| [src/renderer/src/views/terminal/terminal.vue](/src/renderer/src/views/terminal/terminal.vue) | Vue | 130 | 153 | 17 | 300 |
| [src/renderer/src/views/test/sub-win.vue](/src/renderer/src/views/test/sub-win.vue) | Vue | 8 | 0 | 6 | 14 |
| [src/renderer/src/views/test/test.vue](/src/renderer/src/views/test/test.vue) | Vue | 9 | 0 | 3 | 12 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 11 | 0 | 1 | 12 |
| [tsconfig.node.json](/tsconfig.node.json) | JSON | 7 | 34 | 1 | 42 |
| [tsconfig.web.json](/tsconfig.web.json) | JSON | 8 | 41 | 1 | 50 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)