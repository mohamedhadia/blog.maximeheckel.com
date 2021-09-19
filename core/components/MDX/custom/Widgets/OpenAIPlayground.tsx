import { css } from '@emotion/react';
import Button from '@theme/components/Button';
import Card from '@theme/components/Card';
import Flex from '@theme/components/Flex';
import Switch from '@theme/components/Switch';
import TextArea from '@theme/components/TextArea';
import React from 'react';

type PromptStatus = 'error' | 'submitting' | 'idle';

type PromptState = {
  remaining: string | null;
  status: PromptStatus;
  value: string;
  base: string;
};

const MAX_REQUEST_ALLOWED_PER_MINUTE = '3';

const RemainingAttemptsIndicator = (props) => {
  const { remaining } = props;

  return (
    <>
      {remaining === '0' ? (
        <span
          css={css`
            color: var(--maximeheckel-colors-warning);
            font-size: 14px;
          `}
        >
          Rate limited! Please wait a minute before trying again! 🤖
        </span>
      ) : (
        <span
          css={css`
            color: var(--maximeheckel-colors-brand);
            font-size: 14px;
          `}
        >
          (Remaining Attempts: {remaining})
        </span>
      )}
    </>
  );
};

const OpenAIPlayground = () => {
  const initialValue = '1. 🦁';
  const initialValueMoreExamples = '1. 🦁\n2. 🐢\n3. 🦄\n4. 🐶\n5. 🐰';

  const [promptState, setPromptState] = React.useState<PromptState>({
    remaining: MAX_REQUEST_ALLOWED_PER_MINUTE,
    status: 'idle',
    value: initialValue,
    base: initialValue,
  });

  const makeRequest = async () => {
    setPromptState((prev) => ({ ...prev, status: 'submitting' }));

    setTimeout(
      () =>
        setPromptState((prev) => ({
          ...prev,
          remaining: MAX_REQUEST_ALLOWED_PER_MINUTE,
        })),
      60 * 1000
    );

    const res = await fetch('/api/openai/', {
      method: 'POST',
      body: JSON.stringify({
        prompt: promptState.base,
        maxTokens: 40,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (res.status === 200) {
      const completion = await res.json();
      // setValue((prev) => `${prev} ${completion.text}`);
      setPromptState((prev) => ({
        ...prev,
        status: 'idle',
        value: `${prev.value} ${completion.text}`,
        // limit: res.headers.get('X-RateLimit-Limit'),
        remaining: res.headers.get('X-RateLimit-Remaining'),
      }));
    } else {
      setPromptState((prev) => ({
        ...prev,
        status: 'error',
        // limit: res.headers.get('X-RateLimit-Limit'),
        remaining: res.headers.get('X-RateLimit-Remaining'),
      }));
    }
  };

  return (
    <Card>
      <Card.Body>
        <TextArea
          aria-label="Prompt"
          label={
            <Flex gap={16} alignItems="center" justifyContent="space-between">
              <span>Prompt</span>{' '}
              <RemainingAttemptsIndicator remaining={promptState?.remaining} />
            </Flex>
          }
          id="playground-1"
          value={promptState.value}
          onChange={() => {}}
          readOnly
          resize="none"
          rows={9}
        />
        <br />
        <Switch
          aria-label="Toggle to add more example!"
          id="enable-more-example"
          label="Toggle to add more examples"
          onChange={(event) => {
            // @ts-ignore
            if (event.target.checked) {
              setPromptState((prev) => ({
                ...prev,
                value: initialValueMoreExamples,
                base: initialValueMoreExamples,
              }));
            } else {
              setPromptState((prev) => ({
                ...prev,
                value: initialValue,
                base: initialValue,
              }));
            }
          }}
        />
        <br />
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Button
            disabled={
              promptState.remaining === '0' ||
              promptState.status === 'submitting' ||
              (promptState.value !== initialValue &&
                promptState.value !== initialValueMoreExamples)
            }
            primary
            onClick={() => makeRequest()}
          >
            {promptState.status === 'submitting' ? 'Computing 🤖' : 'Submit ✨'}
          </Button>
          <Button
            tertiary
            onClick={() =>
              setPromptState((prev) => ({
                ...prev,
                value: promptState.base,
              }))
            }
          >
            Reset
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OpenAIPlayground;
