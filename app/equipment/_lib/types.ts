export type SubOption = {
  id: string;
  label: string;
  plus: number;
};

export type EquipmentSetName =
  | "선봉장"
  | "추적자"
  | "성기사"
  | "수문장"
  | "수호자"
  | "암살자"
  | "복수자"
  | "주술사"
  | "조율자";

export type EquipmentItem = {
  id: string;
  name: string;
  slot: "무기" | "방어구";
  setName: EquipmentSetName;
  mainOptionLabel: string;
  subOptions: SubOption[]; // 2~4개, 슬롯 수는 고정
};


