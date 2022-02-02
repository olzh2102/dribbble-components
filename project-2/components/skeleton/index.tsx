import ContentLoader from 'react-content-loader';

const Skeleton = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, () => (
      <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={40}
        viewBox="0 0 280 40"
        backgroundColor="#f3f3f3"
        foregroundColor="#dadada"
      >
        <circle cx="15" cy="15" r="15" />
        <rect x="38" y="2" rx="6" ry="6" width="220" height="25" />
      </ContentLoader>
    ))}
  </>
);

export default Skeleton;
