import { createContext, useContext, useState } from 'react';
import { mapCuesToWebVTT } from '../helpers/vtt';

interface ISubtitleContext {
    allCues: VTTCue[] | null;
    activeCues: VTTCue[] | null;
    setAllCues: (newCues: VTTCue[]) => void;
    setActiveCues: (newCues: VTTCue[]) => void;
    mapAllCuesToWebVTT: () => string;
}

const defaultSubtitleContext: ISubtitleContext = {
  allCues: null,
  activeCues: null,
  setAllCues: () => {
  },
  setActiveCues: () => {
  },
  mapAllCuesToWebVTT: () => '',
};

const SubtitleContext =
    createContext<ISubtitleContext>(defaultSubtitleContext);

export const SubtitleProvider = ({ children }: any) => {
  const [allCues, updateAllCues]
        = useState<VTTCue[] | null>(defaultSubtitleContext.allCues);
  const [activeCues, updateActiveCues]
        = useState<VTTCue[] | null>(defaultSubtitleContext.activeCues);

  return (
    <SubtitleContext.Provider
      value={{
        allCues,
        activeCues,
        setAllCues: updateAllCues,
        setActiveCues: updateActiveCues,
        mapAllCuesToWebVTT: () => mapCuesToWebVTT(allCues)
      }}
    >
      {children}
    </SubtitleContext.Provider>
  );
};

export const useSubtitleContext = () => useContext(SubtitleContext);

