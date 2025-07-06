export const sports = [
  // Summer Sports
  {
    id: 'athletics',
    name: 'Athletics',
    type: 'summer' as const,
    category: 'Track and Field',
    description: 'Running, jumping, throwing events',
    icon: 'Runner'
  },
  {
    id: 'swimming',
    name: 'Swimming',
    type: 'summer' as const,
    category: 'Aquatic',
    description: 'Competitive swimming in pool',
    icon: 'Waves'
  },
  {
    id: 'gymnastics',
    name: 'Gymnastics',
    type: 'summer' as const,
    category: 'Artistic',
    description: 'Artistic gymnastics events',
    icon: 'Activity'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    type: 'summer' as const,
    category: 'Team Sports',
    description: 'Team basketball competition',
    icon: 'Circle'
  },
  {
    id: 'football',
    name: 'Football',
    type: 'summer' as const,
    category: 'Team Sports',
    description: 'Association football',
    icon: 'Circle'
  },
  {
    id: 'tennis',
    name: 'Tennis',
    type: 'summer' as const,
    category: 'Racquet Sports',
    description: 'Individual tennis competition',
    icon: 'Circle'
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    type: 'summer' as const,
    category: 'Team Sports',
    description: 'Indoor volleyball',
    icon: 'Circle'
  },
  {
    id: 'cycling',
    name: 'Cycling',
    type: 'summer' as const,
    category: 'Cycling',
    description: 'Road and track cycling',
    icon: 'Circle'
  },
  {
    id: 'boxing',
    name: 'Boxing',
    type: 'summer' as const,
    category: 'Combat Sports',
    description: 'Boxing competition',
    icon: 'Square'
  },
  {
    id: 'wrestling',
    name: 'Wrestling',
    type: 'summer' as const,
    category: 'Combat Sports',
    description: 'Freestyle and Greco-Roman wrestling',
    icon: 'Square'
  },
  {
    id: 'weightlifting',
    name: 'Weightlifting',
    type: 'summer' as const,
    category: 'Strength',
    description: 'Olympic weightlifting',
    icon: 'Dumbbell'
  },
  {
    id: 'judo',
    name: 'Judo',
    type: 'summer' as const,
    category: 'Combat Sports',
    description: 'Judo martial art',
    icon: 'Square'
  },
  {
    id: 'rowing',
    name: 'Rowing',
    type: 'summer' as const,
    category: 'Aquatic',
    description: 'Rowing competition',
    icon: 'Waves'
  },
  {
    id: 'sailing',
    name: 'Sailing',
    type: 'summer' as const,
    category: 'Aquatic',
    description: 'Sailing competition',
    icon: 'Waves'
  },
  {
    id: 'archery',
    name: 'Archery',
    type: 'summer' as const,
    category: 'Precision',
    description: 'Archery competition',
    icon: 'Target'
  },
  {
    id: 'shooting',
    name: 'Shooting',
    type: 'summer' as const,
    category: 'Precision',
    description: 'Sport shooting',
    icon: 'Target'
  },
  {
    id: 'equestrian',
    name: 'Equestrian',
    type: 'summer' as const,
    category: 'Animal Sports',
    description: 'Horse riding events',
    icon: 'Horse'
  },
  {
    id: 'badminton',
    name: 'Badminton',
    type: 'summer' as const,
    category: 'Racquet Sports',
    description: 'Badminton competition',
    icon: 'Circle'
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    type: 'summer' as const,
    category: 'Racquet Sports',
    description: 'Table tennis competition',
    icon: 'Circle'
  },
  {
    id: 'hockey',
    name: 'Field Hockey',
    type: 'summer' as const,
    category: 'Team Sports',
    description: 'Field hockey',
    icon: 'Circle'
  },

  // Winter Sports
  {
    id: 'skiing',
    name: 'Alpine Skiing',
    type: 'winter' as const,
    category: 'Alpine',
    description: 'Downhill skiing events',
    icon: 'Mountain'
  },
  {
    id: 'cross-country-skiing',
    name: 'Cross-Country Skiing',
    type: 'winter' as const,
    category: 'Nordic',
    description: 'Cross-country skiing',
    icon: 'Mountain'
  },
  {
    id: 'ski-jumping',
    name: 'Ski Jumping',
    type: 'winter' as const,
    category: 'Nordic',
    description: 'Ski jumping events',
    icon: 'Mountain'
  },
  {
    id: 'biathlon',
    name: 'Biathlon',
    type: 'winter' as const,
    category: 'Nordic',
    description: 'Skiing and shooting combined',
    icon: 'Target'
  },
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    type: 'winter' as const,
    category: 'Alpine',
    description: 'Snowboarding events',
    icon: 'Mountain'
  },
  {
    id: 'figure-skating',
    name: 'Figure Skating',
    type: 'winter' as const,
    category: 'Ice Sports',
    description: 'Figure skating competition',
    icon: 'Sparkles'
  },
  {
    id: 'speed-skating',
    name: 'Speed Skating',
    type: 'winter' as const,
    category: 'Ice Sports',
    description: 'Speed skating events',
    icon: 'Zap'
  },
  {
    id: 'ice-hockey',
    name: 'Ice Hockey',
    type: 'winter' as const,
    category: 'Team Sports',
    description: 'Ice hockey competition',
    icon: 'Circle'
  },
  {
    id: 'curling',
    name: 'Curling',
    type: 'winter' as const,
    category: 'Ice Sports',
    description: 'Curling competition',
    icon: 'Circle'
  },
  {
    id: 'bobsleigh',
    name: 'Bobsleigh',
    type: 'winter' as const,
    category: 'Sliding',
    description: 'Bobsleigh racing',
    icon: 'Zap'
  },
  {
    id: 'luge',
    name: 'Luge',
    type: 'winter' as const,
    category: 'Sliding',
    description: 'Luge racing',
    icon: 'Zap'
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    type: 'winter' as const,
    category: 'Sliding',
    description: 'Skeleton racing',
    icon: 'Zap'
  },
  {
    id: 'freestyle-skiing',
    name: 'Freestyle Skiing',
    type: 'winter' as const,
    category: 'Alpine',
    description: 'Freestyle skiing events',
    icon: 'Mountain'
  },
  {
    id: 'nordic-combined',
    name: 'Nordic Combined',
    type: 'winter' as const,
    category: 'Nordic',
    description: 'Ski jumping and cross-country skiing',
    icon: 'Mountain'
  },
  {
    id: 'short-track',
    name: 'Short Track Speed Skating',
    type: 'winter' as const,
    category: 'Ice Sports',
    description: 'Short track speed skating',
    icon: 'Zap'
  }
]