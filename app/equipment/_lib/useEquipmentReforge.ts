"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { EquipmentItem } from "./types";
import { equipmentStorage } from "./storage";

export function useEquipmentReforge() {
  // hydration mismatch 방지: SSR/CSR 첫 렌더를 동일하게(빈 상태) 맞춘 뒤,
  // 마운트 이후(localStorage 접근 가능 시점)에만 복원
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lockedSubOptionId, setLockedSubOptionId] = useState<string | null>(null);
  const [hasRestored, setHasRestored] = useState(false);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const selected = useMemo(
    () => equipmentList.find((x) => x.id === selectedId) ?? null,
    [equipmentList, selectedId],
  );

  const totalPlus = useMemo(() => {
    if (!selected) return 0;
    return selected.subOptions.reduce((acc, cur) => acc + cur.plus, 0);
  }, [selected]);

  const canLock = useMemo(() => {
    if (!selected) return false;
    return selected.subOptions.length > 0;
  }, [selected]);

  const selectEquipment = useCallback((id: string) => {
    setSelectedId(id);
    setLockedSubOptionId(null);
  }, []);

  const toggleLock = useCallback((subOptionId: string) => {
    setLockedSubOptionId((prev) => (prev === subOptionId ? null : subOptionId));
  }, []);

  const clearLock = useCallback(() => setLockedSubOptionId(null), []);

  const resetSelection = useCallback(() => {
    setLockedSubOptionId(null);
    setSelectedId(null);
  }, []);

  const openRegister = useCallback(() => setIsRegisterOpen(true), []);
  const closeRegister = useCallback(() => setIsRegisterOpen(false), []);

  const createEquipment = useCallback((item: EquipmentItem) => {
    setEquipmentList((prev) => [item, ...prev]);
    setSelectedId(item.id);
    setLockedSubOptionId(null);
    setIsRegisterOpen(false);
  }, []);

  const deleteEquipment = useCallback(
    (id: string) => {
      const ok = window.confirm("이 장비를 삭제할까요? (되돌릴 수 없습니다)");
      if (!ok) return;

      setEquipmentList((prev) => prev.filter((x) => x.id !== id));

      if (selectedId === id) {
        setSelectedId(null);
        setLockedSubOptionId(null);
      }
    },
    [selectedId],
  );

  useEffect(() => {
    // 마운트 이후 복원(비동기 콜백으로 실행해 린트 규칙도 회피)
    const t = window.setTimeout(() => {
      const restored = equipmentStorage.loadEquipmentList();
      setEquipmentList(restored);
      setSelectedId(restored[0]?.id ?? null);
      setHasRestored(true);
    }, 0);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hasRestored) return;
    equipmentStorage.saveEquipmentList(equipmentList);
  }, [equipmentList, hasRestored]);

  return {
    // state
    equipmentList,
    selectedId,
    selected,
    lockedSubOptionId,
    totalPlus,
    canLock,
    isRegisterOpen,

    // actions
    selectEquipment,
    toggleLock,
    clearLock,
    resetSelection,
    openRegister,
    closeRegister,
    createEquipment,
    deleteEquipment,
  };
}


