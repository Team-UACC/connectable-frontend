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
