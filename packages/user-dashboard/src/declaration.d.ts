declare module "*.css" {
    const mapping: Record<string, string>;
    export default mapping;
}
declare module '*.png' {
    // eslint-disable-next-line
    const content: any;
    export default content;
}