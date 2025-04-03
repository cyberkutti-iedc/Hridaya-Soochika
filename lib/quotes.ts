export const loveQuotes = [
    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    "I knew I loved you when 'home' went from being a place to being a person.",
    "The best love is the kind that awakens the soul and makes us reach for more.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "In all the world, there is no heart for me like yours.",
    "To love and be loved is to feel the sun from both sides.",
    "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "The greatest happiness of life is the conviction that we are loved; loved for ourselves.",
    "When I saw you I fell in love, and you smiled because you knew."
  ];
  
  export function getRandomQuote(): string {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    return loveQuotes[randomIndex];
  }