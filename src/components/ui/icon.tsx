interface IconProps {
  src: string;
  alt?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt = "icon" }) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Icon;
