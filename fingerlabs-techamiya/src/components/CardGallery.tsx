import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { MetaDataType } from "../types/NftType";

const CardGallery = ({ checkedList }: { checkedList: string[][] }) => {
  const DATA = useGetMiya(); // 1000개의 미야 데이터
  const [data, setData] = useState<MetaDataType[]>([]); // 화면에 렌더링할 미야 데이터
  const containerRef = useRef<HTMLElement | null>(null); // DOM을 지정하여 애니메이션을 적용하기 위한 useRef

  const [search, setSearch] = useState(""); // 검색창 입력시 자동검색을 위한 search state

  // for 무한 스크롤
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1); // 9개씩 묶었을 때 몇번째 묶음인지를 의미하는 page state

  // data에 1000개의 미야 데이터 저장
  useEffect(() => {
    DATA && setData(DATA);
  }, [DATA]);

  // search(검색), checkedList(선택한 필터)에 대해 모두 만족하는 미야들로 data update (update 시마다 fadein 효과 )
  useEffect(() => {
    setData(
      //검색창 %search% 검색 (아무것도 입력안하면 전체)
      DATA.filter((miya) => search === "" || miya.name.includes(search))
        // 모든 필터를 순회하면서 한 필터에 대해서라도 false면 flag도 false
        .filter((miya) => {
          let flag = true;
          for (let i = 0; i < 13; i++) {
            flag =
              flag &&
              (checkedList[i].length === 0 ||
                checkedList[i].includes(miya.attributes[i].value));
          }
          return flag;
        })
    );

    // 갤러리 렌더링 시 fade in 애니메이션
    if (containerRef.current) {
      containerRef.current.classList.add("animation");
      setTimeout(() => {
        containerRef.current &&
          containerRef.current.classList.remove("animation");
      }, 1000);
    }
  }, [search, checkedList]);

  // 글자수 3자리까지 제한
  const handleTextLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 3) {
      setSearch(e.target.value.slice(0, 3));
    }
  };

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <St.Wrapper>
      <St.TopBar>
        <St.ItemCount>
          <span>{data.length}</span> Items
        </St.ItemCount>
        <St.SearchContainer>
          <St.Search
            placeholder="Number"
            type="number"
            onChange={handleTextLength}
            value={search}
          />
          <img src="src/assets/search.svg" />
        </St.SearchContainer>
      </St.TopBar>
      <St.Container ref={containerRef}>
        {data
          .filter((_, idx) => idx < 9 * page) // 9개씩 쪼개서 렌더링
          .map((el, idx) => (
            <Card key={idx} name={el.name} image={el.image} />
          ))}
        <div ref={ref} />
      </St.Container>
    </St.Wrapper>
  );
};

export default CardGallery;

const St = {
  Wrapper: styled.main`
    width: 93rem;
    height: fit-content;
  `,
  Container: styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;

    position: relative;

    & > div {
      position: absolute;
      bottom: 0;
    }

    &.animation {
      animation: fadein 1.5s;
      -webkit-animation: fadein 1.5s; /* Safari and Chrome */

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  `,
  TopBar: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 3rem;

    width: 100%;
  `,
  ItemCount: styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.purple1};

    & > span {
      font-size: 2rem;
      color: white;
    }
  `,
  SearchContainer: styled.div`
    display: flex;
    align-items: center;
    position: relative;

    & > img {
      position: absolute;
      right: 0;
      margin-right: 1rem;
    }
  `,

  Search: styled.input`
    padding: 1.7rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.bg};

    font-size: 1.6rem;
    color: white;

    border: 0.1rem solid ${({ theme }) => theme.colors.purple1};
    border-radius: 0.3rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.purple1};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
};
