import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";

const CardGallery = () => {
  const [ref, inView] = useInView();
  const DATA = useGetMiya(inView);

  return (
    <St.Wrapper>
      {DATA.map((el, idx) => (
        <Card key={idx} name={el.name} image={el.image} />
      ))}
      <div ref={ref} />
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
