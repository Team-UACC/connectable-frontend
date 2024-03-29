export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

export const calculateRemaingTime = (endTime: number) => endTime - new Date().getTime();

export const isAdrress = (string: string) => /^(0x)?[0-9a-f]{40}$/i.test(string);

export const toggleSet = (element: any) => (set: Set<any>) => {
  set.has(element) ? set.delete(element) : set.add(element);
  return new Set([...set]);
};

const SHALLOW_MODAL_URL_LIST = ['?ticketId'];

export const isShallowModalUrl = (url: string) => SHALLOW_MODAL_URL_LIST.some(v => url.indexOf(v) !== -1);
