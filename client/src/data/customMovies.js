// Add your custom movies here
// These will automatically appear on the Home page (in Trending) and Search results
export const customMovies = [
  {
    id: 'custom-1', // MUST start with 'custom-' and be unique
    title: 'Spider-man Brand New Day',
    overview: '🎬 The 2026 Cinematic Blockbuster (MCU)\nThe film represents a massive creative shift for the franchise, picking up years after the memory-wiping spell cast by Doctor Strange.\n\nCore Production Details:\nRelease Date: Friday, 31 July 2026 (Global theatrical release)\nDirector: Destin Daniel Cretton\n\nPlot Synopsis:\nSet four years after the events of Spider-Man: No Way Home (2021). Peter Parker lives completely anonymous, broke, and isolated in New York City. The world has completely forgotten his civilian identity. He operates out of a cramped apartment, focusing entirely on being a street-level Spider-Man. However, an existential new threat forces him out of the shadows as his spider-powers begin a dangerous, unpredictable physical mutation.',
    poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddyFHPDw-pmaVzB5aNsZkkKxMukIKL01eN_VglTzRwth2W7XJiAuJlAU&s=10',
    backdrop_path: 'https://i.ytimg.com/vi/daXaTug8rL4/maxresdefault.jpg', // A cool Avengers/Superheroes style background
    vote_average: 8.5,
    release_date: '2026-07-31',
    runtime: 145,
    status: 'Released',
    tagline: 'The world may have forgotten Peter Parker, but he hasn\'t forgotten them.',
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }, { id: 3, name: 'Sci-Fi' }],
    trailer_key: '62bIsvRcPv0',
    download_url: 'https://example.com/spider-man-brand-new-day.mp4',
    is_custom: true
  },
  {
    id: 'custom-2',
    title: 'Avengers: Secret Wars',
    overview: 'The Multiverse saga concludes in this epic two-part cinematic event. Heroes from across the multiverse must unite to stop the collapse of all reality. Reality is colliding. Universes are dying. Only one timeline will survive.',
    poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQEwoMMYrVszPcIYZtlKQRHTbSic4fmX3Ddsw10zIQV8l6IMGZQMV7n4fOmh-Wa4oWcUDpdFzVD7djh9gHLNBa27uhBrjDAye5Fd2j4dY&s=10', // Working poster
    backdrop_path: 'https://images.thedirect.com/media/article_full/avengers-secret-wars-projects-watch.jpg', // Working backdrop
    vote_average: 9.2,
    release_date: '2027-05-07',
    runtime: 180,
    status: 'Post Production',
    tagline: 'The end of everything.',
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Sci-Fi' }],
    trailer_key: 'dQw4w9WgXcQ',
    download_url: 'https://example.com/avengers-secret-wars.mp4',
    is_custom: true
  },
  {
    id: 'custom-3',
    title: 'Fantastic Four: First Steps',
    overview: 'Set in a vibrant, retro-futuristic 1960s alternate universe, Marvel\'s First Family returns. Reed Richards, Sue Storm, Johnny Storm, and Ben Grimm face a cosmic threat that endangers not just their world, but the entire multiverse.',
    poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJBESuOsvi8aWujZZXsZwlvl2D-h_6LA9NCDzQ82PJqmAZLPoOxS2rmIJ0RLJXAxQjricGw&s=10', // Working poster
    backdrop_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop', // Working backdrop
    vote_average: 8.0,
    release_date: '2025-07-25',
    runtime: 135,
    status: 'In Production',
    tagline: 'The Future is Retro.',
    genres: [{ id: 1, name: 'Adventure' }, { id: 2, name: 'Sci-Fi' }],
    trailer_key: 'dQw4w9WgXcQ',
    download_url: 'https://example.com/fantastic-four.mp4',
    is_custom: true
  }
];
