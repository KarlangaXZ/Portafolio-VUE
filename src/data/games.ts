const covers = import.meta.glob<string>('../assets/games/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const games = [
  { slug: 'wow', title: 'World of Warcraft', genre: 'MMORPG', studio: 'Blizzard Entertainment', label: 'Favorite MMO', initials: 'WoW' },
  { slug: 'diablo-iv', title: 'Diablo IV', genre: 'Action RPG', studio: 'Blizzard Entertainment', label: 'Currently Playing', initials: 'IV' },
  { slug: 'apex-legends', title: 'Apex Legends', genre: 'Battle Royale / FPS', studio: undefined, label: 'Competitive', initials: 'APEX' },
  { slug: 'forza-horizon', title: 'Forza Horizon', genre: 'Open World Racing', studio: undefined, label: 'Racing / Casual', initials: 'FH' },
].map((game) => ({ ...game, image: covers[`../assets/games/${game.slug}.webp`] }))
