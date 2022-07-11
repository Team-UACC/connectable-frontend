import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const dayjsKO = (_: number) => dayjs(_).locale('ko');
