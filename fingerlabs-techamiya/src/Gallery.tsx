import { styled } from "styled-components";
import CardGallery from "./components/CardGallery";
import NavBar from "./components/NavBar";
import { useState } from "react";
const Gallery = () => {
  const [checkedList, setCheckedList] = useState<string[][]>(
    // 체크된 필터데이터를 저장하는 13개(속성 종류 수)짜리 이중배열
    Array.from({ length: 13 }, () => [])
  );
  return (
    <St.Wrapper>
      <St.Header>TECHA MIYA</St.Header>
      <St.Container>
        <NavBar checkedList={checkedList} setCheckedList={setCheckedList} />
        <CardGallery checkedList={checkedList} />
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
    width: 100%;
    padding-bottom: 9rem;

    background-color: ${({ theme }) => theme.colors.bg};
    color: white;
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
  `,
};
