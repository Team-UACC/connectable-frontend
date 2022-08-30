import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const dayjsKO = (_: number) => dayjs(_).locale('ko');

export const timeFormatter = (_ms: number) => {
  let ms = _ms;

  const DD = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms -= DD * 24 * 60 * 60 * 1000;

  const HH = Math.floor(ms / (60 * 60 * 1000));
  ms -= HH * 60 * 60 * 1000;

  const mm = Math.floor(ms / (60 * 1000));
  ms -= mm * 60 * 1000;

  const ss = Math.floor(ms / 1000);

  return `${DD.toString().padStart(2, '0')}일 ${HH.toString().padStart(2, '0')}시간 ${mm
    .toString()
    .padStart(2, '0')}분 ${ss.toString().padStart(2, '0')}초`;
};

export const timeFormatterForMinute = (_ms: number) => {
  let ms = _ms;

  const mm = Math.floor(ms / (60 * 1000));
  ms -= mm * 60 * 1000;

  const ss = Math.floor(ms / 1000);

  return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};
