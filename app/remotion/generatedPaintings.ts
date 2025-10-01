export interface PaintingSlideConfig {
  id: string;
  prompt: string;
  palette: readonly string[];
  city: string;
  country: string;
  aspectRatio: string;
}

export const paintingSlides: readonly PaintingSlideConfig[] = [
  {
    id: "chongqing-sky-terraces",
    prompt: `**Foreground:** A pair of hands (softly blurred) releasing a warm, high-saturation amber paper lantern. The lantern is the key light source.
      **Mid-ground:** A glowing, star-like stone-step path winds between cascading, moss-covered stilt houses. Windows emit muted lights. A ginger cat on a sill, a blurred chessboard.
      **Background:** The confluence of two rivers at Chaotianmen is rendered as intertwining ribbons of sapphire and amber light. Majestic bridges are semi-transparent, glowing geometric silhouettes. The deep blue night sky has ethereal, luminescent clouds.

      **Color Palette:** Low saturation, high contrast. Dominant indigo and navy blues, contrasted starkly with the high-saturation amber lantern. The atmosphere is hazy.
      **Textures:** Visible hand-painted strokes, subtle paper grain. Floating light particles.

      **Video Background Potential:** Slow, upward drift of the lantern; gentle floating of light particles and clouds.`,
    palette: ["#1D4ED8", "#60A5FA", "#FACC15"],
    city: "Chongqing",
    country: "China",
    aspectRatio: "16:9",
  },
  {
    id: "lincoln-cathedral-haze",
    prompt: `**Foreground:** An old wooden bench with a book and a paper bread bag. A hand (softly blurred) offers a piece of bread towards the viewer.
              **Mid-ground:** The calm water of the Lincoln Canal perfectly reflects the sky and houses. A graceful white swan, with wings slightly spread, accepts the bread. Ripples circle outwards.
              **Background:** Lincoln Cathedral stands serenely atop the hill, bathed in soft backlight. A comic-like traffic signal and bridge are visible.

              **Color Palette:** Low saturation, high contrast. Dominant muted blues, greens, and stone grays, contrasted with a high-saturation, warm golden light emanating from behind the Cathedral.
              **Textures:** Gentle hand-painted strokes, subtle canvas texture. Dust particles float in the light beams.`,
    palette: ["#9CA3AF", "#FDE68A", "#60A5FA"],
    city: "Lincoln",
    country: "England",
    aspectRatio: "16:9",
  },
  {
    id: "shanghai-neon-harbour",
    prompt: `**Foreground:** A laptop open on a surface, with abstract data charts and graphs rising from it like luminous, flowing streams. A coffee cup steams gently.
            **Mid-ground:** The Lujiazui skyline (The Oriental Pearl Tower, Shanghai Tower) is depicted as a cluster of transparent, glowing geometric crystals. The Huangpu River is a massive, flowing silk ribbon, reflecting golden light.
            **Background:** The sky is a soft gradient of dawn purple and pink. Streaky clouds move horizontally.

            **Color Palette:** Low saturation, high contrast. Dominant cool blues and steely grays, contrasted with warm, high-saturation gold and amber from the data streams and river ribbon.
            **Textures:** Subtle digital grain, clean graphic lines mixed with soft gradients. Floating, tiny glowing cubes and droplets.

            **Video Background Potential:** Upward flow of data streams; slow horizontal drift of clouds and the river ribbon.`,
    palette: ["#9333EA", "#F472B6", "#34D399"],
    city: "Shanghai",
    country: "China",
    aspectRatio: "16:9",
  },
  {
    id: "newyork-dusk-grid",
    prompt: `Masterpiece, illustration of "Poetic Modernism". A surreal, transformative memory of New York as an artistic awakening. 16:9 widescreen.

**Foreground:** The torch of the Statue of Liberty extends into the frame. Its flame is composed of high-saturation, flowing paints (cobalt blue, cadmium red, viridian green) that drip down.
**Mid-ground:** The ground is a grid of sketched New York streets. Above, the rotunda of the Guggenheim Museum and other gallery spaces float and reorganize like a dream architecture. Frames contain blurred images of "reality" being covered by abstract colors.
**Background:** The NYC skyline is blurred in a dreamy, post-dusk palette of purple and gold.

**Color Palette:** Low saturation, high contrast. Dominant muted purples, golds, and deep blues. The high-saturation paint from the torch is the vivid focal point.
**Textures:** Pronounced canvas texture. Floating sketch papers, brushes, and paint tubes.

**Video Background Potential:** Slow, viscous flow of the paint torch; subtle hovering motion of the floating art supplies.`,
    palette: ["#FB923C", "#F97316", "#38BDF8"],
    city: "New York",
    country: "USA",
    aspectRatio: "16:9",
  },
] as const;
