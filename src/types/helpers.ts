export type Constrain<P, T extends { [K in string]: P }> = T;
