import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";

const CardGallery = () => {
  const DATA = useGetMiya();

  return (
    <St.Wrapper>
      {DATA.map((el, idx) => (
        <Card name={el.name} key={idx} />
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
