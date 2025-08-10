import React from 'react';

interface ScrollSnapDebuggerProps {
  snapToSection: (sectionIndex: number) => void;
  getCurrentSection: () => number;
  getSectionInfo: () => Array<{ index: number; selector: string; top: number; height: number; snapPoint: number } | null>;
  sections: string[];
  debug: boolean;
}

const ScrollSnapDebugger: React.FC<ScrollSnapDebuggerProps> = ({
  snapToSection,
  getCurrentSection,
  getSectionInfo,
  sections,
  debug
}) => {
  // Only render in development mode when debug is true
  if (!debug) {
    return null;
  }

  const handleSnapToSection = (index: number) => {
    snapToSection(index);
  };

  const currentSection = getCurrentSection();
  const sectionInfo = getSectionInfo();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-sm font-mono max-w-xs">
      <h3 className="text-lg font-bold mb-2">Scroll Snap Debug</h3>
      
      <div className="mb-3">
        <p className="text-yellow-300">Current Section: {currentSection}</p>
        <p className="text-blue-300">Selector: {sections[currentSection] || 'N/A'}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold mb-1">Quick Navigation:</h4>
        <div className="flex flex-wrap gap-1">
          {sections.map((selector, index) => (
            <button
              key={selector}
              onClick={() => handleSnapToSection(index)}
              className={`px-2 py-1 text-xs rounded ${
                currentSection === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold mb-1">Section Info:</h4>
        <div className="max-h-32 overflow-y-auto text-xs">
          {sectionInfo.map((info, index) => (
            <div key={index} className="mb-1 p-1 bg-gray-800 rounded">
              <div className="text-green-300">{info?.selector}</div>
              <div className="text-gray-400">
                Top: {Math.round(info?.top || 0)}px | 
                Height: {Math.round(info?.height || 0)}px
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        <p>Click sections above to navigate</p>
        <p>Current scroll position tracked</p>
      </div>
    </div>
  );
};

export default ScrollSnapDebugger;