interface IProps {
  imgUrl: string;
  coords: string;
}

const Coordinates = ({ imgUrl, coords }: IProps) => {
  console.log({ imgUrl, coords });
  return <div>Coordinates</div>;
};

export default Coordinates;
