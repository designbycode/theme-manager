interface Theme {
    /**
     * Unique identifier for the theme
     */
    id: string;
    /**
     * Value of the theme (e.g. "dark", "light", "system")
     */
    value: string;
}

export default class ThemeManager {
    private db: IDBDatabase | null = null;
    private mediaQuery: MediaQueryList;
    themes: Set<string>;

    /**
     * Creates a new instance of the ThemeManager
     * @param additionalThemes Optional array of additional theme values to support
     */
    constructor(additionalThemes: string[] = []) {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.themes = new Set(["system", "dark", "light", ...additionalThemes]);
        this.initDB();
    }

    /**
     * Initializes the IndexedDB database
     */
    private initDB() {
        const request = indexedDB.open("theme-db", 1);
        request.onupgradeneeded = (event: any) => {
            this.db = event.target.result;
            const objectStore = this.db?.createObjectStore("theme", { keyPath: "id" });
            objectStore?.createIndex("id", "id", { unique: true });
        };

        request.onsuccess = (event: any) => {
            this.db = event.target.result;
            this.getCurrentTheme();
        };
    }

    /**
     * Retrieves the current theme from the database
     */
    private getCurrentTheme() {
        if (this.db) {
            const transaction = this.db.transaction("theme", "readonly");
            const objectStore = transaction.objectStore("theme");
            const request = objectStore.get("theme");
            request.onsuccess = (event: any) => {
                const theme: Theme | null = event.target.result;
                if (theme) {
                    this.currentTheme = theme.value;
                } else {
                    this.currentTheme = "system"; // Set default theme if no theme is found in the database
                }
            };
        }
    }

    /**
     * Getter for the current theme
     */
    public get currentTheme(): string {
        return document.documentElement.getAttribute("data-theme") || "system";
    }

    /**
     * Setter for the current theme
     */
    public set currentTheme(value: string) {
        this.changeTheme(value);
        this.updateAriaCurrent(value);
    }

    /**
     * Changes the current theme
     * @param value The new theme value (defaults to "system" if not provided)
     * @returns The new theme value
     */
    private changeTheme(value: string = "system"): string {
        if (!this.themes.has(value)) {
            value = "system"; // Fallback to default if invalid theme
        }

        // Remove all theme classes
        Array.from(this.themes).forEach((theme) => {
            document.documentElement.classList.remove(theme);
        });

        if (value === "system") {
            // Get the system default theme
            const systemDefaultTheme = this.mediaQuery.matches ? "dark" : "light";
            document.documentElement.classList.add(systemDefaultTheme); // add the system default theme class
            document.documentElement.setAttribute("data-theme", systemDefaultTheme);

            // Save the system default theme to the database
            this.saveTheme(systemDefaultTheme);
        } else {
            document.documentElement.classList.add(value); // add the current theme class
            document.documentElement.setAttribute("data-theme", value);

            // Save the theme to the database
            this.saveTheme(value);
        }

        return value;
    }

    /**
     * Saves the theme to the database
     * @param value The theme value to save
     */
    private saveTheme(value: string) {
        if (this.db) {
            const transaction = this.db.transaction("theme", "readwrite");
            const objectStore = transaction.objectStore("theme");
            const request = objectStore.put({ id: "theme", value });

            request.onsuccess = () => {
                // console.log("Theme saved to IndexedDB");
            };

            request.onerror = (event: any) => {
                console.error("Error saving theme to IndexedDB:", event.target.error);
            };
        }
    }

    /**
     * Initializes the theme manager and sets up event listeners
     */
    public initButtons() {
        document.querySelectorAll("[data-theme-name]")?.forEach((button) => {
            button.addEventListener("click", (event) => {
                const buttonElement = event.target as HTMLElement;
                const themeValue = buttonElement.dataset.themeName;
                this.currentTheme = themeValue || "system";
            });
        });

        // Set the initial aria-current attribute
        this.updateAriaCurrent(this.currentTheme);
    }

    /**
     * Updates the aria-current attribute on the button that matches the current theme
     * @param theme The current theme value
     */
    private updateAriaCurrent(theme: string) {
        document.querySelectorAll("[data-theme-name]")?.forEach((button) => {
            const buttonElement = button as HTMLElement;
            if (buttonElement.dataset.themeName === theme) {
                buttonElement.setAttribute("aria-current", "true");
            } else {
                buttonElement.removeAttribute("aria-current");
            }
        });
    }

    /**
     * Toggles between light and dark mode using all elements with data-theme-toggle attribute
     */
    public intToggleButton() {
        document.querySelectorAll("[data-theme-toggle]").forEach((element) => {
            element.addEventListener("click", () => {
                const currentTheme = document.documentElement.getAttribute("data-theme");
                let newTheme: string;

                if (currentTheme === "light") {
                    newTheme = "dark";
                } else {
                    newTheme = "light";
                }

                this.currentTheme = newTheme;
            });
        });
    }
}
