export interface NavItem {
    displayName: string;
    // disabled: boolean;
    iconName: string;
    path: string;
    category: string;
    files: number;
    privacy: number;
    password: string;
    children?: NavItem[];
    selected?: boolean;
    route?: string;
}
