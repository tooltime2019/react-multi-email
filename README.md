# react-multi-email

A simple react component to format multiple email as the user types.

## Development

Install with `npm install`

Run locally with `nmp start`, and make changes in the `src` directory. Review your changes on `http://localhost:3000`

## Releasing a new version

Make your changes and run `npm run publish:patch` or `npm run publish:minor` - this will automatically build, increment the version and publish the dist folder.

## Installation

```shell-script
npm install @tooltime2019/react-multi-email -S
```

## Usage

```typescript jsx
import * as React from 'react';
import { ReactMultiEmail, isEmail } from '@tooltime2019/react-multi-email';
import '@tooltime2019/react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return (
      <>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder="placeholder"
          emails={emails}
          onChange={(_emails: string[]) => {
            this.setState({ emails: _emails });
          }}
          validateEmail={email => {
            return isEmail(email); // return boolean
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void,
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        <br />
        <h4>react-multi-email value</h4>
        <p>{emails.join(', ') || 'empty'}</p>
      </>
    );
  }
}

export default Basic;
```

## License

[MIT](https://opensource.org/licenses/MIT)
