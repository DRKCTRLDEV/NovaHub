class SettingsHandler {
    constructor() {
        this.settings = {
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
            proxy: {
                element: document.getElementById('proxy'),
                default: false
            },
            customProxy: {
                element: document.getElementById('customProxy'),
                default: 'https://uv.studentportal.lol/service/'
            },
            notifications: {
                element: document.getElementById('notifications'),
                default: true
            }
        };

        const savedTheme = this.getCookie('theme') ?? this.settings.theme.default;
        this.applyTheme(savedTheme);

        this.init();

        document.getElementById('resetProxy')?.addEventListener('click', () => {
            const defaultProxy = this.settings.customProxy.default;
            this.settings.customProxy.element.value = defaultProxy;
            this.updateSetting('customProxy', defaultProxy);
        });
    }

    init() {
        Object.entries(this.settings).forEach(([key, setting]) => {
            if (!setting.element) {
                console.error(`${key} element not found!`);
                return;
            }

            const savedValue = this.getCookie(key) ?? setting.default.toString();
            
            if (setting.element.type === 'checkbox') {
                setting.element.checked = savedValue === 'true';
                if (setting.apply) setting.apply(savedValue === 'true');
            } else {
                setting.element.value = savedValue;
            }

            setting.element.addEventListener('change', (e) => {
                const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                this.updateSetting(key, newValue);
            });
        });

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', e => {
                    if (this.settings.theme.element.value === 'system') {
                        this.applyTheme('system');
                    }
                });
        }
    }

    updateSetting(key, value) {
        this.setCookie(key, value);

        if (key === 'theme') {
            this.applyTheme(value);
        } else if (this.settings[key].apply) {
            this.settings[key].apply(value);
        }

        window.dispatchEvent(new CustomEvent('settingChanged', {
            detail: { key, value }
        }));
    }

    applyTheme(theme) {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = isDark ? 'dark' : 'light';
            this.setThemeColors(this.settings.theme.options[systemTheme]);
        } else {
            this.setThemeColors(this.settings.theme.options[theme]);
        }
    }

    setThemeColors(colors) {
        if (!colors) return;
        Object.entries(colors).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });
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

    getAllSettings() {
        return Object.fromEntries(
            Object.entries(this.settings).map(([key, setting]) => [
                key,
                setting.element.type === 'checkbox' ? setting.element.checked : setting.element.value
            ])
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.settingsHandler = new SettingsHandler();
});
