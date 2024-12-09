import { IPhoneInput } from "./types";

export const mapPhoneDataToInput = (phoneNumbers: string[]) => {
  const result = phoneNumbers.map((phone) => ({
    number: phone,
  }));
  return result.length > 0
    ? result
    : [
        {
          number: "",
        },
      ];
};

export const mapPhoneInputToData = (phoneNumbers?: IPhoneInput[]) => {
  return phoneNumbers
    ? phoneNumbers
        .filter((phone) => phone.number)
        .map((phone) => phone.number as string)
    : [];
};
