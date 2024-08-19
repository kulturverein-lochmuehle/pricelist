const CUSTOM_FONTS = {
  'fundamental-brigade': ['Fundamental Brigade', '400'],
  'super-grotesk': ['Super Grotesk', '500'],
} as const;

export async function loadCustomFonts(): Promise<FontFace[]> {
  return Promise.all(
    Object.entries(CUSTOM_FONTS).map(async ([font, [name, weight]]) => {
      const woffUrl = await import(`../assets/fonts/${font}.woff?url`);
      const woff2Url = await import(`../assets/fonts/${font}.woff2?url`);
      const face = new FontFace(
        name,
        `url('${woff2Url.default}') format('woff2'),
         url('${woffUrl.default}') format('woff')`,
        { style: 'normal', weight },
      );

      // @ts-expect-error - dom lib types are incomplete
      document.fonts.add(face);

      return face.load();
    }),
  );
}
