import { FormEvent } from 'react';
import { useColourInputContext } from '../../contexts/ColourInputProvider';

import TextArea from '../../elements/TextArea';
// import { colourSpace } from '../../utilities/colour/colourSpace';
// import { contrast } from '../../utilities/colour/contrastRatio';
// import { luminance } from '../../utilities/colour/luminance';
import ColourPicker from './ColourPicker';

function getHexData(colourObject: { [key: string]: number | string }, mode: string) {
  // const luminanceFloat = luminance.convertHexToLuminance(hexString);

  // const HSL = colourSpace.convertHexToHslString(hexString);
  // const RGB = colourSpace.convertHextoRgbString(hexString);
  // const Luminance = luminance.convertHexToLuminancePercent(hexString);
  // const Black = `${contrast.getContrastRatio2Dp([0, luminanceFloat])}`;
  // const White = `${contrast.getContrastRatio2Dp([1, luminanceFloat])}`;
  const { Hex, HSL, RGB, Luminance, Black, White } = colourObject;
  const colourSpaceLookup: { [key: string]: string } = {
    Hex: `${`~${Hex}~\r\n`}${` ${HSL}\r\n`}${` ${RGB}\r\n`}`,
    HSL: `${` ${Hex}\r\n`}${`~${HSL}~\r\n`}${` ${RGB}\r\n`}`,
    RGB: `${` ${Hex}\r\n`}${` ${HSL}\r\n`}${`~${RGB}~\r\n`}`,
  };
  return `${colourSpaceLookup[mode]} Relative Luminance: ${Luminance}
 Contrast w/ Black: ${Black}
 Contrast w/ White: ${White}`;
}

export default function ComboBox() {
  const { textInput, colourSet, recentColour, mode, dispatchColourInput } = useColourInputContext();
  function handleClickMode() {
    const nextModeLookup: { [key: string]: string } = {
      Hex: 'HSL',
      HSL: 'RGB',
      RGB: 'Hex',
      // Luminance: string,
      // Black: string,
      // White: string,
    };
    dispatchColourInput({ type: 'CHANGE_MODE', payload: { mode: nextModeLookup[mode] } });
  }

  return (
    <>
      <section className="m-0 flex flex-col gap-4">
        <div className="mr-auto grid place-items-start">
          <label htmlFor="colour-input m-0 p-0">
            <h2 className="m-0 p-0 text-2xl font-bold">Add Colours</h2>
          </label>
          <p className="mt-2 mb-8 text-lg">Paste, Pick and Adjust</p>
          <p className="m-0">Use the colour picker and slider to choose and adjust colours.</p>
          <p className="m-0">Batch add colours by pasting them into the text box.</p>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-2">
          <ColourPicker />
          <div className="relative flex min-h-[9rem] w-80 flex-col gap-1 rounded border bg-inherit">
            <TextArea
              id="colour-input"
              placeholder="Enter colours here e.g.:    #fafafa   rgb(120, 120, 120)   hsl(200, 50%, 50%)  (submit with space or enter )"
              name="codeInput"
              className="shrink grow resize-none overflow-auto bg-transparent px-2 pt-2 pb-1 text-base placeholder:text-gray-600 dark:placeholder:text-gray-300"
              value={textInput}
              onInput={(e: FormEvent<HTMLTextAreaElement>): void => {
                const { value: targetValue } = e.currentTarget;
                dispatchColourInput({ type: 'UPDATE_TEXT', payload: { textInput: targetValue } });
              }}
            />
            {recentColour !== undefined && textInput.length > 0 && (
              <button
                className="absolute right-2 bottom-2 w-fit bg-neutral-300 py-2 px-4 text-xs hover:bg-neutral-700 hover:text-white  hover:transition active:bg-slate-600 dark:bg-neutral-700 hover:dark:bg-white hover:dark:text-black"
                type="button"
                onClick={handleClickMode}
              >
                {mode}
              </button>
            )}

            {recentColour !== undefined && textInput.length > 0 && (
              <pre className="absolute bottom-2 left-2 m-0 h-fit p-0 text-xs   text-green-700 dark:text-green-300">
                {getHexData(recentColour, mode)}
              </pre>
            )}
          </div>
        </div>
      </section>
      {colourSet.size > 0 && <hr className="my-8" />}
    </>
  );
}
