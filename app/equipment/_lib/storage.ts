import { type EquipmentItem } from "./types";

const EQUIPMENT_LIST_KEY = "equipmentList";

function loadEquipmentList(): EquipmentItem[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(EQUIPMENT_LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EquipmentItem[]) : [];
  } catch {
    return [];
  }
}

function saveEquipmentList(equipmentList: EquipmentItem[]) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(EQUIPMENT_LIST_KEY, JSON.stringify(equipmentList));
  } catch {
    // ignore
  }
}

export const equipmentStorage = {
  loadEquipmentList,
  saveEquipmentList,
};