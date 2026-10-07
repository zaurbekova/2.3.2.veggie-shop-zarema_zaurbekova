const QUARTER_KG = ['Raspberry', 'Strawberry', 'Almonds', 'Pista', 'Walnuts'];

export const getWeight = (name: string): string => {
  return QUARTER_KG.includes(name) ? '1/4 kg' : '1 kg';
};
