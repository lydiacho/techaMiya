import { styled } from "styled-components";
import Card from "./Card";

const CardGallery = () => {
  const DATA = [
    "MIYA #0001",
    "MIYA #0002",
    "MIYA #0003",
    "MIYA #0004",
    "MIYA #0005",
    "MIYA #0006",
    "MIYA #0007",
    "MIYA #0008",
    "MIYA #0009",
  ];
  return (
    <St.Wrapper>
      {DATA.map((el, idx) => (
        <Card name={el} key={idx} />
      ))}
    </St.Wrapper>
  );
};

export default CardGallery;

const St = {
  Wrapper: styled.main`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  `,
};
