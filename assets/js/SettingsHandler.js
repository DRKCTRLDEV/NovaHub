class SettingsHandler {
    constructor() {
        this.settings = {
            appearance: {
                theme: {
                    element: document.getElementById('theme'),
                    default: 'system',
                    options: {
                        dark: {
                            '--pm-1': '#8000b3',
                            '--pm-2': '#9f00e4',
                            '--bg-1': '#0a0a0a',
                            '--bg-2': '#1a1a1a',
                            '--text': '#b0b0b0',
                            '--overlay-bg': 'rgba(0,0,0,0.95)',
                            '--border-color': '#303030'
                        },
                        light: {
                            '--pm-1': '#6200a8',
                            '--pm-2': '#7b00d4',
                            '--bg-1': '#e4e4e4',
                            '--bg-2': '#d1d1d1',
                            '--text': '#404040',
                            '--overlay-bg': 'rgba(228,228,228,0.95)',
                            '--border-color': '#a0a0a0'
                        },
                        highcontrast: {
                            '--pm-1': '#000000',
                            '--pm-2': '#000000',
                            '--bg-1': '#ffffff',
                            '--bg-2': '#f0f0f0',
                            '--text': '#000000',
                            '--overlay-bg': 'rgba(255,255,255,0.95)',
                            '--border-color': '#000000'
                        },
                        system: null
                    }
                },
                animations: {
                    element: document.getElementById('animations'),
                    default: true,
                    apply: (value) => {
                        document.documentElement.classList.toggle('no-animations', !value);
                    }
                },
                customAccent: {
                    element: document.getElementById('customAccent'),
                    default: '#1a73e8',
                    apply: (value) => {
                        document.documentElement.style.setProperty('--pm-1', value);
                        document.documentElement.style.setProperty('--pm-2', this.adjustBrightness(value, 20));
                    }
                }
            },
            privacy: {
                proxy: {
                    element: document.getElementById('proxy'),
                    default: false
                },
                proxyurl: {
                    element: document.getElementById('proxyurl'),
                    default: ''
                }
            },
            notifications: {
                enabled: {
                    element: document.getElementById('notifications'),
                    default: true
                },
                sound: {
                    element: document.getElementById('notifSound'),
                    default: false
                }
            },
            advanced: {
                experimental: {
                    element: document.getElementById('experimental'),
                    default: false
                }
            }
        };

        this.init();
        this.setupClearDataButton();
    }

    init() {
        this.loadAllSettings();
        this.setupEventListeners();
        this.applyInitialTheme();
    }

    loadAllSettings() {
        this.traverseSettings(this.settings, (setting, path) => {
            if (!setting.element) {
                console.error(`Element not found for setting: ${path.join('.')}`);
                return;
            }

            const savedValue = this.getCookie(path.join('.')) ?? setting.default.toString();
            
            if (setting.element.type === 'checkbox') {
                setting.element.checked = savedValue === 'true';
                if (setting.apply) setting.apply(savedValue === 'true');
            } else {
                setting.element.value = savedValue;
                if (setting.apply) setting.apply(savedValue);
            }
        });
    }

    setupEventListeners() {
        this.traverseSettings(this.settings, (setting, path) => {
            if (!setting.element) return;

            setting.element.addEventListener('change', (e) => {
                const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                this.updateSetting(path.join('.'), newValue);
            });
        });

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', () => {
                    if (this.settings.appearance.theme.element.value === 'system') {
                        this.applyTheme('system');
                    }
                });
        }
    }

    traverseSettings(obj, callback, path = []) {
        for (const [key, value] of Object.entries(obj)) {
            if (value.element) {
                callback(value, [...path, key]);
            } else if (typeof value === 'object') {
                this.traverseSettings(value, callback, [...path, key]);
            }
        }
    }

    updateSetting(path, value) {
        this.setCookie(path, value);
        
        const setting = path.split('.').reduce((obj, key) => obj[key], this.settings);
        if (setting.apply) {
            setting.apply(value);
        }

        if (path === 'appearance.theme') {
            this.applyTheme(value);
        }

        window.dispatchEvent(new CustomEvent('settingChanged', {
            detail: { path, value }
        }));
    }

    applyTheme(theme) {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = isDark ? 'dark' : 'light';
            this.setThemeColors(this.settings.appearance.theme.options[systemTheme]);
        } else {
            this.setThemeColors(this.settings.appearance.theme.options[theme]);
        }
    }

    setThemeColors(colors) {
        if (!colors) return;
        
        // Save current accent colors unless switching to high contrast
        const isHighContrast = this.settings.appearance.theme.element.value === 'highcontrast';
        
        // Apply theme colors
        Object.entries(colors).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });
        
        // Handle accent colors for non-high contrast themes
        if (!isHighContrast) {
            const currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--pm-1').trim();
            const savedAccent = localStorage.getItem('accentColor') || '#1a73e8';
            
            // Use saved accent if coming from high contrast or no current accent
            if (!currentAccent || currentAccent === '#000000') {
                this.updateAccentColor(savedAccent);
            }
        }
    }

    setCookie(name, value) {
        const cookieString = [
            `${name}=${encodeURIComponent(value)}`,
            'path=/',
            'SameSite=Lax',
            'max-age=31536000'
        ].join('; ');
        
        document.cookie = cookieString;
    }

    getCookie(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    initAccentColor() {
        // Get saved accent color or use default
        const savedAccent = localStorage.getItem('accentColor') || '#1a73e8';
        this.accentInput.value = savedAccent;
        this.updateAccentColor(savedAccent);
    }

    updateAccentColor(color = null) {
        const accentColor = color || this.accentInput.value;
        document.documentElement.style.setProperty('--pm-1', accentColor);
        document.documentElement.style.setProperty('--pm-2', this.adjustBrightness(accentColor, 20));
        localStorage.setItem('accentColor', accentColor);
    }

    adjustBrightness(hexColor, percent) {
        const rgb = hexColor.match(/\w\w/g).map(x => parseInt(x, 16));
        const adjusted = rgb.map(value => {
            const newValue = value + (255 * percent / 100);
            return Math.min(255, Math.max(0, Math.round(newValue)));
        });
        return '#' + adjusted.map(x => x.toString(16).padStart(2, '0')).join('');
    }

    clearAllData() {
        // Show confirmation dialog
        const confirmed = confirm('Are you sure you want to clear all data? This will reset all settings to default.');
        
        if (confirmed) {
            // Clear localStorage
            localStorage.clear();

            // Reset all settings to defaults
            const defaults = {
                theme: 'system',
                animations: true,
                accentColor: '#1a73e8',
                proxyurl: '',
                notifications: true,
                notifSound: false,
                experimental: false
            };

            // Update UI elements silently
            Object.entries(defaults).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                    if (this.settings[key]?.apply) {
                        this.settings[key].apply(value);
                    }
                }
            });

            this.updateAccentColor(defaults.accentColor);
            document.body.classList.remove('no-animations');
            
            // Show completion alert
            window.setTimeout(() => {
                alert('All data has been cleared and settings reset to default.');
            }, 100);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.settingsHandler = new SettingsHandler();
});
