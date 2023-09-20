import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";

const CardGallery = () => {
  const DATA = useGetMiya(0);

  const [ref, inView] = useInView();

  return (
    <St.Wrapper>
      {DATA.map((el, idx) => (
        <Card key={idx} name={el.name} image={el.image} />
      ))}
      <div ref={ref}>BOTTOM</div>
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
