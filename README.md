# Theme Manager

The Theme Manager plugin allows you to easily manage and switch between different themes in your web application.

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

To extend theme list add and array of names.

```typescript
const themeManager = new ThemeManager(['sepia', 'grayscale']);
```

## Using the Plugin

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