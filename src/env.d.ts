/// <reference types="astro/client" />

declare module "*.JPG" {
    const content: import("astro").ImageMetadata;
    export default content;
}
