# Diff Details

Date : 2024-03-12 10:36:14

Directory e:\\MyDrive\\my-drive

Total : 46 files,  1070 codes, 789 comments, 133 blanks, all 1992 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [demo.js](/demo.js) | JavaScript | 18 | 0 | 3 | 21 |
| [package.json](/package.json) | JSON | 1 | 0 | 0 | 1 |
| [pnpm-lock.yaml](/pnpm-lock.yaml) | YAML | 86 | 0 | 13 | 99 |
| [src/main/index.ts](/src/main/index.ts) | TypeScript | -2 | 10 | 0 | 8 |
| [src/main/ipc/handle.ts](/src/main/ipc/handle.ts) | TypeScript | 13 | 4 | 3 | 20 |
| [src/main/ipc/on.ts](/src/main/ipc/on.ts) | TypeScript | 34 | 4 | 3 | 41 |
| [src/main/typings/ipc.d.ts](/src/main/typings/ipc.d.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [src/main/utils/api/index.ts](/src/main/utils/api/index.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/main/utils/api/log/index.ts](/src/main/utils/api/log/index.ts) | TypeScript | 11 | 4 | 3 | 18 |
| [src/main/utils/api/os/index.ts](/src/main/utils/api/os/index.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/main/utils/api/ws/index.ts](/src/main/utils/api/ws/index.ts) | TypeScript | 15 | 8 | 4 | 27 |
| [src/main/utils/cos/api.ts](/src/main/utils/cos/api.ts) | TypeScript | 5 | 0 | 3 | 8 |
| [src/main/utils/cos/index.ts](/src/main/utils/cos/index.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [src/preload/api/handle/index.ts](/src/preload/api/handle/index.ts) | TypeScript | 15 | 3 | 3 | 21 |
| [src/preload/api/on/index.ts](/src/preload/api/on/index.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/preload/index.d.ts](/src/preload/index.d.ts) | TypeScript | 11 | 0 | 0 | 11 |
| [src/renderer/components.d.ts](/src/renderer/components.d.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/renderer/src/App.vue](/src/renderer/src/App.vue) | Vue | 12 | 0 | 2 | 14 |
| [src/renderer/src/assets/css/element-plus.scss](/src/renderer/src/assets/css/element-plus.scss) | SCSS | 14 | 1 | 4 | 19 |
| [src/renderer/src/assets/css/scrollbar.css](/src/renderer/src/assets/css/scrollbar.css) | CSS | -17 | 0 | -4 | -21 |
| [src/renderer/src/assets/css/scrollbar.scss](/src/renderer/src/assets/css/scrollbar.scss) | SCSS | 21 | 0 | 4 | 25 |
| [src/renderer/src/assets/css/styles.css](/src/renderer/src/assets/css/styles.css) | CSS | -3 | 0 | 1 | -2 |
| [src/renderer/src/assets/css/theme.css](/src/renderer/src/assets/css/theme.css) | CSS | 3 | 2 | 0 | 5 |
| [src/renderer/src/components/pagination/pagination-1.vue](/src/renderer/src/components/pagination/pagination-1.vue) | Vue | 139 | 0 | 16 | 155 |
| [src/renderer/src/composables/common/drag.ts](/src/renderer/src/composables/common/drag.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/renderer/src/composables/server/index.ts](/src/renderer/src/composables/server/index.ts) | TypeScript | 0 | 49 | 10 | 59 |
| [src/renderer/src/plugins/i18n/index.json](/src/renderer/src/plugins/i18n/index.json) | JSON | 90 | 0 | 0 | 90 |
| [src/renderer/src/router/index.ts](/src/renderer/src/router/index.ts) | TypeScript | 16 | 1 | 0 | 17 |
| [src/renderer/src/store/config/index.ts](/src/renderer/src/store/config/index.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [src/renderer/src/store/index.ts](/src/renderer/src/store/index.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/renderer/src/store/server/server-info.ts](/src/renderer/src/store/server/server-info.ts) | TypeScript | 146 | 41 | 18 | 205 |
| [src/renderer/src/typings/cos.d.ts](/src/renderer/src/typings/cos.d.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/renderer/src/views/firewall/firewall.vue](/src/renderer/src/views/firewall/firewall.vue) | Vue | 17 | 0 | 5 | 22 |
| [src/renderer/src/views/home/components/header.vue](/src/renderer/src/views/home/components/header.vue) | Vue | -6 | 0 | 1 | -5 |
| [src/renderer/src/views/home/home.vue](/src/renderer/src/views/home/home.vue) | Vue | -10 | 0 | 0 | -10 |
| [src/renderer/src/views/index/components/network-chart.vue](/src/renderer/src/views/index/components/network-chart.vue) | Vue | -36 | 242 | -1 | 205 |
| [src/renderer/src/views/index/index.vue](/src/renderer/src/views/index/index.vue) | Vue | -24 | 244 | -5 | 215 |
| [src/renderer/src/views/log/components/mysql-log.vue](/src/renderer/src/views/log/components/mysql-log.vue) | Vue | 96 | 0 | 11 | 107 |
| [src/renderer/src/views/log/components/nginx-log.vue](/src/renderer/src/views/log/components/nginx-log.vue) | Vue | 156 | 0 | 11 | 167 |
| [src/renderer/src/views/log/components/redis-log.vue](/src/renderer/src/views/log/components/redis-log.vue) | Vue | 5 | 0 | 3 | 8 |
| [src/renderer/src/views/log/log.vue](/src/renderer/src/views/log/log.vue) | Vue | -2 | 1 | -2 | -3 |
| [src/renderer/src/views/setting/components/common.vue](/src/renderer/src/views/setting/components/common.vue) | Vue | 2 | 0 | 0 | 2 |
| [src/renderer/src/views/setting/components/personal.vue](/src/renderer/src/views/setting/components/personal.vue) | Vue | 12 | 0 | 0 | 12 |
| [src/renderer/src/views/terminal/components/terminal-item.vue](/src/renderer/src/views/terminal/components/terminal-item.vue) | Vue | 141 | 0 | 9 | 150 |
| [src/renderer/src/views/terminal/terminal.vue](/src/renderer/src/views/terminal/terminal.vue) | Vue | 3 | 1 | 2 | 6 |
| [src/renderer/src/views/test/test.vue](/src/renderer/src/views/test/test.vue) | Vue | 2 | 174 | -1 | 175 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details