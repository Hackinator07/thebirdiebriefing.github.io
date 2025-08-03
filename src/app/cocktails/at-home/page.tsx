export const metadata = {
  title: 'At Home Cocktails - The Birdie Briefing',
  description: 'Craft cocktails to make in your own kitchen and enjoy with friends.',
};

export default function AtHomePage() {
  const drinks = [
    {
      name: 'Golf Club Manhattan',
      description: 'A sophisticated twist on the classic Manhattan perfect for golf enthusiasts',
      ingredients: ['Bourbon', 'Sweet vermouth', 'Angostura bitters', 'Maraschino cherry', 'Orange peel'],
      instructions: [
        'Fill a mixing glass with ice',
        'Add 2 oz bourbon, 1 oz sweet vermouth, and 2 dashes bitters',
        'Stir until well-chilled',
        'Strain into a chilled cocktail glass',
        'Garnish with cherry and orange peel'
      ],
      prepTime: '8 minutes',
      difficulty: 'Medium'
    },
    {
      name: 'Putting Green Punch',
      description: 'A refreshing punch perfect for entertaining golf friends',
      ingredients: ['Gin', 'Fresh lime juice', 'Simple syrup', 'Cucumber', 'Mint', 'Soda water'],
      instructions: [
        'Muddle cucumber and mint in a pitcher',
        'Add gin, lime juice, and simple syrup',
        'Fill with ice and top with soda water',
        'Stir gently and serve in punch cups'
      ],
      prepTime: '10 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Hole-in-One Highball',
      description: 'A tall, refreshing drink that\'s perfect for celebrations',
      ingredients: ['Scotch whisky', 'Fresh lemon juice', 'Simple syrup', 'Soda water', 'Lemon wheel'],
      instructions: [
        'Fill a highball glass with ice',
        'Add 2 oz scotch, 1 oz lemon juice, and 0.5 oz simple syrup',
        'Top with soda water and stir gently',
        'Garnish with lemon wheel'
      ],
      prepTime: '6 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Eagle Eye Old Fashioned',
      description: 'A classic cocktail with a golf-themed twist',
      ingredients: ['Rye whiskey', 'Angostura bitters', 'Simple syrup', 'Orange peel', 'Luxardo cherry'],
      instructions: [
        'In a rocks glass, muddle orange peel with bitters and syrup',
        'Add ice and 2 oz rye whiskey',
        'Stir until well-chilled',
        'Garnish with orange peel and cherry'
      ],
      prepTime: '7 minutes',
      difficulty: 'Medium'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold title-overlap mb-6">
              At Home
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Craft cocktails to make in your own kitchen and enjoy with friends
            </p>
          </div>
        </div>
      </section>

      {/* Drinks Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.map((drink, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Drink Image */}
                <div className="aspect-[4/3] bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Drink Image</span>
                  </div>
                </div>

                {/* Drink Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{drink.name}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {drink.description}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                    <ul className="space-y-2">
                      {drink.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                    <ol className="space-y-2 text-sm text-gray-600">
                      {drink.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex">
                          <span className="font-medium text-primary-500 mr-2">{idx + 1}.</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Prep: {drink.prepTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Difficulty: {drink.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
