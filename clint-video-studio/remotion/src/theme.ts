import {continueRender, delayRender, staticFile} from 'remotion';

export const C = {
  bg: '#FBFAFE',
  text: '#16142B',
  muted: '#77738E',
  faint: '#B9B6C9',
  line: 'rgba(32, 22, 90, 0.07)',
  purple: '#6D5DF6',
  purpleDeep: '#5544E8',
  purpleTint: '#EFEDFF',
  pink: '#F27FB5',
  green: '#1FB45A',
  greenTint: '#E4F8EC',
  red: '#EF4E4E',
  redTint: '#FDECEC',
  grad: 'linear-gradient(95deg, #6D5DF6 0%, #A86CF2 50%, #F27FB5 100%)',
  shadow: '0 40px 80px -30px rgba(70, 45, 160, 0.28), 0 12px 30px -10px rgba(70, 45, 160, 0.12)',
  shadowSm: '0 14px 30px -12px rgba(70, 45, 160, 0.22), 0 4px 10px -4px rgba(70, 45, 160, 0.08)',
};

export const FONT = 'Poppins, sans-serif';

const weights: [string, number][] = [
  ['Regular', 400],
  ['Medium', 500],
  ['SemiBold', 600],
  ['Bold', 700],
];

if (typeof document !== 'undefined') {
  const handle = delayRender('Carregando Poppins');
  Promise.all(
    weights.map(([name, w]) =>
      new FontFace('Poppins', `url(${staticFile(`Poppins-${name}.ttf`)})`, {weight: String(w)})
        .load()
        .then((f) => document.fonts.add(f)),
    ),
  ).then(() => continueRender(handle));
}
