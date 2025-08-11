export const metadata = {
  title: 'On The Course Cocktails - The Birdie Briefing',
  description: 'Refreshing drinks perfect for enjoying during your round of golf.',
};

export default function OnTheCoursePage() {
  const drinks = [
    {
      name: 'Arnold Palmer',
      description: 'The classic golf course refreshment combining iced tea and lemonade',
      ingredients: ['Iced tea', 'Lemonade', 'Fresh lemon slice', 'Ice'],
      instructions: [
        'Fill a tall glass with ice',
        'Pour equal parts iced tea and lemonade',
        'Garnish with a fresh lemon slice',
        'Stir gently and serve immediately'
      ],
      prepTime: '5 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Golf Cart Cooler',
      description: 'A refreshing blend perfect for hot days on the course',
      ingredients: ['Coconut water', 'Fresh lime juice', 'Mint leaves', 'Cucumber slices', 'Ice'],
      instructions: [
        'Muddle mint leaves in the bottom of a glass',
        'Add cucumber slices and ice',
        'Pour in coconut water and fresh lime juice',
        'Stir gently and garnish with mint'
      ],
      prepTime: '7 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Fairway Fizz',
      description: 'A sparkling citrus drink that keeps you refreshed',
      ingredients: ['Sparkling water', 'Fresh orange juice', 'Lime juice', 'Simple syrup', 'Orange slice'],
      instructions: [
        'Combine fresh orange juice and lime juice',
        'Add simple syrup to taste',
        'Top with sparkling water',
        'Garnish with orange slice'
      ],
      prepTime: '4 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Hydration Helper',
      description: 'Electrolyte-rich drink to keep you going strong',
      ingredients: ['Coconut water', 'Fresh grapefruit juice', 'Honey', 'Sea salt', 'Ice'],
      instructions: [
        'Mix coconut water with fresh grapefruit juice',
        'Add a touch of honey for sweetness',
        'Sprinkle in a pinch of sea salt',
        'Serve over ice'
      ],
      prepTime: '6 minutes',
      difficulty: 'Easy'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
              <h1 className="text-4xl lg:text-6xl font-bold title-overlap">
                On The Course
              </h1>
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
            </div>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Refreshing drinks perfect for enjoying during your round of golf
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
