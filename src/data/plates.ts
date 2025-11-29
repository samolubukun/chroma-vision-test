export interface Plate {
  id: number;
  file: string;
  correct_normal: string[];
  correct_red_green?: string[];
  correct_protan?: string[];
  correct_deuteran?: string[];
  type: 'common' | 'diagnostic' | 'vanishing' | 'classification' | 'trace' | 'control';
}

export const plates: Plate[] = [
  { id: 1, file: '24.jpg', correct_normal: ['12'], correct_red_green: ['12'], type: 'common' },
  { id: 2, file: '25.jpg', correct_normal: ['8'], correct_red_green: ['3'], type: 'diagnostic' },
  { id: 3, file: '26.jpg', correct_normal: ['6'], correct_red_green: ['5'], type: 'diagnostic' },
  { id: 4, file: '27.jpg', correct_normal: ['29'], correct_red_green: ['70'], type: 'diagnostic' },
  { id: 5, file: '28.jpg', correct_normal: ['57'], correct_red_green: ['35'], type: 'diagnostic' },
  { id: 6, file: '29.jpg', correct_normal: ['5'], correct_red_green: ['2'], type: 'diagnostic' },
  { id: 7, file: '30.jpg', correct_normal: ['3'], correct_red_green: ['5'], type: 'diagnostic' },
  { id: 8, file: '31.jpg', correct_normal: ['15'], correct_red_green: ['17'], type: 'diagnostic' },
  { id: 9, file: '32.jpg', correct_normal: ['74'], correct_red_green: ['21'], type: 'diagnostic' },
  { id: 10, file: '33.jpg', correct_normal: ['2'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 11, file: '34.jpg', correct_normal: ['6'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 12, file: '35.jpg', correct_normal: ['97'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 13, file: '36.jpg', correct_normal: ['45'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 14, file: '37.jpg', correct_normal: ['5'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 15, file: '38.jpg', correct_normal: ['7'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 16, file: '39.jpg', correct_normal: ['16'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { id: 17, file: '40.jpg', correct_normal: ['73'], correct_red_green: ['nothing', '0', 'no number'], type: 'vanishing' },
  { 
    id: 18, 
    file: '51.jpg', 
    correct_normal: ['orange'], 
    correct_red_green: ['nothing', 'none'], 
    type: 'trace' 
  },
  { 
    id: 19, 
    file: '52.jpg', 
    correct_normal: ['bluegreen', 'yellowgreen', 'bluegreenandyellowgreen'], 
    correct_red_green: ['bluegreen', 'red', 'bluegreenandred'], 
    type: 'trace' 
  },
  { 
    id: 20, 
    file: '53.jpg', 
    correct_normal: ['red', 'orange', 'redandorange'], 
    correct_red_green: ['red', 'bluegreen', 'redandbluegreen'], 
    type: 'trace' 
  },
  { 
    id: 21, 
    file: '54.jpg', 
    correct_normal: ['traceable'], 
    correct_red_green: ['traceable'], 
    type: 'control' 
  },
  { id: 22, file: '45.jpg', correct_normal: ['26'], correct_protan: ['6'], correct_deuteran: ['2'], type: 'classification' },
  { id: 23, file: '46.jpg', correct_normal: ['42'], correct_protan: ['2'], correct_deuteran: ['4'], type: 'classification' },
  { id: 24, file: '47.jpg', correct_normal: ['35'], correct_protan: ['5'], correct_deuteran: ['3'], type: 'classification' },
  { id: 25, file: '48.jpg', correct_normal: ['96'], correct_protan: ['6'], correct_deuteran: ['9'], type: 'classification' },
];

export const getInstructions = (plate: Plate): string => {
  switch (plate.type) {
    case 'common':
      return 'Look at the plate and tell me what number you see. You have 20 seconds.';
    case 'diagnostic':
      return 'What number do you see in this plate? Take your time, you have 20 seconds.';
    case 'vanishing':
      return 'Tell me the number you see. If you cannot see any number, say "nothing" or "no number".';
    case 'trace':
      return 'Describe the line or path you can trace with your eyes. What colors do you see in the traceable path?';
    case 'control':
      return 'Can you trace a winding line through this plate? Say "traceable" if you can follow a path.';
    case 'classification':
      return 'What number do you see? Look carefully at all the details.';
    default:
      return 'What do you see in this plate?';
  }
};
