import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

import { mapCuesToWebVTT } from '../helpers/vtt';

interface ISubtitleContext {
    allCues: VTTCue[];
    activeCues: VTTCue[];
    setAllCues: Dispatch<SetStateAction<VTTCue[]>>;
    setActiveCues: Dispatch<SetStateAction<VTTCue[]>>;
    mapAllCuesToWebVTT: () => string;
    hoveredCue: VTTCue | null;
    setHoveredCue: Dispatch<SetStateAction<VTTCue | null>>;
    selectedCue: VTTCue | null;
    setSelectedCue: Dispatch<SetStateAction<VTTCue | null>>;
}

const defaultSubtitleContext: ISubtitleContext = {
  allCues: [],
  activeCues: [],
  setAllCues: () => {
  },
  setActiveCues: () => {
  },
  mapAllCuesToWebVTT: () => '',
  hoveredCue: null,
  selectedCue: null,
  setHoveredCue: () => {
  },
  setSelectedCue: () => {
  }
};

const SubtitleContext =
    createContext<ISubtitleContext>(defaultSubtitleContext);

export const SubtitleProvider = ({ children }: any) => {
  const [allCues, updateAllCues]
        = useState<VTTCue[]>(defaultSubtitleContext.allCues);
  const [activeCues, updateActiveCues]
        = useState<VTTCue[]>(defaultSubtitleContext.activeCues);
  const [hoveredCue, updateHoveredCue]
        = useState<VTTCue | null>(defaultSubtitleContext.hoveredCue);
  const [selectedCue, updateSelectedCue]
        = useState<VTTCue | null>(defaultSubtitleContext.selectedCue);

  return (
    <SubtitleContext.Provider
      value={{
        allCues,
        activeCues,
        setAllCues: updateAllCues,
        setActiveCues: updateActiveCues,
        mapAllCuesToWebVTT: () => mapCuesToWebVTT(allCues),
        hoveredCue,
        setHoveredCue: updateHoveredCue,
        selectedCue,
        setSelectedCue: updateSelectedCue
      }}
    >
      {children}
    </SubtitleContext.Provider>
  );
};

export const useSubtitleContext = () => useContext(SubtitleContext);

