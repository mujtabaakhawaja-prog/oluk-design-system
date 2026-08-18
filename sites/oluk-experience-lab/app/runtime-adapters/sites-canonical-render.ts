export const MK2866_RENDER = Object.freeze({
  artifactId: "product-render:mk-2866-ostarine:front:no-bg:1x",
  contentHashSha256: "03a161d7cd6f43aefc64e80f82d926a8a588388e868fa3dff81deb706fbeed21",
  url: "/sites-first-assets/products/mk-2866/mk-2866__front__no-bg__1x.webp",
});

export function resolveCanonicalRender(render: Readonly<{ artifactId: string | null; contentHashSha256: string | null }>): string | null {
  return render.artifactId === MK2866_RENDER.artifactId && render.contentHashSha256 === MK2866_RENDER.contentHashSha256 ? MK2866_RENDER.url : null;
}
