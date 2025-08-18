export interface Plan {
    name:     string;
    benefits: Benefit[];
}

export interface Benefit {
    label: string;
    value: string;
}
