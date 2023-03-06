import { FormEvent } from 'react';
import { useColourInputContext } from '../../contexts/ColourInputProvider';

import Span from '../../elements/Span';
import TextArea from '../../elements/TextArea';
import InlineList from './InlineList';

function getList() {
  return <InlineList />;
}

export default function ComboBox() {
  const { textInput, dispatchColourInput } = useColourInputContext();
  function handleClickClearTags() {
    dispatchColourInput({ type: 'CLEAR_TAGS', payload: {} });
  }

  const list = getList();
  return (
    <div className="mx-auto grid w-full max-w-[1200px] items-center self-center p-8">
      <div className="flex flex-row flex-wrap items-center p-2">
        <label htmlFor="colour-input">
          <b className="text-lg">Colours</b>{' '}
          <Span className="text-base text-neutral-500" content="(separate with spaces or linebreaks)" />
        </label>
        <button
          type="button"
          onClick={handleClickClearTags}
          className="m-2 ml-auto rounded border border-current bg-pink-300 px-2 py-1 text-sm text-black"
        >
          Clear All
        </button>
      </div>
      <div className="m-2 flex flex-row flex-wrap gap-2">
        <TextArea
          id="colour-input"
          placeholder="Paste or write colours in here e.g.:      #fafafa"
          name="codeInput"
          className="w-full shrink-0 grow resize-none overflow-auto rounded border bg-inherit p-2 text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
          value={textInput}
          onInput={(e: FormEvent<HTMLTextAreaElement>): void => {
            const { value: targetValue } = e.currentTarget;
            console.log(targetValue);
            dispatchColourInput({ type: 'UPDATE_TEXT', payload: { textInput: targetValue } });
          }}
        />
        {list}
      </div>
    </div>
  );
}
