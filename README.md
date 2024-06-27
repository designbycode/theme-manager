# Theme Manager

[![npm version](https://badge.fury.io/js/@designbycode%2Ftheme-manager.svg)](https://badge.fury.io/js/@designbycode%2Ftheme-manager)
![npm](https://img.shields.io/npm/dt/%40designbycode/theme-manager)
![NPM](https://img.shields.io/npm/l/%40designbycode%2Ftheme-manager)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40designbycode%2Ftheme-manager)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![GitHub stars](https://img.shields.io/github/stars/DesignByCode/theme-manager?style=social)](https://github.com/DesignByCode/theme-manager/stargazers)
[![HitCount](https://hits.dwyl.com/designbycode/theme-manager.svg?style=flat)](http://hits.dwyl.com/designbycode/theme-manager)

[![NPM](https://nodei.co/npm/@designbycode/theme-manager.png)](https://nodei.co/npm/@designbycode/theme-manager/)

The Theme Manager plugin allows you to easily manage and switch between different themes in your web application.

## Installation

To use this plugin, you need to install it via pnpm, npm or yarn.

#### Using pnpm

```bash
pnpm add  @designbycode/theme-manager
```

#### Using npm

```bash
npm install @designbycode/theme-manager
```

#### Using yarn

```bash
yarn add @designbycode/theme-manager
```

## Getting Started

To use the Theme Manager plugin, simply create a new instance of the ThemeManager class and pass in an optional array of additional theme values to support:

```typescript
const themeManager = new ThemeManager();
```

## Initializing the Plugin

To initialize the plugin and set up event listeners, call the initButtons() method:

```typescript
themeManager.initButtons();
```

This will set up event listeners on all elements with a data-theme-name attribute.

## Changing the Theme

To extend the theme list, add an array of names.

```typescript
const themeManager = new ThemeManager(['sepia', 'grayscale']);
```

## Using the Plugin

### Using multiple buttons

Here is an example of how to use the plugin in your web application:

```html

<button data-theme-name="dark">Dark Theme</button>
<button data-theme-name="light">Light Theme</button>
<button data-theme-name="system">System Theme</button>

<script>
    const themeManager = new ThemeManager()
    themeManager.initButtons()
</script>
```

In this example, the plugin will set up event listeners on the three buttons and update the theme class on the document.documentElement element when a button is clicked.

### Using a single buttons (Toggle)

if you require only a single button to toggle the theme, you can use the following snippet.

```html

<button data-theme-toggle>System Theme</button>

<script>
    const themeManager = new ThemeManager()
    themeManager.intToggleButton()
</script>
```

### Getter and Setter

You can access and set the theme by using the getter and setter.

#### Getter

```typescript
const themeManager = new ThemeManager()
themeManager.currentTheme // output 'dark'
```

#### Setter

```typescript
const themeManager = new ThemeManager()
document.getElementById('button')!.addEventListener('click', () => {
    themeManager.currentTheme = 'sepia'
})
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions to this plugin are welcome! If you encounter any issues, have feature requests, or want to improve the plugin, feel free to create a pull request or submit an issue in the GitHub repository.
