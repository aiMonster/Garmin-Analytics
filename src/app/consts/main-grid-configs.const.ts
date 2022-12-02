import { CompactType, DisplayGrid, GridsterConfig, GridType } from "angular-gridster2";

export const MAIN_GRID_CONFIGS: GridsterConfig = {
  gridType: GridType.Fixed,
  compactType: CompactType.None,
  margin: 15,
  useTransformPositioning: true,
  fixedColWidth: 255,
  fixedRowHeight: 15,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  draggable: {
    enabled: true
  },
  resizable: {
    enabled: false
  },
  swap: true,
  pushItems: true,
  pushDirections: { north: true, east: true, south: true, west: true },
  displayGrid: DisplayGrid.None,
  disableWarnings: true
};
