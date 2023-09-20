import { styled } from "styled-components";
import CardGallery from "./components/CardGallery";
import NavBar from "./components/NavBar";
const Gallery = () => {
  return (
    <St.Wrapper>
      <St.Header>TECHA MIYA</St.Header>
      <St.Container>
        <NavBar />
        <CardGallery />
      </St.Container>
    </St.Wrapper>
  );
};

export default Gallery;

const St = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-bottom: 9rem;

    background-color: ${({ theme }) => theme.colors.bg};
  `,
  Header: styled.h1`
    margin: 9rem 0rem;
    font-size: 6rem;
    font-weight: 800;

    text-align: center;
  `,
  Container: styled.div`
    display: flex;
    gap: 4.8rem;

    max-width: 122rem;
  `,
};
