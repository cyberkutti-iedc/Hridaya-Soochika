// Calculate name compatibility using Pythagorean method
interface Person {
    fullName: string;
    dob: string;
    gender: string;
  }
  
  // Calculate Life Path Number (sum of birth date digits)
  function calculateLifePathNumber(dob: string): number {
    if (!dob) return 0;
    
    // Convert date string to numbers only (e.g., "1990-05-15" -> "19900515")
    const dateStr = dob.replace(/-/g, '');
    
    // Sum all digits
    let sum = 0;
    for (const digit of dateStr) {
      sum += parseInt(digit);
    }
    
    // Reduce to single digit (except master numbers 11, 22, 33)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    
    return sum;
  }
  
  // Calculate Expression/Destiny Number (sum of name letter values)
  function calculateExpressionNumber(name: string): number {
    if (!name) return 0;
    
    const letterValues: Record<string, number> = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    
    // Convert name to lowercase and remove non-alphabetic characters
    const normalizedName = name.toLowerCase().replace(/[^a-z]/g, '');
    
    // Sum all letter values
    let sum = 0;
    for (const letter of normalizedName) {
      sum += letterValues[letter] || 0;
    }
    
    // Reduce to single digit (except master numbers)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    
    return sum;
  }
  
  // Get astrological sign based on date of birth
  function getZodiacSign(dob: string): string {
    if (!dob) return 'Unknown';
    
    const date = new Date(dob);
    const month = date.getMonth() + 1; // Months are 0-based in JS
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces'; // (month === 2 && day >= 19) || (month === 3 && day <= 20)
  }
  
  // Calculate element (Fire, Earth, Air, Water) from Zodiac sign
  function getElement(zodiacSign: string): string {
    const fireElements = ['Aries', 'Leo', 'Sagittarius'];
    const earthElements = ['Taurus', 'Virgo', 'Capricorn'];
    const airElements = ['Gemini', 'Libra', 'Aquarius'];
    const waterElements = ['Cancer', 'Scorpio', 'Pisces'];
    
    if (fireElements.includes(zodiacSign)) return 'Fire';
    if (earthElements.includes(zodiacSign)) return 'Earth';
    if (airElements.includes(zodiacSign)) return 'Air';
    if (waterElements.includes(zodiacSign)) return 'Water';
    
    return 'Unknown';
  }
  
