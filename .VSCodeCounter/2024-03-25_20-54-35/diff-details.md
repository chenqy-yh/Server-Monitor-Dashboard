# Diff Details

Date : 2024-03-25 20:54:35

Directory e:\\MyDrive\\server-monitor

Total : 80 files,  5200 codes, 484 comments, 753 blanks, all 6437 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.cjs](/.eslintrc.cjs) | JavaScript | 15 | 1 | 2 | 18 |
| [.prettierignore](/.prettierignore) | Ignore | 6 | 0 | 1 | 7 |
| [.prettierrc.yaml](/.prettierrc.yaml) | YAML | 4 | 0 | 1 | 5 |
| [1.js](/1.js) | JavaScript | 3 | 7 | 3 | 13 |
| [README.md](/README.md) | Markdown | 22 | 0 | 13 | 35 |
| [dev-app-update.yml](/dev-app-update.yml) | YAML | 3 | 0 | 1 | 4 |
| [electron-builder.yml](/electron-builder.yml) | YAML | 43 | 0 | 1 | 44 |
| [electron.vite.config.ts](/electron.vite.config.ts) | TypeScript | 25 | 0 | 2 | 27 |
| [package.json](/package.json) | JSON | 77 | 0 | 1 | 78 |
| [pnpm-lock.yaml](/pnpm-lock.yaml) | YAML | 4,147 | 0 | 624 | 4,771 |
| [src/main/index.ts](/src/main/index.ts) | TypeScript | -4 | 7 | -1 | 2 |
| [src/main/ipc/handle/common.ts](/src/main/ipc/handle/common.ts) | TypeScript | 9 | 8 | 1 | 18 |
| [src/main/ipc/handle/file.ts](/src/main/ipc/handle/file.ts) | TypeScript | 14 | 7 | 3 | 24 |
| [src/main/ipc/index.ts](/src/main/ipc/index.ts) | TypeScript | 0 | 7 | 0 | 7 |
| [src/main/ipc/on.ts](/src/main/ipc/on.ts) | TypeScript | -94 | -15 | -12 | -121 |
| [src/main/ipc/on/file.ts](/src/main/ipc/on/file.ts) | TypeScript | 4 | 1 | 2 | 7 |
| [src/main/ipc/on/index.ts](/src/main/ipc/on/index.ts) | TypeScript | 101 | 15 | 10 | 126 |
| [src/main/model/menu/index.ts](/src/main/model/menu/index.ts) | TypeScript | 21 | 7 | 1 | 29 |
| [src/main/model/windows/index.ts](/src/main/model/windows/index.ts) | TypeScript | -20 | -1 | -6 | -27 |
| [src/main/typings/ipc.d.ts](/src/main/typings/ipc.d.ts) | TypeScript | 6 | 7 | 0 | 13 |
| [src/main/utils/api/file/index.ts](/src/main/utils/api/file/index.ts) | TypeScript | 14 | 19 | 2 | 35 |
| [src/main/utils/file/index.ts](/src/main/utils/file/index.ts) | TypeScript | 19 | 22 | 5 | 46 |
| [src/preload/api/handle/index.ts](/src/preload/api/handle/index.ts) | TypeScript | 3 | 28 | 0 | 31 |
| [src/preload/api/index.ts](/src/preload/api/index.ts) | TypeScript | 8 | 7 | 0 | 15 |
| [src/preload/api/on/index.ts](/src/preload/api/on/index.ts) | TypeScript | 4 | 7 | 0 | 11 |
| [src/preload/index.d.ts](/src/preload/index.d.ts) | TypeScript | 8 | 7 | 1 | 16 |
| [src/preload/index.ts](/src/preload/index.ts) | TypeScript | 0 | -1 | 0 | -1 |
| [src/renderer/components.d.ts](/src/renderer/components.d.ts) | TypeScript | 9 | 0 | 0 | 9 |
| [src/renderer/src/assets/css/font.css](/src/renderer/src/assets/css/font.css) | CSS | 4 | 0 | 1 | 5 |
| [src/renderer/src/assets/css/theme.css](/src/renderer/src/assets/css/theme.css) | CSS | 8 | 3 | 0 | 11 |
| [src/renderer/src/components/card/card-2.vue](/src/renderer/src/components/card/card-2.vue) | Vue | 1 | 0 | 0 | 1 |
| [src/renderer/src/components/card/social-card.vue](/src/renderer/src/components/card/social-card.vue) | Vue | -496 | 7 | -62 | -551 |
| [src/renderer/src/components/editor/custom-editor.vue](/src/renderer/src/components/editor/custom-editor.vue) | Vue | 40 | 7 | 10 | 57 |
| [src/renderer/src/components/editor/editor.vue](/src/renderer/src/components/editor/editor.vue) | Vue | 7 | 7 | 1 | 15 |
| [src/renderer/src/components/explorer/explorer-row.vue](/src/renderer/src/components/explorer/explorer-row.vue) | Vue | 53 | 0 | 7 | 60 |
| [src/renderer/src/components/explorer/explorer.vue](/src/renderer/src/components/explorer/explorer.vue) | Vue | 27 | 0 | 3 | 30 |
| [src/renderer/src/components/explorer/index.d.ts](/src/renderer/src/components/explorer/index.d.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/renderer/src/components/icon/arrow-right.vue](/src/renderer/src/components/icon/arrow-right.vue) | Vue | 5 | 0 | 3 | 8 |
| [src/renderer/src/components/icon/brand.vue](/src/renderer/src/components/icon/brand.vue) | Vue | 39 | 10 | 3 | 52 |
| [src/renderer/src/components/loading/loading-1.vue](/src/renderer/src/components/loading/loading-1.vue) | Vue | 66 | 7 | 4 | 77 |
| [src/renderer/src/components/loading/loading-2.vue](/src/renderer/src/components/loading/loading-2.vue) | Vue | 503 | 0 | 65 | 568 |
| [src/renderer/src/components/loading/loading-3.vue](/src/renderer/src/components/loading/loading-3.vue) | Vue | 114 | 7 | 6 | 127 |
| [src/renderer/src/components/menu/left-menu.vue](/src/renderer/src/components/menu/left-menu.vue) | Vue | 1 | 7 | 0 | 8 |
| [src/renderer/src/components/pagination/pagination-1.vue](/src/renderer/src/components/pagination/pagination-1.vue) | Vue | 18 | 0 | 2 | 20 |
| [src/renderer/src/components/resize/resize-layout.vue](/src/renderer/src/components/resize/resize-layout.vue) | Vue | 5 | 0 | 1 | 6 |
| [src/renderer/src/composables/common/drag.ts](/src/renderer/src/composables/common/drag.ts) | TypeScript | 10 | 7 | 2 | 19 |
| [src/renderer/src/composables/common/header.ts](/src/renderer/src/composables/common/header.ts) | TypeScript | 44 | 9 | 11 | 64 |
| [src/renderer/src/composables/editor/editor.ts](/src/renderer/src/composables/editor/editor.ts) | TypeScript | 114 | 49 | 26 | 189 |
| [src/renderer/src/composables/event-listener.ts](/src/renderer/src/composables/event-listener.ts) | TypeScript | -10 | 0 | -3 | -13 |
| [src/renderer/src/composables/file/index.ts](/src/renderer/src/composables/file/index.ts) | TypeScript | 111 | 30 | 28 | 169 |
| [src/renderer/src/composables/mouse.ts](/src/renderer/src/composables/mouse.ts) | TypeScript | -13 | 0 | -3 | -16 |
| [src/renderer/src/composables/server/index.ts](/src/renderer/src/composables/server/index.ts) | TypeScript | 0 | -49 | -10 | -59 |
| [src/renderer/src/directive/code-line.ts](/src/renderer/src/directive/code-line.ts) | TypeScript | -39 | -12 | -10 | -61 |
| [src/renderer/src/directive/index.ts](/src/renderer/src/directive/index.ts) | TypeScript | 6 | 0 | 3 | 9 |
| [src/renderer/src/directive/loading.ts](/src/renderer/src/directive/loading.ts) | TypeScript | 37 | 1 | 6 | 44 |
| [src/renderer/src/main.ts](/src/renderer/src/main.ts) | TypeScript | 2 | 7 | 0 | 9 |
| [src/renderer/src/plugins/i18n/index.json](/src/renderer/src/plugins/i18n/index.json) | JSON | 28 | 0 | 0 | 28 |
| [src/renderer/src/store/config/index.ts](/src/renderer/src/store/config/index.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/renderer/src/store/firewall/index.ts](/src/renderer/src/store/firewall/index.ts) | TypeScript | 0 | -2 | -2 | -4 |
| [src/renderer/src/store/server/server-info.ts](/src/renderer/src/store/server/server-info.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/renderer/src/utils/common/index.ts](/src/renderer/src/utils/common/index.ts) | TypeScript | 5 | 0 | 3 | 8 |
| [src/renderer/src/utils/file/index.ts](/src/renderer/src/utils/file/index.ts) | TypeScript | 59 | 15 | 8 | 82 |
| [src/renderer/src/utils/windows/index.ts](/src/renderer/src/utils/windows/index.ts) | TypeScript | 1 | 7 | 0 | 8 |
| [src/renderer/src/views/editor/editor.vue](/src/renderer/src/views/editor/editor.vue) | Vue | 46 | -11 | 5 | 40 |
| [src/renderer/src/views/file/components/file-list.vue](/src/renderer/src/views/file/components/file-list.vue) | Vue | 70 | 0 | 12 | 82 |
| [src/renderer/src/views/file/file.vue](/src/renderer/src/views/file/file.vue) | Vue | -23 | 7 | -8 | -24 |
| [src/renderer/src/views/firewall/components/add-rules.vue](/src/renderer/src/views/firewall/components/add-rules.vue) | Vue | -12 | 7 | 0 | -5 |
| [src/renderer/src/views/firewall/components/edit-rules.vue](/src/renderer/src/views/firewall/components/edit-rules.vue) | Vue | -18 | 0 | -5 | -23 |
| [src/renderer/src/views/home/components/header.vue](/src/renderer/src/views/home/components/header.vue) | Vue | 1 | 147 | 1 | 149 |
| [src/renderer/src/views/home/home.vue](/src/renderer/src/views/home/home.vue) | Vue | 9 | 7 | 1 | 17 |
| [src/renderer/src/views/index/components/network-chart.vue](/src/renderer/src/views/index/components/network-chart.vue) | Vue | 8 | 0 | -1 | 7 |
| [src/renderer/src/views/index/dashbard.vue](/src/renderer/src/views/index/dashbard.vue) | Vue | 13 | 0 | 1 | 14 |
| [src/renderer/src/views/index/processor.vue](/src/renderer/src/views/index/processor.vue) | Vue | 4 | 0 | 0 | 4 |
| [src/renderer/src/views/setting/components/personal-setting.vue](/src/renderer/src/views/setting/components/personal-setting.vue) | Vue | 28 | 0 | 3 | 31 |
| [src/renderer/src/views/test/kid.vue](/src/renderer/src/views/test/kid.vue) | Vue | -13 | 0 | -5 | -18 |
| [src/renderer/src/views/test/test.vue](/src/renderer/src/views/test/test.vue) | Vue | -75 | -11 | -5 | -91 |
| [src/renderer/src/views/test/test2.vue](/src/renderer/src/views/test/test2.vue) | Vue | -82 | 0 | -11 | -93 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 11 | 0 | 1 | 12 |
| [tsconfig.node.json](/tsconfig.node.json) | JSON | 8 | 40 | 1 | 49 |
| [tsconfig.web.json](/tsconfig.web.json) | JSON | 8 | 41 | 1 | 50 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details