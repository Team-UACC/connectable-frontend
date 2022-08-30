import { axiosInstance } from '.';

type RequestSMSCertificationKeyRes = string;

export const requestSMSCertificationKey = async (
  phoneNumber: string,
  duration: number
): Promise<RequestSMSCertificationKeyRes> => {
  return axiosInstance.get(`/auth/sms/key?phoneNumber=${phoneNumber}&duration=${duration}`);
};

export const verifyCertificationKey = async (phoneNumber: string, certificationKey: string): Promise<boolean> => {
  return axiosInstance.get(`/auth/sms/certification?phoneNumber=${phoneNumber}&authKey=${certificationKey}`);
};
