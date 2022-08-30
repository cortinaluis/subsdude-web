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
}

const defaultSubtitleContext: ISubtitleContext = {
  allCues: [],
  activeCues: [],
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
        = useState<VTTCue[]>(defaultSubtitleContext.allCues);
  const [activeCues, updateActiveCues]
        = useState<VTTCue[]>(defaultSubtitleContext.activeCues);

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

