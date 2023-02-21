import { Dispatch, SetStateAction } from 'react';
import H3 from '../../elements/H3';
import P from '../../elements/P';

function getContent(
  backgroundColour: string,
  clicked: boolean,
  contrastRatio: number,
  contrastRating: string,
  autoColour: boolean,
) {
  if (contrastRatio < 3) return null;
  if (autoColour) return <P content={backgroundColour} />;

  return <H3 content={clicked ? contrastRatio : contrastRating} />;
}

export default function ColourBlock({
  backgroundColour = '#b0b0b0',
  textColour = '#000000',
  clicked = false,
  setClicked = () => {},
  autoColour,
  contrastRating,
  contrastRatio,
}: {
  backgroundColour: string;
  textColour: string;
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  autoColour: boolean;
  contrastRating: string;
  contrastRatio: number;
}) {
  if (!backgroundColour || !textColour) return null;
  function handleClick() {
    setClicked((click) => !click);
  }
  const style: { [elemName: string]: string } = {
    backgroundColor: backgroundColour,
    color: textColour,
    borderColor: autoColour || contrastRatio < 3 ? 'transparent' : textColour,
  };
  const returnContent = getContent(backgroundColour, clicked, contrastRatio, contrastRating, autoColour);
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-m m-1 grid aspect-square h-20 content-center rounded-full border-4 text-center text-current"
      style={style}
    >
      {returnContent}
    </button>
  );
}
