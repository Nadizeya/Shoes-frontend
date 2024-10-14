interface IconProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt = "icon",
  width,
  height,
  style,
}) => {
  return (
    <div>
      <img src={src} width={width} height={height} alt={alt} style={style} />
    </div>
  );
};

export default Icon;
