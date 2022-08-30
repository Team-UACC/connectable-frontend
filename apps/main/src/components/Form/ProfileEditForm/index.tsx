import _ from 'lodash';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import useUserInfoForm from '~/hooks/useUserInfoForm';
import { timeFormatterForMinute } from '~/utils/day';

interface Props {
  userName: string;
  phoneNumber: string;
}

type CertifiedPhoneNumberStep = 'Start' | 'InProgress' | 'Fail' | 'Success';
const CERTICIFICATION_DURATION = 180;

export default function ProfileEditForm({ userName, phoneNumber }: Props) {
  const [certifiedPhoneNumberStep, setCertifiedPhoneNumberStep] = useState<CertifiedPhoneNumberStep>('Success');
  const [certificationRemainTime, setCertificationRemainTime] = useState(CERTICIFICATION_DURATION);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const certificationKeyRef = useRef<HTMLInputElement>(null);

  const {
    handleChangeNickNameInput,
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    validationNickName,
    validationPhoneNumber,
    setValidationNickName,
    setValidationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const handleClickCertificatePhoneNumber = useCallback(() => {
    setCertifiedPhoneNumberStep('InProgress');
    fetch(`/api/auth/sms/key?phoneNumber=${phoneNumberRef.current}&duration=3`).catch(() =>
      setCertifiedPhoneNumberStep('Start')
    );
  }, [phoneNumberRef.current]);

  const debouncedPhoneNumberCertification = _.debounce(async (certificationKey: string) => {
    fetch(
      `/api/auth/sms/certification?phoneNumber=${phoneNumberRef.current?.value}&certificationKey=${certificationKey}`
    )
      .then(res => res.json())
      .then(res => {
        if (res) setCertifiedPhoneNumberStep('Success');
        else setCertifiedPhoneNumberStep('Fail');
      });
  }, 100);

  useEffect(() => {
    let id: NodeJS.Timer;
    if (phoneNumberRef.current?.value !== phoneNumber && certifiedPhoneNumberStep !== 'Start') {
      id = setInterval(() => {
        setCertificationRemainTime(now => {
          if (now === 1) {
            setCertifiedPhoneNumberStep('Start');
            return CERTICIFICATION_DURATION;
          }

          return now - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [certifiedPhoneNumberStep]);

  useEffect(() => {
    userNameRef.current?.focus();
    setValidationNickName(true);
    setValidationPhoneNumber(true);
  }, []);

  useEffect(() => {
    if (userNameRef.current?.value === userName) {
      setValidationNickName(true);
    }
  }, [validationNickName]);

  return (
    <div className="w-full overflow-hidden">
      <form className={`flex mt-[3rem] w-full bg-transparent `}>
        <FormPageContainer>
          <Input
            name="username"
            label="닉네임"
            notice={
              validationNickName === 'OVERLAP'
                ? '중복된 닉네임입니다.'
                : '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'
            }
            type="text"
            placeholder="닉네임을 입력해주세요"
            defaultValue={userName}
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            spellCheck="false"
            ref={userNameRef}
          />
          <div />
          <div />
          <div className="relative">
            <Input
              name="phonenumber"
              label="전화번호"
              notice={
                certifiedPhoneNumberStep === 'InProgress'
                  ? '문자로 전송된 인증번호를 입력해주세요.'
                  : certifiedPhoneNumberStep === 'Fail'
                  ? '인증번호가 일치하지 않습니다.'
                  : undefined
              }
              type="tel"
              placeholder="010-0000-0000"
              maxLength={13}
              onChange={e => {
                handleChangePhoneNumberInput(e);

                setCertifiedPhoneNumberStep(e.currentTarget.value === phoneNumber ? 'Success' : 'Start');
              }}
              defaultValue={phoneNumber}
              autoComplete="off"
              spellCheck={false}
              ref={phoneNumberRef}
            />
            <Button
              color="red"
              className="absolute right-[5px] bottom-[5px] px-3 text-sm"
              disabled={
                phoneNumberRef.current?.value === phoneNumber ||
                validationPhoneNumber !== true ||
                certifiedPhoneNumberStep !== 'Start'
              }
              onClick={handleClickCertificatePhoneNumber}
            >
              {validationPhoneNumber &&
              phoneNumberRef.current?.value !== phoneNumber &&
              certifiedPhoneNumberStep !== 'Start'
                ? timeFormatterForMinute(certificationRemainTime * 1000)
                : '인증하기'}
            </Button>
          </div>
          {phoneNumberRef.current?.value !== phoneNumber && certifiedPhoneNumberStep !== 'Start' && (
            <input
              className={`w-full px-3 py-3 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
              id={'certificationNumber'}
              type="text"
              placeholder="인증번호를 입력해주세요"
              onChange={() => {
                debouncedPhoneNumberCertification(certificationKeyRef.current?.value as string);
              }}
              autoComplete="off"
              spellCheck={false}
              ref={certificationKeyRef}
            />
          )}
          <Button
            onClick={() => handleClickSubmitButton()}
            disabled={validationNickName !== true || certifiedPhoneNumberStep !== 'Success'}
          >
            수정하기
          </Button>
        </FormPageContainer>
      </form>
    </div>
  );
}

const FormPageContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full max-w-[18rem] h-[60vh] m-auto ">
    <div className=" absolute w-full top-1/2 -translate-y-[60%] flex flex-col gap-[1rem]">{children}</div>
  </div>
);
