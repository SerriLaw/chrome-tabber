import * as React from 'react';

import { ImageObj } from './@types/global';
import { fetchImage } from './lib/fetchImage';
import Attribution from './components/attribution';
import Background from './components/background';

interface Props {}
interface State {
  image: ImageObj;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: {
        photographerName: '',
        photographerUsername: '',
        url: '',
      },
    };
  }

  async componentDidMount() {
    const fetchedImage = await fetchImage();

    fetchedImage && this.setState({ image: fetchedImage });
  }

  render() {
    const { image } = this.state;
    return image.url ? (
      <Background imageUrl={image.url}>
        <Attribution
          username={image.photographerUsername}
          name={image.photographerName}
        />
      </Background>
    ) : (
      <div>
        <p
          style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
          }}
        >
          Loading...
        </p>
      </div>
    );
  }
}
