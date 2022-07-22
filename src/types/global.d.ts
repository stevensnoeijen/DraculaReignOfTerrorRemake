declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        window: typeof Window,
    }
}

export {}  // Important! See note.