function calculateNameCompatibility(name1: string, name2: string): number {
    if (!name1 || !name2) return 50; // Default to medium compatibility if missing data
    
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    
    // Count vowels in each name
    const vowelsInName1 = name1.toLowerCase().split('').filter(char => vowels.includes(char)).length;
    const vowelsInName2 = name2.toLowerCase().split('').filter(char => vowels.includes(char)).length;
    
    // Count consonants in each name
    const consonantsInName1 = name1.toLowerCase().replace(/[^a-z]/g, '').length - vowelsInName1;
    const consonantsInName2 = name2.toLowerCase().replace(/[^a-z]/g, '').length - vowelsInName2;
    
    // First calculation based on vowel harmony
    const vowelCompatibility = 100 - Math.abs((vowelsInName1 / name1.length) - (vowelsInName2 / name2.length)) * 100;
    
    // Second calculation based on consonant harmony
    const consonantCompatibility = 100 - Math.abs((consonantsInName1 / name1.length) - (consonantsInName2 / name2.length)) * 100;
    
    // Expression number calculation
    const expressionNumber1 = calculateExpressionNumber(name1);
    const expressionNumber2 = calculateExpressionNumber(name2);
    
    // Calculate compatibility based on numerology principles
    const expressionCompatibility = calculateNumberCompatibility(expressionNumber1, expressionNumber2);
    
    // Return weighted average
    return Math.round((vowelCompatibility * 0.3) + (consonantCompatibility * 0.3) + (expressionCompatibility * 0.4));
  }
  
  // Calculate zodiac compatibility
  function calculateZodiacCompatibility(sign1: string, sign2: string): number {
    // Define compatibility matrix for zodiac signs
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      'Aries': {
        'Aries': 70, 'Taurus': 60, 'Gemini': 70, 'Cancer': 65, 
        'Leo': 90, 'Virgo': 50, 'Libra': 75, 'Scorpio': 65, 
        'Sagittarius': 85, 'Capricorn': 55, 'Aquarius': 75, 'Pisces': 65
      },
      'Taurus': {
        'Aries': 60, 'Taurus': 80, 'Gemini': 55, 'Cancer': 90, 
        'Leo': 70, 'Virgo': 95, 'Libra': 75, 'Scorpio': 85, 
        'Sagittarius': 50, 'Capricorn': 95, 'Aquarius': 60, 'Pisces': 85
      },
      'Gemini': {
        'Aries': 70, 'Taurus': 55, 'Gemini': 75, 'Cancer': 60, 
        'Leo': 85, 'Virgo': 75, 'Libra': 90, 'Scorpio': 60, 
        'Sagittarius': 80, 'Capricorn': 55, 'Aquarius': 95, 'Pisces': 65
      },
      'Cancer': {
        'Aries': 65, 'Taurus': 90, 'Gemini': 60, 'Cancer': 75, 
        'Leo': 65, 'Virgo': 80, 'Libra': 65, 'Scorpio': 95, 
        'Sagittarius': 55, 'Capricorn': 80, 'Aquarius': 60, 'Pisces': 95
      },
      'Leo': {
        'Aries': 90, 'Taurus': 70, 'Gemini': 85, 'Cancer': 65, 
        'Leo': 80, 'Virgo': 65, 'Libra': 90, 'Scorpio': 70, 
        'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 70, 'Pisces': 65
      },
      'Virgo': {
        'Aries': 50, 'Taurus': 95, 'Gemini': 75, 'Cancer': 80, 
        'Leo': 65, 'Virgo': 80, 'Libra': 70, 'Scorpio': 85, 
        'Sagittarius': 65, 'Capricorn': 90, 'Aquarius': 65, 'Pisces': 75
      },
      'Libra': {
        'Aries': 75, 'Taurus': 75, 'Gemini': 90, 'Cancer': 65, 
        'Leo': 90, 'Virgo': 70, 'Libra': 80, 'Scorpio': 75, 
        'Sagittarius': 85, 'Capricorn': 70, 'Aquarius': 90, 'Pisces': 70
      },
      'Scorpio': {
        'Aries': 65, 'Taurus': 85, 'Gemini': 60, 'Cancer': 95, 
        'Leo': 70, 'Virgo': 85, 'Libra': 75, 'Scorpio': 85, 
        'Sagittarius': 65, 'Capricorn': 85, 'Aquarius': 60, 'Pisces': 95
      },
      'Sagittarius': {
        'Aries': 85, 'Taurus': 50, 'Gemini': 80, 'Cancer': 55, 
        'Leo': 90, 'Virgo': 65, 'Libra': 85, 'Scorpio': 65, 
        'Sagittarius': 80, 'Capricorn': 70, 'Aquarius': 90, 'Pisces': 70
      },
      'Capricorn': {
        'Aries': 55, 'Taurus': 95, 'Gemini': 55, 'Cancer': 80, 
        'Leo': 60, 'Virgo': 90, 'Libra': 70, 'Scorpio': 85, 
        'Sagittarius': 70, 'Capricorn': 80, 'Aquarius': 70, 'Pisces': 85
      },
      'Aquarius': {
        'Aries': 75, 'Taurus': 60, 'Gemini': 95, 'Cancer': 60, 
        'Leo': 70, 'Virgo': 65, 'Libra': 90, 'Scorpio': 60, 
        'Sagittarius': 90, 'Capricorn': 70, 'Aquarius': 85, 'Pisces': 75
      },
      'Pisces': {
        'Aries': 65, 'Taurus': 85, 'Gemini': 65, 'Cancer': 95, 
        'Leo': 65, 'Virgo': 75, 'Libra': 70, 'Scorpio': 95, 
        'Sagittarius': 70, 'Capricorn': 85, 'Aquarius': 75, 'Pisces': 85
      }
    };
    
    // Fallback if sign is unknown
    if (!compatibilityMatrix[sign1] || !compatibilityMatrix[sign1][sign2]) {
      return 70; // Default value
    }
    
    return compatibilityMatrix[sign1][sign2];
  }
  
  // Calculate compatibility based on elements
  function calculateElementCompatibility(element1: string, element2: string): number {
    const elementMatrix: Record<string, Record<string, number>> = {
      'Fire': {
        'Fire': 80, 'Earth': 60, 'Air': 90, 'Water': 50, 'Unknown': 70
      },
      'Earth': {
        'Fire': 60, 'Earth': 85, 'Air': 65, 'Water': 90, 'Unknown': 70
      },
      'Air': {
        'Fire': 90, 'Earth': 65, 'Air': 80, 'Water': 70, 'Unknown': 70
      },
      'Water': {
        'Fire': 50, 'Earth': 90, 'Air': 70, 'Water': 85, 'Unknown': 70
      },
      'Unknown': {
        'Fire': 70, 'Earth': 70, 'Air': 70, 'Water': 70, 'Unknown': 70
      }
    };
    
    return elementMatrix[element1][element2];
  }
  
  // Calculate compatibility between Life Path Numbers
  function calculateNumberCompatibility(number1: number, number2: number): number {
    // Create compatibility matrix for numerology
    const numberMatrix: Record<number, Record<number, number>> = {
      1: { 1: 80, 2: 60, 3: 90, 4: 50, 5: 85, 6: 70, 7: 60, 8: 80, 9: 70, 11: 85, 22: 85, 33: 90, 0: 70 },
      2: { 1: 60, 2: 70, 3: 70, 4: 85, 5: 60, 6: 95, 7: 65, 8: 65, 9: 75, 11: 90, 22: 80, 33: 95, 0: 70 },
      3: { 1: 90, 2: 70, 3: 85, 4: 60, 5: 90, 6: 75, 7: 70, 8: 75, 9: 90, 11: 80, 22: 70, 33: 85, 0: 70 },
      4: { 1: 50, 2: 85, 3: 60, 4: 75, 5: 65, 6: 80, 7: 80, 8: 95, 9: 60, 11: 75, 22: 95, 33: 80, 0: 70 },
      5: { 1: 85, 2: 60, 3: 90, 4: 65, 5: 85, 6: 60, 7: 70, 8: 75, 9: 80, 11: 70, 22: 70, 33: 75, 0: 70 },
      6: { 1: 70, 2: 95, 3: 75, 4: 80, 5: 60, 6: 85, 7: 65, 8: 70, 9: 85, 11: 90, 22: 85, 33: 95, 0: 70 },
      7: { 1: 60, 2: 65, 3: 70, 4: 80, 5: 70, 6: 65, 7: 80, 8: 70, 9: 75, 11: 85, 22: 85, 33: 80, 0: 70 },
      8: { 1: 80, 2: 65, 3: 75, 4: 95, 5: 75, 6: 70, 7: 70, 8: 85, 9: 80, 11: 75, 22: 95, 33: 85, 0: 70 },
      9: { 1: 70, 2: 75, 3: 90, 4: 60, 5: 80, 6: 85, 7: 75, 8: 80, 9: 75, 11: 85, 22: 80, 33: 90, 0: 70 },
      11: { 1: 85, 2: 90, 3: 80, 4: 75, 5: 70, 6: 90, 7: 85, 8: 75, 9: 85, 11: 95, 22: 90, 33: 95, 0: 70 },
      22: { 1: 85, 2: 80, 3: 70, 4: 95, 5: 70, 6: 85, 7: 85, 8: 95, 9: 80, 11: 90, 22: 90, 33: 95, 0: 70 },
      33: { 1: 90, 2: 95, 3: 85, 4: 80, 5: 75, 6: 95, 7: 80, 8: 85, 9: 90, 11: 95, 22: 95, 33: 95, 0: 70 },
      0: { 1: 70, 2: 70, 3: 70, 4: 70, 5: 70, 6: 70, 7: 70, 8: 70, 9: 70, 11: 70, 22: 70, 33: 70, 0: 70 }
    };
    
    return numberMatrix[number1][number2] || 70;
  }
  
  // Calculate gender compatibility 
  function calculateGenderCompatibility(gender1: string, gender2: string): number {
    if (gender1 === 'male' && gender2 === 'female') return 85;
    if (gender1 === 'female' && gender2 === 'male') return 85;
    if (gender1 === gender2) return 75;
    return 80; // For other/unknown combinations
  }
  
  // Main function to calculate overall compatibility
  export function calculateLoveCompatibility(person1: Person, person2: Person): {
    compatibility: number;
    details: Record<string, string>;
  } {
    // Calculate individual factors
    const lifePath1 = calculateLifePathNumber(person1.dob);
    const lifePath2 = calculateLifePathNumber(person2.dob);
    const lifePathCompatibility = calculateNumberCompatibility(lifePath1, lifePath2);
    
    const expression1 = calculateExpressionNumber(person1.fullName);
    const expression2 = calculateExpressionNumber(person2.fullName);
    const expressionCompatibility = calculateNumberCompatibility(expression1, expression2);
    
    const nameCompatibility = calculateNameCompatibility(person1.fullName, person2.fullName);
    
    const zodiac1 = getZodiacSign(person1.dob);
    const zodiac2 = getZodiacSign(person2.dob);
    const zodiacCompatibility = person2.dob ? calculateZodiacCompatibility(zodiac1, zodiac2) : 70;
    
    const element1 = getElement(zodiac1);
    const element2 = getElement(zodiac2);
    const elementCompatibility = person2.dob ? calculateElementCompatibility(element1, element2) : 70;
    
    const genderCompatibility = calculateGenderCompatibility(person1.gender, person2.gender);
    
    // Calculate overall compatibility score (weighted average)
    const overallCompatibility = Math.round(
      (lifePathCompatibility * 0.2) +
      (expressionCompatibility * 0.15) +
      (nameCompatibility * 0.25) +
      (zodiacCompatibility * 0.15) +
      (elementCompatibility * 0.1) +
      (genderCompatibility * 0.15)
    );
    
    // Prepare details for display
    const details: Record<string, string> = {
      numerology: `Your Life Path Number (${lifePath1}) and ${person2.fullName}'s Life Path Number (${lifePath2}) ${
        lifePathCompatibility >= 80 ? 'are highly compatible' :
        lifePathCompatibility >= 60 ? 'have good compatibility' :
        lifePathCompatibility >= 40 ? 'have moderate compatibility' : 'may face challenges'
      }.`,
      nameEnergy: `The energy of your names has a ${
        nameCompatibility >= 80 ? 'very strong' :
        nameCompatibility >= 60 ? 'positive' :
        nameCompatibility >= 40 ? 'moderate' : 'challenging'
      } influence on your relationship.`,
      zodiacHarmony: person2.dob ? `Your zodiac sign (${zodiac1}) and ${person2.fullName}'s zodiac sign (${zodiac2}) ${
        zodiacCompatibility >= 80 ? 'have excellent harmony' :
        zodiacCompatibility >= 60 ? 'work well together' :
        zodiacCompatibility >= 40 ? 'have some compatible aspects' : 'may need to overcome differences'
      }.` : 'Zodiac compatibility could not be fully calculated without partner\'s date of birth.',
      elementalBalance: person2.dob ? `Your element (${element1}) and ${person2.fullName}'s element (${element2}) ${
        elementCompatibility >= 80 ? 'create a perfect balance' :
        elementCompatibility >= 60 ? 'complement each other' :
        elementCompatibility >= 40 ? 'have a workable dynamic' : 'may create tension'
      }.` : 'Elemental balance could not be fully calculated without partner\'s date of birth.',
      advice: overallCompatibility >= 80 ? 'Your connection is rare and special. Cherish and nurture it.' :
             overallCompatibility >= 60 ? 'You have a strong foundation for a fulfilling relationship.' :
             overallCompatibility >= 40 ? 'With understanding and communication, your relationship can grow stronger.' :
             'Focus on appreciating your differences and learning from each other.'
    };
    
    return {
      compatibility: overallCompatibility,
      details
    };
  }