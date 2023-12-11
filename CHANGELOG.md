## Description

[*] - a breaking change

## 3.0.2
- add `item` prop in `renderCollapseIcon` method

## 3.0.0
- [*] update all packages to the latest versions
- [*] stop using (and uninstall) `prop-types` package
- switch all files from `js` to `ts`/`tsx` and set better types
- add `onDragStart` and `onDragEnd` props
- make plus/minus icons to be inline in the default css file
- add `disableCollapse` and `disableDrag` props
- add `onCollapseChange` prop

## 2.0.0

- [*] move styles out of js (now should be imported explicitly)
- [*] add `targetPath` to `onChange` (and change signature of the callback)
- [*] change signature of the `confirmChange` callback for consistency
- add `depth` param to `renderItem`
- add `idProp` prop for adjusting `id` prop name
- add typescript types
