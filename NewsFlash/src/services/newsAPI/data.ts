import type { Article, Category } from ".";

export const categories: Category[] = [
   "general",
   "business",
   "entertainment",
   "health",
   "nation",
   "science",
   "sports",
   "technology",
   "world",
];

export const mockArticles: Record<Category, Article[]> = {
   technology: [
      {
         title: "The Future of AI in Tech Companies",
         description:
            "An in-depth look at how artificial intelligence is reshaping the technology industry and what to expect in the coming years.",
         content:
            "Artificial intelligence (AI) is rapidly transforming the technology landscape. From machine learning algorithms that power recommendation engines to natural language processing that enables virtual assistants, AI is at the forefront of innovation. Major tech companies are investing billions in AI research and development, aiming to create smarter products and services. This article explores the latest advancements, ethical considerations, and the potential impact of AI on society. We delve into specific use cases, such as AI in healthcare for diagnostics, in finance for fraud detection, and in autonomous vehicles. The future promises even more integration of AI into our daily lives, raising both excitement and concerns about job displacement and privacy. Experts predict that AI will continue to be a major driver of economic growth and societal change for decades to come.",
         source: { name: "Tech Chronicle", url: "techchronicle.com" },
         url: "https://example.com/future-of-ai",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-22T06:49:35.000Z",
      },
   ],
   business: [
      {
         title: "Global Markets Rally on Positive Economic News",
         description:
            "Stock markets around the world saw significant gains today following the release of strong economic indicators.",
         content:
            "Global stock markets experienced a significant upswing today, driven by positive economic data from several major economies. The Dow Jones Industrial Average closed up 2%, while European and Asian markets also posted strong gains. Key indicators such as manufacturing output, consumer spending, and employment figures all exceeded expectations, signaling a robust recovery. Investors are optimistic about continued growth, though some analysts caution about potential inflationary pressures. This rally comes after a period of volatility, and market watchers will be closely monitoring central bank policies in the coming weeks. The tech sector led the gains, with several large-cap tech stocks reaching new highs. Commodity prices also rose, reflecting increased demand.",
         source: { name: "Financial Times", url: "financialtimes.com" },
         url: "https://example.com/markets-rally",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-21T06:49:35.000Z",
      },
      {
         title: "The Rise of Remote Work: A Permanent Shift?",
         description: "Remote work has seen a surge. Many companies are adapting. Is it permanent? Some say yes, others are unsure. Productivity is key.",
         content:
            "Remote work has seen a surge. Many companies are adapting. Is it permanent? Some say yes, others are unsure. Productivity is key.",
         source: { name: "Workplace Weekly", url: "workplaceweekly.com" },
         url: "https://example.com/remote-work-short",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-19T06:49:35.000Z",
      },
   ],
   sports: [
      {
         title: "Local Team Wins Championship in Stunning Upset",
         description:
            "The underdogs clinched the national championship last night in a game that will be remembered for ages.",
         content:
            "In a breathtaking display of skill and determination, the local heroes, the Wildcats, secured the national championship title last night against the heavily favored Titans. The game, which went into overtime, was marked by incredible plays and a nail-biting finish. The final score was 10-9. Fans erupted in celebration as the final whistle blew, marking the team's first championship in over two decades. The MVP of the match, star player Alex Johnson, scored the winning goal in the final seconds of overtime. Coaches and players praised the team's resilience and the unwavering support of their fans throughout the season. Parades and celebrations are planned for the coming week.",
         source: { name: "Sports Today", url: "sportstoday.com" },
         url: "https://example.com/championship-win",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-22T18:49:35.000Z",
      },
   ],
   science: [
      {
         title: "Breakthrough in Quantum Computing Announced",
         description:
            "Scientists achieve a new milestone in quantum computing, potentially revolutionizing data processing.",
         content:
            "A team of international scientists today announced a significant breakthrough in the field of quantum computing. Their research, published in a prestigious scientific journal, demonstrates a new method for stabilizing qubits, the fundamental building blocks of quantum computers. This development could accelerate the creation of powerful quantum machines capable of solving problems currently intractable for even the most powerful supercomputers. Potential applications range from drug discovery and materials science to cryptography and financial modeling. While practical, large-scale quantum computers are still some years away, this achievement marks a crucial step forward. The research team highlighted the collaborative nature of the project, involving experts from multiple disciplines and institutions.",
         source: { name: "Science Journal", url: "sciencejournal.com" },
         url: "https://example.com/quantum-breakthrough",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-20T06:49:35.000Z",
      },
   ],
   world: [
      {
         title: "International Summit Addresses Climate Change",
         description:
            "Leaders from around the globe convene to discuss new strategies for combating climate change and promoting sustainability.",
         content:
            "World leaders gathered this week for an international summit focused on addressing the urgent challenges of climate change. The summit aims to strengthen commitments to reduce greenhouse gas emissions, enhance international cooperation, and mobilize financial resources for climate action. Key topics on the agenda include transitioning to renewable energy, protecting biodiversity, and supporting vulnerable nations most affected by climate impacts. Several new initiatives and pledges were announced on the first day, though activists are calling for more ambitious targets and concrete action plans. The outcomes of this summit will be critical in shaping the global response to the climate crisis in the coming decade.",
         source: { name: "Global News Network", url: "globalnewsnetwork.com" },
         url: "https://example.com/climate-summit",
         image: "https://placehold.co/600x400.png",
         publishedAt: "2025-06-23T00:49:35.000Z",
      },
   ],
   entertainment: [],
   general: [],
   health: [],
   nation: [],
};
