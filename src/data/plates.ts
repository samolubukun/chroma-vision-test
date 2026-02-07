export interface Plate {
  id: number;
  file: string;
  correct_normal: string[];
  correct_red_green?: string[];
  correct_protan?: string[];
  correct_deuteran?: string[];
  options: string[];
  type: 'common' | 'diagnostic' | 'vanishing' | 'classification' | 'trace' | 'control';
}

export const plates: Plate[] = [
  { id: 1, file: '24.jpg', correct_normal: ['12'], correct_red_green: ['12'], options: ['12', '15', '17', '21'], type: 'common' },
  { id: 2, file: '25.jpg', correct_normal: ['8'], correct_red_green: ['3'], options: ['8', '3', '5', '2'], type: 'diagnostic' },
  { id: 3, file: '26.jpg', correct_normal: ['6'], correct_red_green: ['5'], options: ['6', '5', '8', '3'], type: 'diagnostic' },
  { id: 4, file: '27.jpg', correct_normal: ['29'], correct_red_green: ['70'], options: ['29', '70', '21', '74'], type: 'diagnostic' },
  { id: 5, file: '28.jpg', correct_normal: ['57'], correct_red_green: ['35'], options: ['57', '35', '51', '52'], type: 'diagnostic' },
  { id: 6, file: '29.jpg', correct_normal: ['5'], correct_red_green: ['2'], options: ['5', '2', '3', '8'], type: 'diagnostic' },
  { id: 7, file: '30.jpg', correct_normal: ['3'], correct_red_green: ['5'], options: ['3', '5', '2', '6'], type: 'diagnostic' },
  { id: 8, file: '31.jpg', correct_normal: ['15'], correct_red_green: ['17'], options: ['15', '17', '12', '16'], type: 'diagnostic' },
  { id: 9, file: '32.jpg', correct_normal: ['74'], correct_red_green: ['21'], options: ['74', '21', '73', '70'], type: 'diagnostic' },
  { id: 10, file: '33.jpg', correct_normal: ['2'], correct_red_green: ['nothing', '0', 'no number'], options: ['2', '0', '5', '8'], type: 'vanishing' },
  { id: 11, file: '34.jpg', correct_normal: ['6'], correct_red_green: ['nothing', '0', 'no number'], options: ['6', '0', '8', '3'], type: 'vanishing' },
  { id: 12, file: '35.jpg', correct_normal: ['97'], correct_red_green: ['nothing', '0', 'no number'], options: ['97', '9', '7', '18'], type: 'vanishing' },
  { id: 13, file: '36.jpg', correct_normal: ['45'], correct_red_green: ['nothing', '0', 'no number'], options: ['45', '4', '5', '10'], type: 'vanishing' },
  { id: 14, file: '38.jpg', correct_normal: ['7'], correct_red_green: ['nothing', '0', 'no number'], options: ['7', '0', '1', '9'], type: 'vanishing' },
];

export const getInstructions = (plate: Plate): string => {
  switch (plate.type) {
    case 'common':
      return 'Select the number you see from the options below.';
    case 'diagnostic':
      return 'Identify the number in the plate and select the corresponding option.';
    case 'vanishing':
      return 'Select the number you see, or choose the "0" or "none" option if no number is visible.';
    case 'trace':
      return 'Follow the winding lines and select the path you see from the options below.';
    case 'control':
      return 'Can you follow a continuous line from one side to the other? Select your answer below.';
    case 'classification':
      return 'Examine the details carefully and select the number you see below.';
    default:
      return 'Select the option that matches what you see in the plate.';
  }
};
