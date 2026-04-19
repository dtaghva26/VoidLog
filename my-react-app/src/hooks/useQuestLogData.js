import { useEffect, useMemo, useState } from "react";
import { calcXP } from "../constants.js";
import { readStoredJSON, writeStoredJSON } from "../services/storage.js";

const STORAGE_KEYS = {
  entries: "devgamelog_entries",
  pet: "devgamelog_pet",
  spentXP: "devgamelog_spentxp",
};

export function useQuestLogData() {
  const [entries, setEntries] = useState([]);
  const [pet, setPet] = useState({ type: "dragon", name: "Sparky", growth: 0 });
  const [spentXP, setSpentXP] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [storedEntries, storedPet, storedSpentXP] = await Promise.all([
        readStoredJSON(STORAGE_KEYS.entries, []),
        readStoredJSON(STORAGE_KEYS.pet, { type: "dragon", name: "Sparky", growth: 0 }),
        readStoredJSON(STORAGE_KEYS.spentXP, 0),
      ]);
      setEntries(storedEntries);
      setPet(storedPet);
      setSpentXP(storedSpentXP);
      setLoaded(true);
    })();
  }, []);

  const saveEntries = async (nextEntries) => {
    setEntries(nextEntries);
    await writeStoredJSON(STORAGE_KEYS.entries, nextEntries);
  };

  const savePet = async (nextPet) => {
    setPet(nextPet);
    await writeStoredJSON(STORAGE_KEYS.pet, nextPet);
  };

  const saveSpentXP = async (nextSpentXP) => {
    setSpentXP(nextSpentXP);
    await writeStoredJSON(STORAGE_KEYS.spentXP, nextSpentXP);
  };

  const totalXP = useMemo(() => calcXP(entries), [entries]);

  return {
    entries,
    setEntries: saveEntries,
    pet,
    setPet: savePet,
    spentXP,
    setSpentXP: saveSpentXP,
    totalXP,
    loaded,
  };
}
