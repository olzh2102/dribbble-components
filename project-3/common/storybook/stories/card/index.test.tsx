import { render, screen } from '@common/test/test-utils';
import Card, { TCardProps } from '.';

const props: TCardProps = {
  orientation: 'vertical',
  withImage: true,
  withInfo: true,
  title: 'Tokyo',
  subTitle: 'Japan',
  temperature: '+7º',
  icon: '',
  image: '',
};

describe('Card', () => {
  it('should render Card component', () => {
    render(<Card {...props} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('should not render image if withImage set to false', () => {
    render(<Card {...props} withImage={false} />);
    expect(screen.queryByAltText(/card/i)).not.toBeInTheDocument();
  });

  it('should not render info text if withInfo set to false', () => {
    render(<Card {...props} withInfo={false} />);
    expect(screen.queryByText(props.temperature)).not.toBeInTheDocument();
  });

  it('should be in landscape mode if orientation set to horizontal', () => {
    render(<Card {...props} orientation="horizontal" />);
    const styles = getComputedStyle(screen.getByTestId('card'));
    expect(styles.width).toBe('600px');
    expect(styles.height).toBe('300px');
  });

  it('should not be in landscape mode if orientation set to vertical', () => {
    render(<Card {...props} orientation="vertical" />);
    const styles = getComputedStyle(screen.getByTestId('card'));
    expect(styles.width).toBe('300px');
    expect(styles.height).toBe('auto');
  });
});
