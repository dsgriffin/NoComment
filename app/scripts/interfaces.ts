export interface UserSettings {
    blockAllComments: string,
    display: string,
    allowlist: any,
    blocklist: any
} 

export interface CommentHandling {
    getAll: NodeListOf<Element>,
    hideAll: () => void
}

export interface UrlHandling {
    blockableContent: boolean,
    checkProtocol: (urlString: string) => string
}

export interface DynamicContentHandling {
    observeChanges: {
        config: object,
        mutations: MutationObserver
    }
}
