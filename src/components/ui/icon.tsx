interface IconProps {
  src: string;
  alt?: string;
  width? : number;
  height? : number;
}

const Icon: React.FC<IconProps> = ({ src, alt = "icon", width, height }) => {
  return (
    <div>
      <img src={src} width={width} height={height} alt={alt} />
    </div>
  );
};

export default Icon;
