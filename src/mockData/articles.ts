import { Article } from "../types";
import { mockUsers } from "./users";
import { mockCategories } from "./categories";

export const mockArticles: Article[] = [
  {
    id: "article1",
    title: "Manchester United Secure Last-Minute Victory Against Liverpool",
    summary:
      "A dramatic late goal gives United a crucial win in the title race.",
    content: `
      <p>In a thrilling encounter at Old Trafford, Manchester United secured a dramatic 2-1 victory against rivals Liverpool thanks to a 93rd-minute winner from Marcus Rashford.</p>
      
      <p>The match began with Liverpool taking an early lead through Mohamed Salah's clinical finish in the 12th minute, silencing the home crowd. United struggled to find rhythm in the first half, with Liverpool controlling possession and creating several chances to extend their lead.</p>
      
      <p>However, the second half saw a transformed United side emerge from the tunnel. Bruno Fernandes equalized in the 68th minute with a stunning free-kick from 25 yards that gave Alisson no chance.</p>
      
      <p>As the match seemed headed for a draw, Rashford pounced on a defensive error in stoppage time to slot home the winner, sending Old Trafford into ecstasy.</p>
      
      <p>This result puts United just two points behind leaders Manchester City with eight games remaining in what promises to be an exciting conclusion to the Premier League season.</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[0],
    tags: [
      "Manchester United",
      "Liverpool",
      "Premier League",
      "Marcus Rashford",
    ],
    publishedDate: "2025-04-15T09:30:00Z",
    comments: [
      {
        id: "comment1",
        content: "What an incredible match! Rashford was on fire today.",
        author: mockUsers[2],
        date: "2025-04-15T11:45:00Z",
        likes: 24,
      },
      {
        id: "comment2",
        content:
          "Liverpool really fell apart in the second half. Disappointing.",
        author: mockUsers[1],
        date: "2025-04-15T12:30:00Z",
        likes: 8,
      },
    ],
    views: 3542,
  },
  {
    id: "article2",
    title: "Barcelona's New Signing Scores Hat-trick on Debut",
    summary:
      "The €80 million summer signing makes an immediate impact in La Liga.",
    content: `
      <p>Barcelona's record signing made a sensational start to his career at the Catalan club, scoring a hat-trick on his debut as Barcelona thrashed Sevilla 5-0 at the Camp Nou.</p>
      
      <p>The 22-year-old striker, who joined from Borussia Dortmund for €80 million this summer, opened his account after just 14 minutes, converting a cross from Pedri with a clinical first-time finish.</p>
      
      <p>His second goal came shortly before half-time, a spectacular overhead kick that will surely be a contender for goal of the season. The hat-trick was completed in the 72nd minute with a composed finish after rounding the goalkeeper.</p>
      
      <p>"It's a dream come true to play for Barcelona, and to score three goals on my debut is just incredible," he said in the post-match interview. "The team played amazingly tonight, and it was easy for me to perform with such talented players around me."</p>
      
      <p>Barcelona manager Xavi was full of praise for his new signing: "We knew we were signing a special talent, but even I didn't expect such an immediate impact. He showed tonight why we were so determined to bring him to the club."</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[1],
    tags: ["Barcelona", "La Liga", "Transfers"],
    publishedDate: "2025-04-14T18:15:00Z",
    comments: [
      {
        id: "comment3",
        content: "Barcelona's scouting team deserves a raise! What a signing!",
        author: mockUsers[1],
        date: "2025-04-14T20:10:00Z",
        likes: 45,
      },
    ],
    views: 2876,
  },
  {
    id: "article3",
    title: "Champions League Final Set: Bayern Munich vs Manchester City",
    summary: "The two European giants will face off in London next month.",
    content: `
      <p>Bayern Munich will face Manchester City in what promises to be an epic Champions League final at Wembley Stadium on June 10th.</p>
      
      <p>Bayern secured their place with a commanding 3-0 aggregate win over Real Madrid in the semi-finals, while Manchester City overcame PSG in a dramatic penalty shootout after their tie ended 4-4 on aggregate.</p>
      
      <p>This will be the first time these two clubs have met in a European final, though they have faced each other six times in the Champions League group stages and knockout rounds, with three wins each.</p>
      
      <p>The final will pit Pep Guardiola against his former club, where he won seven major trophies between 2013 and 2016. "Bayern will always have a special place in my heart, but on June 10th, there will be only one team I want to win," Guardiola said after City's semi-final victory.</p>
      
      <p>Both teams have been in formidable form this season. Bayern completed a domestic double winning both the Bundesliga and the German Cup, while City are on course for a Premier League title, having already won the League Cup in February.</p>
      
      <p>Football pundits are already billing this as one of the most anticipated Champions League finals in recent years, with both teams known for their attacking football and tactical sophistication.</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/8802558/pexels-photo-8802558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[2],
    tags: ["Champions League", "Bayern Munich", "Manchester City", "Final"],
    publishedDate: "2025-04-12T22:45:00Z",
    comments: [
      {
        id: "comment4",
        content:
          "This is going to be the match of the year! Can't wait to see Guardiola face his old team.",
        author: mockUsers[2],
        date: "2025-04-13T09:20:00Z",
        likes: 32,
      },
      {
        id: "comment5",
        content:
          "Bayern's defense will be tested against City's attacking trio.",
        author: mockUsers[1],
        date: "2025-04-13T11:05:00Z",
        likes: 18,
      },
      {
        id: "comment6",
        content: "Wembley is the perfect venue for a final of this magnitude!",
        author: mockUsers[2],
        date: "2025-04-13T15:40:00Z",
        likes: 7,
      },
    ],
    views: 5129,
  },
  {
    id: "article4",
    title:
      "World Cup 2026 Qualifiers: England Start Campaign with Convincing Win",
    summary:
      "England begin their road to the 2026 World Cup with a 4-0 victory.",
    content: `
      <p>England kicked off their 2026 World Cup qualifying campaign in style with a convincing 4-0 win against Poland at Wembley Stadium.</p>
      
      <p>Goals from Harry Kane, Jude Bellingham, Bukayo Saka, and Phil Foden ensured a perfect start for the Three Lions in their quest to qualify for the tournament, which will be jointly hosted by the United States, Canada, and Mexico.</p>
      
      <p>England manager Gareth Southgate was pleased with his team's performance: "It's always important to start a qualifying campaign strongly, and I think we showed tonight why we're one of the favorites for the World Cup. The young players were particularly impressive, and the blend of youth and experience in this squad gives us a lot of options."</p>
      
      <p>Jude Bellingham, who scored England's second goal with a thunderous strike from outside the box, was named player of the match. The 22-year-old Real Madrid midfielder continues to establish himself as one of the key figures in this England setup.</p>
      
      <p>England's next qualifier is against Hungary in Budapest on Tuesday, where a win would further strengthen their position at the top of Group F.</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/33234/world-cup-trophy-fifa-winner.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[3],
    tags: ["World Cup", "England", "Qualifiers"],
    publishedDate: "2025-04-08T23:10:00Z",
    comments: [
      {
        id: "comment7",
        content:
          "Bellingham is the future of England's midfield. What a talent!",
        author: mockUsers[1],
        date: "2025-04-09T08:30:00Z",
        likes: 41,
      },
    ],
    views: 2304,
  },
  {
    id: "article5",
    title: "Arsenal Complete Signing of Brazilian Wonderkid",
    summary:
      "The Gunners beat several European giants to secure the 18-year-old's signature.",
    content: `
      <p>Arsenal have completed the signing of Brazilian wonderkid from Palmeiras for a reported fee of £35 million, the club announced today.</p>
      
      <p>The 18-year-old forward, who has already made three appearances for the Brazilian national team, has signed a five-year contract with the North London club after passing a medical yesterday.</p>
      
      <p>Arsenal manager Mikel Arteta expressed his delight at securing one of the most sought-after young talents in world football: "We are thrilled to bring him to Arsenal. He's a player with exceptional technical ability, pace, and goal-scoring instinct. At just 18, he has a huge future ahead of him, and we're excited to help him develop into a top-class player."</p>
      
      <p>The teenager had been linked with moves to Barcelona, Real Madrid, and Manchester City, but Arsenal's sporting director Edu Gaspar's Brazilian connections are believed to have been instrumental in persuading the player to choose the Emirates Stadium.</p>
      
      <p>"Arsenal has a history of developing young players and giving them opportunities, which was very important in my decision," the player said in his first interview with Arsenal Media. "I've followed the Premier League since I was a child, and I can't wait to play in front of the Arsenal fans."</p>
      
      <p>The signing represents a significant coup for Arsenal as they continue to build a young, talented squad capable of challenging for major honors in the coming years.</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[4],
    tags: ["Arsenal", "Transfers", "Premier League"],
    publishedDate: "2025-04-05T14:20:00Z",
    comments: [
      {
        id: "comment8",
        content:
          "Arsenal's recruitment has been excellent lately. Exciting times for Gunners fans!",
        author: mockUsers[2],
        date: "2025-04-05T16:45:00Z",
        likes: 29,
      },
      {
        id: "comment9",
        content:
          "£35 million for an 18-year-old is a lot of pressure. Hope he can handle the Premier League.",
        author: mockUsers[1],
        date: "2025-04-05T18:12:00Z",
        likes: 11,
      },
    ],
    views: 3198,
  },
  {
    id: "article6",
    title: "The Decline of Traditional Number 9s: A Tactical Analysis",
    summary:
      "How modern football is moving away from specialized center-forwards.",
    content: `
      <p>For decades, the number 9 shirt has been worn by some of football's greatest goal-scorers: players like Alan Shearer, Ronaldo Nazário, Robert Lewandowski, and many others who defined the center-forward position. However, in recent years, we've witnessed a gradual decline in the deployment of traditional number 9s, with teams increasingly opting for more fluid attacking systems.</p>
      
      <p>The modern game has seen the rise of the "false 9" – a player who nominally occupies the striker position but frequently drops deep to link play, creating space for wingers to exploit. Pioneered by managers like Pep Guardiola, who famously used Lionel Messi in this role at Barcelona, the false 9 has become increasingly common at the highest level.</p>
      
      <p>Manchester City's Premier League triumph last season, often playing without a recognized striker, exemplified this trend. Instead of a traditional number 9, they utilized players like Phil Foden, Kevin De Bruyne, and Bernardo Silva as fluid attacking pieces, making them unpredictable and difficult to defend against.</p>
      
      <p>Similarly, Liverpool's success under Jürgen Klopp has often featured Roberto Firmino – not a traditional goal-scorer – operating as the central figure in their attack, creating space for Mohamed Salah and Sadio Mané to exploit.</p>
      
      <p>The reasons for this tactical evolution are manifold. Modern defensive systems have become adept at neutralizing central threats, making it harder for traditional number 9s to find space. Additionally, the emphasis on pressing from the front requires forwards with a high work rate and tactical intelligence, not just goal-scoring ability.</p>
      
      <p>However, this doesn't mean the traditional number 9 is extinct. Players like Erling Haaland and Kylian Mbappé represent a new generation of center-forwards who combine traditional goal-scoring prowess with modern attributes such as pace, technical ability, and tactical awareness.</p>
      
      <p>As football continues to evolve, we may see further adaptations of the striker role, but the fundamental objective remains the same: to score goals. The means of achieving this may change, but the end result – the ball in the back of the net – will always be football's ultimate currency.</p>
    `,
    coverImage:
      "https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: mockUsers[0],
    category: mockCategories[5],
    tags: ["Tactical Analysis", "Modern Football"],
    publishedDate: "2025-04-02T10:45:00Z",
    comments: [
      {
        id: "comment10",
        content:
          "Excellent analysis. The game has definitely changed, but I still love watching a classic number 9 like Lewandowski.",
        author: mockUsers[2],
        date: "2025-04-02T14:20:00Z",
        likes: 37,
      },
      {
        id: "comment11",
        content:
          "I think we're seeing a blend now - forwards need to be complete players, not just goal-scorers.",
        author: mockUsers[1],
        date: "2025-04-02T16:05:00Z",
        likes: 22,
      },
    ],
    views: 2765,
  },
];
